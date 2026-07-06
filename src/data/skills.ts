// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills
	{
		id: "javascript",
		name: "JavaScript",
		description:
			"用于页面交互、异步流程和模块化前端逻辑的核心语言。",
		icon: "logos:javascript",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#F7DF1E",
	},
	{
		id: "typescript",
		name: "TypeScript",
		description:
			"为前端代码补上类型约束，降低组件、配置和状态流转中的隐性错误。",
		icon: "logos:typescript-icon",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#3178C6",
	},
	{
		id: "vue",
		name: "Vue",
		description:
			"用于构建单页应用和交互界面，适合快速组织组件、路由与页面状态。",
		icon: "logos:vue",
		category: "frontend",
		level: "advanced",
		experience: { years: 0, months: 0 },
		color: "#4FC08D",
	},
	{
		id: "astro",
		name: "Astro",
		description:
			"用于构建内容型静态站点，适合博客、档案页和轻量级展示页面。",
		icon: "logos:astro-icon",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#FF5D01",
	},
	{
		id: "vite",
		name: "Vite",
		description:
			"用于前端开发服务器、打包流程和现代项目脚手架。",
		icon: "logos:vitejs",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#646CFF",
	},
	{
		id: "css",
		name: "CSS",
		description:
			"负责响应式布局、视觉层级和组件样式落地，是页面质感的基本功。",
		icon: "logos:css-3",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#1572B6",
	},
	{
		id: "html",
		name: "HTML",
		description:
			"负责页面结构、语义组织和内容承载，是前端界面的基础骨架。",
		icon: "logos:html-5",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#E34F26",
	},

	// Backend Skills
	{
		id: "nodejs",
		name: "Node.js",
		description:
			"用于服务端 JavaScript 运行环境，适合接口服务、脚本工具和前后端同构项目。",
		icon: "logos:nodejs-icon",
		category: "backend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#339933",
	},
	{
		id: "python",
		name: "Python",
		description:
			"用于后端脚本、实验工程、数据处理和原型验证，是当前仓库里最稳定的主力语言之一。",
		icon: "logos:python",
		category: "backend",
		level: "advanced",
		experience: { years: 0, months: 0 },
		color: "#3776AB",
	},
	{
		id: "c",
		name: "C",
		description:
			"用于贴近底层的程序设计训练，强调内存、指针和运行时模型的基本功。",
		icon: "logos:c",
		category: "backend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#A8B9CC",
	},
	{
		id: "cpp",
		name: "C++",
		description:
			"用于面向对象、性能敏感和系统侧开发场景，承接 C 系语言的工程化表达。",
		icon: "logos:c-plusplus",
		category: "backend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#00599C",
	},
	{
		id: "csharp",
		name: "C#",
		description:
			"用于 .NET 生态和应用型项目开发，也覆盖桌面、工具和后端服务场景。",
		icon: "devicon:csharp",
		category: "backend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#239120",
	},
	{
		id: "java",
		name: "Java",
		description:
			"用于面向对象开发、课程项目和后端服务基础，适合组织较完整的业务逻辑。",
		icon: "logos:java",
		category: "backend",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#ED8B00",
	},

	// Database Skills
	{
		id: "mysql",
		name: "MySQL",
		description:
			"用于关系型数据建模、查询和常见 Web 应用的数据持久化。",
		icon: "logos:mysql-icon",
		category: "database",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#4479A1",
	},
	{
		id: "postgresql",
		name: "PostgreSQL",
		description:
			"用于结构化数据存储、复杂查询和较严肃的关系型数据库场景。",
		icon: "logos:postgresql",
		category: "database",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#336791",
	},
	{
		id: "redis",
		name: "Redis",
		description:
			"用于缓存、临时状态和高频读写场景，补足关系型数据库的响应压力。",
		icon: "logos:redis",
		category: "database",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#DC382D",
	},

	// Tools
	{
		id: "git",
		name: "Git",
		description:
			"用于版本管理、分支协作和变更追踪，是维护项目历史的基础工具。",
		icon: "logos:git-icon",
		category: "tools",
		level: "advanced",
		experience: { years: 0, months: 0 },
		color: "#F05032",
	},
	{
		id: "vscode",
		name: "VS Code",
		description:
			"用于日常编码、项目浏览和插件化开发流程，适合快速处理多语言项目。",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "advanced",
		experience: { years: 0, months: 0 },
		color: "#007ACC",
	},
	{
		id: "pycharm",
		name: "PyCharm",
		description:
			"用于 Python 项目的代码分析、调试和工程化管理。",
		icon: "logos:pycharm",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#21D789",
	},
	{
		id: "docker",
		name: "Docker",
		description:
			"用于容器化开发环境、服务编排和项目部署前的环境隔离。",
		icon: "logos:docker-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#2496ED",
	},
	{
		id: "linux",
		name: "Linux",
		description:
			"用于开发环境、命令行操作和服务部署场景，是后端与工程实践的基础环境。",
		icon: "logos:linux-tux",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#FCC624",
	},
	{
		id: "codex",
		name: "Codex",
		description:
			"OpenAI 开发的 AI 编程助手，用于代码阅读、改造和项目维护。",
		icon: "simple-icons:openai",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#10A37F",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		description:
			"Anthropic 开发的终端 AI 编程工具，用于代码生成、重构辅助和复杂上下文分析。",
		icon: "simple-icons:anthropic",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#D97757",
	},
	{
		id: "opencode",
		name: "OpenCode",
		description:
			"SST 推出的开源终端 AI 编程工具，偏向轻量、直接的代码修改与项目操作。",
		icon: "simple-icons:opencode",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#616161",
	},
	{
		id: "gemini",
		name: "Gemini",
		description:
			"Google 开发的 AI 模型与开发助手，用于代码问答、方案比较和多模态辅助分析。",
		icon: "simple-icons:googlegemini",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#8E75B2",
	},

	// Other Skills
	{
		id: "markdown",
		name: "Markdown",
		description:
			"用于技术文档、项目记录和结构化笔记写作，强调清晰、轻量和可追踪。",
		icon: "logos:markdown",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#616161",
	},
	{
		id: "powerpoint",
		name: "PowerPoint / PPT",
		description:
			"用于课程汇报、项目展示和方案表达，把复杂内容整理成可讲述的页面结构。",
		icon: "simple-icons:microsoftpowerpoint",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#B7472A",
	},
	{
		id: "pytest",
		name: "pytest",
		description:
			"用于 Python 项目的单元测试和回归验证，让实验代码与后端逻辑更容易复查。",
		icon: "simple-icons:pytest",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#0A9EDC",
	},
	{
		id: "obsidian",
		name: "Obsidian",
		description:
			"用于个人知识库、项目资料和长期笔记管理，适合沉淀可连接的工作记录。",
		icon: "simple-icons:obsidian",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 0 },
		color: "#7C3AED",
	},
];
