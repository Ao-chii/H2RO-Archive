import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "H2RO",
	bio: "MORE ONE NIGHT",
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/Ao-chii",
		},
		{
			name: "Email",
			icon: "fa7-solid:envelope",
			url: "mailto:xiaohj1230@foxmail.com",
		},
		{
			name: "Bangumi",
			icon: "bangumi",
			url: "https://bangumi.tv/user/964582",
		},
		{
			name: "Steam",
			icon: "fa7-brands:steam",
			url: "https://steamcommunity.com/profiles/76561199478532198/",
		},
	],
};
