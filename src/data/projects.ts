// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "algorithm" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "h2ro-archive",
		title: "H2RO Archive",
		description:
			"个人公开档案站，用 Astro 承载学习、项目与生活材料，支持 Markdown 文章、PDF 预览和分类归档。",
		image: "/assets/projects/h2ro-archive.png",
		category: "web",
		techStack: ["Astro", "TypeScript", "Svelte", "Tailwind CSS", "Markdown"],
		status: "in-progress",
		sourceCode: "https://github.com/Ao-chii/H2RO-Archive",
		startDate: "2026-07-01",
		featured: true,
		tags: ["Archive", "Blog", "Static Site"],
	},
	{
		id: "trace",
		title: "Trace",
		description:
			"面向测试生成的 Python/FastAPI Agent，支持可审计执行轨迹、反思保护的 pytest 生成与种子缺陷评测。",
		image: "/assets/projects/trace.png",
		category: "web",
		techStack: ["Agent", "FastAPI", "pytest", "Vue", "TypeScript"],
		status: "in-progress",
		sourceCode: "https://github.com/Ao-chii/Trace",
		startDate: "2026-06-01",
		featured: true,
		tags: ["Agent", "Python", "pytest", "Vue"],
	},
	{
		id: "edge-delta",
		title: "Edge Delta",
		description:
			"华科软件学院虚拟现实技术课程设计项目，使用 C# 与 Unity 技术栈实现课程设计原型与交互展示。",
		image: "/assets/projects/edge-delta.png",
		category: "desktop",
		techStack: ["C#", "Unity", "ShaderLab", "FPS", "Rouge-like"],
		status: "completed",
		sourceCode: "https://github.com/Ao-chii/Edge-Delta",
		startDate: "2026-06-01",
		endDate: "2026-06-08",
		featured: true,
		tags: ["Unity", "FPS", "Rouge-like"],
	},
	{
		id: "leetcode-acm",
		title: "LeetCode ACM",
		description:
			"面向 Hot 100 与 ACM 风格本地训练的算法练习工作区，用于沉淀题解、模板和调试流程。",
		image: "",
		category: "algorithm",
		techStack: ["Python", "Algorithm", "ACM", "LeetCode"],
		status: "in-progress",
		sourceCode: "https://github.com/Ao-chii/leetcode-acm",
		startDate: "2025-01-01",
		featured: true,
		tags: ["Algorithm", "LeetCode", "Practice"],
		showImage: false,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
