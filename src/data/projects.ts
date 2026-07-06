// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
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
		id: "trace",
		title: "Trace",
		description:
			"面向测试生成的 Python/FastAPI Agent，支持可审计执行轨迹、反思保护的 pytest 生成与种子缺陷评测。",
		image: "",
		category: "web",
		techStack: ["Python", "FastAPI", "pytest", "Vue", "TypeScript"],
		status: "in-progress",
		sourceCode: "https://github.com/Ao-chii/Trace",
		startDate: "2026-01-01",
		featured: true,
		tags: ["Agent", "Python", "FastAPI", "pytest", "Vue"],
		showImage: false,
	},
	{
		id: "edge-delta",
		title: "Edge Delta",
		description:
			"华中科技大学虚拟现实技术课程设计项目，使用 C# 与 Unity 技术栈实现课程设计原型与交互展示。",
		image: "",
		category: "desktop",
		techStack: ["C#", "Unity", "ShaderLab", "HLSL", "Wolfram Language"],
		status: "completed",
		sourceCode: "https://github.com/Ao-chii/Edge-Delta",
		startDate: "2026-06-01",
		endDate: "2026-06-08",
		featured: true,
		tags: ["HUST", "Database", "Course Design"],
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
