import type { CommentConfig } from "../types/config";
import { SITE_LANG } from "./siteConfig";

// 评论系统配置
export const commentConfig: CommentConfig = {
	enable: true, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	system: "giscus", // 评论系统选择: "twikoo" | "giscus"
	twikoo: {
		envId: "", // 启用 Twikoo 前填写自己的环境 ID 或服务地址
		lang: SITE_LANG,
	},
	giscus: {
		repo: "Ao-chii/H2RO-Archive",
		repoId: "R_kgDOTMgeyA",
		category: "Announcements",
		categoryId: "DIC_kwDOTMgeyM4DAzKT",
		mapping: "pathname",
		strict: "0",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: SITE_LANG,
		loading: "lazy",
	},
};
