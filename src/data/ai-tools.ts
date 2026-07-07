export type AIToolCategory =
	| "chat"
	| "coding"
	| "image"
	| "audio"
	| "video"
	| "writing"
	| "search"
	| "other";

export type AIToolFrequency =
	| "daily"
	| "weekly"
	| "occasional"
	| "experimental";

export type LocaleString = Partial<
	Record<"en" | "zh_CN" | "zh_TW" | "ja", string>
>;

export function getLocaleString(value: LocaleString, lang: string): string {
	return value[lang as keyof LocaleString] ?? value.en ?? "";
}

export interface AITool {
	id: string;
	name: string;
	description: LocaleString;
	icon: string;
	categories: AIToolCategory[];
	frequency: AIToolFrequency;
	url?: string;
	usage?: LocaleString;
	tags?: string[];
	color?: string;
}

export const aiToolsData: AITool[] = [
	{
		id: "gpt",
		name: "GPT",
		description: {
			en: "OpenAI's general-purpose AI assistant for writing, reasoning, and code questions.",
			zh_CN: "OpenAI 开发的通用 AI 助手，用于写作、推理和代码问答。",
		},
		icon: "simple-icons:openai",
		categories: ["chat", "coding", "image"],
		frequency: "daily",
		url: "https://chatgpt.com/",
		usage: {
			en: "Daily: chat, coding support, image generation",
			zh_CN: "日常：对话、编码辅助、图像生成",
		},
		tags: ["OpenAI", "Chat", "Coding", "Image"],
		color: "#10A37F",
	},
	{
		id: "claude",
		name: "Claude",
		description: {
			en: "Anthropic's AI assistant for long-context reading, analysis, and implementation planning.",
			zh_CN: "Anthropic 开发的 AI 助手，用于长上下文阅读、分析和实现方案梳理。",
		},
		icon: "simple-icons:anthropic",
		categories: ["coding"],
		frequency: "daily",
		url: "https://claude.ai/",
		usage: {
			en: "Daily: code analysis, refactoring, implementation planning",
			zh_CN: "日常：代码分析、重构、实现方案梳理",
		},
		tags: ["Anthropic", "Coding", "Long Context"],
		color: "#D97757",
	},
	{
		id: "gemini",
		name: "Gemini",
		description: {
			en: "Google's AI assistant for multimodal understanding, search-style answers, and cross-checking information.",
			zh_CN:
				"Google 开发的 AI 助手，用于多模态理解、搜索式问答和资料交叉验证。",
		},
		icon: "simple-icons:googlegemini",
		categories: ["chat", "image"],
		frequency: "weekly",
		url: "https://gemini.google.com/",
		usage: {
			en: "Weekly: chat, multimodal analysis, image generation",
			zh_CN: "每周：对话、多模态分析、图像生成",
		},
		tags: ["Google", "Chat", "Image"],
		color: "#8E75B2",
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		description: {
			en: "DeepSeek's AI assistant for Chinese Q&A, reasoning drafts, and coding support.",
			zh_CN: "DeepSeek 开发的 AI 助手，用于中文问答、推理草稿和代码辅助。",
		},
		icon: "simple-icons:deepseek",
		categories: ["chat"],
		frequency: "weekly",
		url: "https://chat.deepseek.com/",
		usage: {
			en: "Weekly: Chinese Q&A and reasoning",
			zh_CN: "每周：中文问答、推理",
		},
		tags: ["DeepSeek", "Chat", "Reasoning"],
		color: "#4D6BFF",
	},
];
