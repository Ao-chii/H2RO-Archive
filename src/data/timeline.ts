import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "计算机科学与技术学习",
		description: "围绕课程学习、工程实践、文档整理和个人项目持续积累公开成果。",
		type: "education",
		startDate: "2022-09-01",
		skills: ["Java", "Python", "TypeScript", "Astro", "Markdown"],
		achievements: [
			"整理课程报告、实验记录和复习材料",
			"将可公开成果统一归档到 H2RO Archive",
			"持续维护项目、时间线和说明页面",
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "h2ro-archive-project",
		title: "H2RO Archive",
		description:
			"基于 Mizuki 改造的个人公开成果档案站，面向学习、项目与可公开材料的长期归档。",
		type: "project",
		startDate: "2026-07-06",
		skills: ["Astro", "TypeScript", "Svelte", "Tailwind CSS", "PDF"],
		achievements: [
			"建立分类 URL 和内容归档规范",
			"实现 PDF 原件下载与逐页 WebP 预览",
			"整理中文维护文档和开发规则",
		],
		links: [
			{
				name: "Website",
				url: "https://h2ro.cn/",
				type: "project",
			},
			{
				name: "Mizuki",
				url: "https://github.com/LyraVoid/Mizuki",
				type: "website",
			},
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "pdf-archive-workflow",
		title: "PDF 归档流程",
		description:
			"将课程报告和文档材料以原始 PDF 加网页预览的方式纳入统一内容系统。",
		type: "project",
		startDate: "2026-07-07",
		skills: ["PDF", "sharp", "pdftocairo", "Astro Content"],
		achievements: [
			"约定 `public/artifacts/<slug>/original.pdf` 作为原件位置",
			"生成 `manifest.json` 和 `preview/p-NN.webp`",
			"通过 `docType: pdf` 接入文章详情页",
		],
		icon: "material-symbols:picture-as-pdf",
		color: "#DC2626",
		featured: true,
	},
];
