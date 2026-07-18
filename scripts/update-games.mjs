import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import axios from "axios";

const API_BASE = "https://api.bgm.tv";
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(SCRIPT_DIR, "../src/data/games.json");
const GAME_STATUSES = new Set([
	"playing",
	"completed",
	"wishlist",
	"perfect",
]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(endpoint) {
	const url = `${API_BASE}${endpoint}`;

	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			const response = await axios.get(url, {
				headers: {
					Accept: "application/json",
					"User-Agent": "H2RO-Archive/9.0 (https://h2ro.cn/)",
				},
				timeout: 15000,
				validateStatus: () => true,
			});

			if (response.status >= 200 && response.status < 300) {
				return response.data;
			}

			if (
				(response.status === 429 || response.status >= 500) &&
				attempt < 3
			) {
				await delay(attempt * 1000);
				continue;
			}

			throw new Error(`${endpoint} 请求失败：HTTP ${response.status}`);
		} catch (error) {
			if (attempt < 3 && (error.code === "ECONNABORTED" || !error.response)) {
				await delay(attempt * 1000);
				continue;
			}

			throw error;
		}
	}

	throw new Error(`${endpoint} 请求失败`);
}

function flattenInfoboxValue(value) {
	if (typeof value === "string" || typeof value === "number") {
		return [String(value).trim()].filter(Boolean);
	}

	if (!Array.isArray(value)) return [];

	return value.flatMap((item) => {
		if (typeof item === "string" || typeof item === "number") {
			return [String(item).trim()].filter(Boolean);
		}

		if (item && typeof item === "object" && "v" in item) {
			return flattenInfoboxValue(item.v);
		}

		return [];
	});
}

function getInfoboxItem(infobox, keys) {
	if (!Array.isArray(infobox)) return null;
	const normalizedKeys = new Set(keys.map((key) => key.toLowerCase()));

	return (
		infobox.find(
			(item) =>
				typeof item?.key === "string" &&
				normalizedKeys.has(item.key.trim().toLowerCase()),
		) ?? null
	);
}

function getInfoboxValues(infobox, keys) {
	return flattenInfoboxValue(getInfoboxItem(infobox, keys)?.value);
}

function normalizeList(values) {
	const items = values.flatMap((value) =>
		value
			.split(/[、,，;；\n]|\s+\/\s+/u)
			.map((item) => item.trim())
			.filter(Boolean),
	);

	return [...new Set(items)];
}

