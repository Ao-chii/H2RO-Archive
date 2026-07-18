import gamesData from "./games.json";

export type GameStatus = "playing" | "completed" | "wishlist" | "perfect";

export interface GameRecord {
	title: string;
	originalTitle?: string;
	status: GameStatus;
	cover?: string;
	developer: string;
	releaseDate: string;
	platforms: string[];
	genres: string[];
	xgnRating?: number;
	playtimeHours?: number;
	summary: string;
	officialUrl?: string;
	articleUrl?: string;
}

export const gameStatusMeta: Record<
	GameStatus,
	{ label: string; icon: string }
> = {
	playing: {
		label: "在玩",
		icon: "material-symbols:play-arrow",
	},
	completed: {
		label: "已通关",
		icon: "material-symbols:check",
	},
	wishlist: {
		label: "愿望单",
		icon: "material-symbols:schedule-outline-rounded",
	},
	perfect: {
		label: "全成就",
		icon: "material-symbols:star-rounded",
	},
};

export const games: GameRecord[] = gamesData.map((game) => ({
	title: game.title ?? `Bangumi #${game.bangumiId}`,
	originalTitle: game.originalTitle ?? undefined,
	status: game.status as GameStatus,
	cover: game.cover ?? undefined,
	developer: game.developer ?? "待补充",
	releaseDate: game.releaseDate ?? "待补充",
	platforms: game.platforms,
	genres: game.genres,
	xgnRating: game.xgnRating ?? undefined,
	playtimeHours: game.playtimeHours ?? undefined,
	summary: game.summary,
	officialUrl: game.officialUrl ?? undefined,
	articleUrl: game.articleUrl ?? undefined,
}));
