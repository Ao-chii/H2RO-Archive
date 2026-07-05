// 档案分类映射表 —— slug↔中文名的唯一权威
//
// 约定:
//   - 文章 frontmatter 的 category 直接填 slug(英文),它同时是 URL 段
//   - 页面显示中文时用 categoryName(slug) 还原
//   - 增删分类只改这张表
export interface ArchiveCategory {
	slug: string; // frontmatter category 值 + URL 段(英文)
	name: string; // 页面显示名(中文)
	kicker: string; // 纸墨编号标签,如 "01 / STUDY"
	icon: string; // Iconify 图标,用于导航与分类入口
}

export const archiveCategories: ArchiveCategory[] = [
	{
		slug: "study",
		name: "学习",
		kicker: "01 / STUDY",
		icon: "material-symbols:school",
	},
	{
		slug: "life",
		name: "生活",
		kicker: "02 / LIFE",
		icon: "material-symbols:book",
	},
	{
		slug: "project",
		name: "项目",
		kicker: "03 / PROJECT",
		icon: "material-symbols:work",
	},
	{
		slug: "game",
		name: "游戏",
		kicker: "04 / GAME",
		icon: "solar:gamepad-bold",
	},
	{
		slug: "reading",
		name: "读书",
		kicker: "05 / READING",
		icon: "material-symbols:article",
	},
];

const bySlug = new Map(archiveCategories.map((c) => [c.slug, c]));

// slug → 中文显示名;未命中回退原值(兼容尚未归类的示例文章)
export function categoryName(slug: string | null | undefined): string {
	if (!slug) return "";
	return bySlug.get(slug)?.name ?? slug;
}

// slug → 完整分类信息;未命中返回 undefined
export function getArchiveCategory(
	slug: string | null | undefined,
): ArchiveCategory | undefined {
	if (!slug) return undefined;
	return bySlug.get(slug);
}
