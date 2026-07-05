// 本地文档转换:把 public/artifacts/<slug>/original.pdf 渲染成逐页 webp + manifest.json
//
// 用法: pnpm artifact <slug> [原始文件名]
// 依赖: pdftocairo(本机 texlive 提供)+ sharp(已在 deps)
// 说明: 只在本地跑,产物(webp/manifest)提交进 Git;CI 构建不跑(Vercel 无 pdftocairo)
import { execFileSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import sharp from "sharp";

const slug = process.argv[2];
const sourceName = process.argv[3]; // 可选:原始文件名,用于"来源"显示
if (!slug) {
	console.error("用法: pnpm artifact <slug> [原始文件名]");
	process.exit(1);
}

const dir = join("public", "artifacts", slug);
const pdf = join(dir, "original.pdf");
if (!existsSync(pdf)) {
	console.error(`找不到原件: ${pdf}`);
	console.error(`请先把 PDF 放到 ${pdf}`);
	process.exit(1);
}

async function removeGeneratedPath(target, options = {}) {
	const { required = true, ...rmOptions } = options;
	for (let i = 0; i < 50; i += 1) {
		try {
			rmSync(target, { force: true, ...rmOptions });
			return true;
		} catch (error) {
			if (
				error?.code !== "EPERM" &&
				error?.code !== "EBUSY" &&
				error?.code !== "ENOTEMPTY"
			) {
				throw error;
			}
			await delay(200);
		}
	}
	if (!required) {
		return false;
	}
	rmSync(target, { force: true, ...rmOptions });
	return true;
}

const previewDir = join(dir, "preview");
// 清掉旧产物,避免残留导致页数错乱
await removeGeneratedPath(previewDir, { recursive: true });
mkdirSync(previewDir, { recursive: true });

// 1. pdftocairo 逐页渲染成 png(150dpi)
console.log("渲染 PDF 逐页 png ...");
execFileSync("pdftocairo", ["-png", "-r", "150", pdf, join(previewDir, "raw")], {
	stdio: "inherit",
});

// 2. 按页码自然排序,统一转成 p-NN.webp(补零 2 位)
const pngs = readdirSync(previewDir)
	.filter((f) => f.endsWith(".png"))
	.sort((a, b) => {
		const na = Number(a.match(/(\d+)/)?.[1] ?? 0);
		const nb = Number(b.match(/(\d+)/)?.[1] ?? 0);
		return na - nb;
	});

let n = 0;
for (const png of pngs) {
	n += 1;
	const out = join(previewDir, `p-${String(n).padStart(2, "0")}.webp`);
	await sharp(join(previewDir, png)).webp({ quality: 82 }).toFile(out);
}

const cleanupFailures = [];
if (process.platform === "win32") {
	cleanupFailures.push(...pngs);
} else {
	// 3. 清理中间 png。清理失败不应阻断 manifest。
	await delay(500);
	for (const png of pngs) {
		const removed = await removeGeneratedPath(join(previewDir, png), {
			required: false,
		});
		if (!removed) cleanupFailures.push(png);
	}
}

// 4. 写 manifest.json(页数 / 大小 / 来源)
const bytes = statSync(pdf).size;
const size =
	bytes >= 1024 * 1024
		? `${(bytes / 1024 / 1024).toFixed(1)} MB`
		: `${Math.round(bytes / 1024)} KB`;

const manifest = {
	pages: n,
	size,
	source: sourceName ?? "original.pdf",
};
writeFileSync(join(dir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`\n完成: ${n} 页 → ${previewDir}`);
console.log(`manifest: ${JSON.stringify(manifest)}`);
if (cleanupFailures.length > 0) {
	console.warn(
		`临时 PNG 有 ${cleanupFailures.length} 个未能自动删除,请稍后手动清理 ${previewDir}/raw-*.png`,
	);
}