function normalizeUrl(value) {
	if (typeof value !== "string") return null;
	const url = value.trim().replace(/^http:\/\//u, "https://");
	return /^https?:\/\//u.test(url) ? url : null;
}

function getOfficialUrl(infobox) {
	const directItem = getInfoboxItem(infobox, ["website", "官网", "官方网站"]);
	const directUrl = flattenInfoboxValue(directItem?.value)
		.map(normalizeUrl)
		.find(Boolean);

	if (directUrl) return directUrl;

	const linksItem = getInfoboxItem(infobox, ["链接"]);
	const links = Array.isArray(linksItem?.value) ? linksItem.value : [];
	const labelledOfficial = links.find(
		(link) =>
			typeof link?.k === "string" &&
			/官网|官方网站|official/iu.test(link.k) &&
			normalizeUrl(link.v),
	);

	if (labelledOfficial) return normalizeUrl(labelledOfficial.v);

	const excludedHosts = [
		"store.steampowered.com",
		"store.playstation.com",
		"xbox.com",
		"nintendo.com",
		"epicgames.com",
		"gog.com",
	];

	return (
		links
			.map((link) => normalizeUrl(link?.v))
			.find((url) => {
				if (!url) return false;
				try {
					const hostname = new URL(url).hostname.toLowerCase();
					return !excludedHosts.some(
						(excludedHost) =>
							hostname === excludedHost ||
							hostname.endsWith(`.${excludedHost}`),
					);
				} catch {
					return false;
				}
			}) ?? null
	);
}

async function getDeveloper(subject, subjectId) {
	const infoboxItem = getInfoboxItem(subject.infobox, ["开发", "开发商"]);
	const infoboxDevelopers = normalizeList(flattenInfoboxValue(infoboxItem?.value));

	if (infoboxDevelopers.length > 0) return infoboxDevelopers.join(" / ");

	const personsPayload = await fetchJson(`/v0/subjects/${subjectId}/persons`);
	const persons = Array.isArray(personsPayload)
		? personsPayload
		: Array.isArray(personsPayload?.data)
			? personsPayload.data
			: [];
	const developers = persons
		.filter((person) => person?.relation === "开发")
		.map((person) => person.name)
		.filter((name) => typeof name === "string" && name.trim())
		.map((name) => name.trim());

	return developers.length > 0 ? [...new Set(developers)].join(" / ") : null;
}

function parseGameArgument(argument) {
	const [idText, status = "wishlist"] = argument.split(":");
	const bangumiId = Number(idText);

	if (!Number.isInteger(bangumiId) || bangumiId <= 0) {
		throw new Error(`无效的 Bangumi ID：${idText}`);
	}

	if (!GAME_STATUSES.has(status)) {
		throw new Error(
			`无效状态 ${status}，必须是 playing、completed、wishlist 或 perfect`,
		);
	}

	return { bangumiId, status };
}

async function createGame(bangumiId, status) {
	const subject = await fetchJson(`/v0/subjects/${bangumiId}`);
	const title = subject.name_cn?.trim() || subject.name?.trim() || null;
	const originalTitle = subject.name?.trim() || null;

	return {
		bangumiId,
		title,
		originalTitle: originalTitle === title ? null : originalTitle,
		status,
		cover: normalizeUrl(
			subject.images?.large || subject.images?.common || subject.images?.medium,
		),
		developer: await getDeveloper(subject, bangumiId),
		releaseDate: subject.date?.trim() || null,
		platforms: normalizeList(
			getInfoboxValues(subject.infobox, ["平台", "游戏平台"]),
		),
		genres: normalizeList(
			getInfoboxValues(subject.infobox, ["游戏类型", "类型"]),
		),
		xgnRating: null,
		playtimeHours: null,
		summary: "",
		officialUrl: getOfficialUrl(subject.infobox),
		articleUrl: null,
	};
}

async function main() {
	// pnpm 可能把分隔符 -- 原样透传，过滤掉，带不带 -- 都能跑
	const argumentsToAdd = process.argv.slice(2).filter((arg) => arg !== "--");

	if (argumentsToAdd.length === 0) {
		throw new Error(
			"请提供 Bangumi ID，例如：pnpm update-games -- 278949:perfect",
		);
	}

	const games = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
	if (!Array.isArray(games)) {
		throw new Error("games.json 必须是游戏对象数组");
	}

	const existingIds = new Set(games.map((game) => game.bangumiId));
	const requestedGames = argumentsToAdd.map(parseGameArgument);
	const uniqueRequestedIds = new Set();

	for (const requestedGame of requestedGames) {
		if (uniqueRequestedIds.has(requestedGame.bangumiId)) {
			throw new Error(`参数中 Bangumi ID ${requestedGame.bangumiId} 重复`);
		}
		uniqueRequestedIds.add(requestedGame.bangumiId);
	}

	const gamesToAdd = requestedGames.filter(({ bangumiId }) => {
		if (!existingIds.has(bangumiId)) return true;
		console.log(`跳过已存在的 Bangumi ID：${bangumiId}`);
		return false;
	});

	for (const [index, gameToAdd] of gamesToAdd.entries()) {
		console.log(
			`[${index + 1}/${gamesToAdd.length}] 提取 Bangumi subject ${gameToAdd.bangumiId}`,
		);
		games.push(await createGame(gameToAdd.bangumiId, gameToAdd.status));
		if (index < gamesToAdd.length - 1) await delay(250);
	}

	await fs.writeFile(DATA_FILE, `${JSON.stringify(games, null, "\t")}\n`);

	// 写入后跑 biome 统一格式，等价于原来 package.json 里的 && biome
	const format = spawnSync(`biome format --write "${DATA_FILE}"`, {
		stdio: "inherit",
		shell: true,
	});
	if (format.status !== 0) {
		throw new Error("biome format 执行失败");
	}

	console.log(`完成：新增 ${gamesToAdd.length} 个游戏`);
	console.log(`数据文件：${path.relative(process.cwd(), DATA_FILE)}`);
}

main().catch((error) => {
	console.error(`游戏信息提取失败：${error.message}`);
	process.exit(1);
});
