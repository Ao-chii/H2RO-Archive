import type { AnnouncementConfig } from "../types/config";

// 公告栏配置
export const announcementConfig: AnnouncementConfig = {
	title: "公开档案", // 公告标题，填空使用i18n字符串Key.announcement
	content: "H2RO Archive 用来整理可公开的学习、项目、生活成果。", // 公告内容
	closable: false, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "查看说明", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};
