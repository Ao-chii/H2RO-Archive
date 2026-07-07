// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = Record<string, Device[]> & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Phone: [
		{
			name: "OnePlus Ace 2",
			image: "/images/device/oneplus-ace2.png",
			specs: "12GB + 256GB / Snapdragon 8+ Gen 1",
			description:
				"主力手机，5000mAh 电池、100W 快充，搭载满血版第一代骁龙 8+。",
			link: "https://www.oneplus.com/cn/ace-2/specs",
		},
	],
	Laptop: [
		{
			name: "Legion R9000P ARX8",
			image: "/images/device/legion-r9000p-arx8.webp",
			specs: "Ryzen 9 7945HX / RTX 4060 / 16GB / 1TB",
			description:
				"主力笔记本，80Wh 电池，搭载 AMD Ryzen 9 7945HX 与 RTX 4060 Laptop GPU。",
			link: "https://www.lenovo.com.cn/",
		},
	],
	Keyboard: [
		{
			name: "AULA F87",
			image: "/images/device/aula-f87.webp",
			specs: "87 Keys / Tri-mode / Mechanical",
			description: "狼蛛 F87 三模机械键盘，覆盖有线、2.4G 与蓝牙连接场景。",
			link: "https://www.aulacn.com/",
		},
	],
	Monitor: [
		{
			name: "SANC G52Max",
			image: "/images/device/sanc-g52max.webp",
			specs: "Gaming Monitor",
			description: "桌面主显示器，用于日常开发、资料阅读和游戏场景。",
			link: "https://www.sanc.com.cn/",
		},
	],
	Audio: [
		{
			name: "EDIFIER W820NB",
			image: "/images/device/edifier-w820nb-double-gold.jpg",
			specs: "双金标版 / Wireless ANC Headphones",
			description: "漫步者 W820NB 双金标版，日常使用的无线降噪头戴耳机。",
			link: "https://www.edifier.com/",
		},
	],
};
