import type { ExpressiveCodeConfig } from "../types/config";

// 代码块样式配置
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
	// H2RO 第一阶段只做浅色纸面基线。
	theme: "github-light",
	// 是否在主题切换时隐藏代码块以避免卡顿问题
	hideDuringThemeTransition: false,
};
