# 侧栏组件开发指南

本文档规范 H2RO Archive 当前侧栏组件接入流程。侧栏不是自动发现组件的系统，新增组件必须同时改类型、配置和渲染注册。

## 当前侧栏结构

| 文件 | 作用 |
|------|------|
| `src/types/config.ts` | 声明 `WidgetComponentType` 和侧栏配置类型 |
| `src/config/sidebarConfig.ts` | 定义侧栏组件属性、位置和排序 |
| `src/components/layout/SidebarColumn.astro` | 统一侧栏渲染器和 `componentMap` 注册点 |
| `src/components/widgets/sidebar/SideBar.astro` | 左侧栏和抽屉包装层 |
| `src/components/layout/RightSideBar.astro` | 右侧栏包装层 |
| `src/utils/widget-manager.ts` | 根据配置筛选组件 |
| `src/utils/widget-renderer.ts` | 构造组件 props |

`SideBar.astro` 和 `RightSideBar.astro` 不维护独立组件注册表。真正的注册点是 `SidebarColumn.astro`。

## 新增侧栏组件步骤

### 1. 声明类型

文件：`src/types/config.ts`

在 `WidgetComponentType` 增加新类型：

```ts
export type WidgetComponentType =
	| "profile"
	| "announcement"
	| "categories"
	| "tags"
	| "toc"
	| "card-toc"
	| "music-player"
	| "music-sidebar"
	| "site-stats"
	| "calendar"
	| "custom";
```

没有类型声明，配置就不可信。

### 2. 创建组件

推荐目录：

```text
src/components/widgets/example-widget/
├── ExampleWidget.astro
├── types.ts
└── index.ts
```

如果组件需要客户端状态，可在目录内放 Svelte 客户端组件和 hooks。

### 3. 配置侧栏

文件：`src/config/sidebarConfig.ts`

`properties` 定义组件属性，`components` 定义出现在哪个侧栏和顺序：

```ts
properties: [
	{
		type: "example-widget",
		position: "sticky",
		class: "onload-animation",
		animationDelay: 150,
	},
],
components: {
	left: ["profile", "announcement", "tags", "card-toc"],
	right: ["site-stats", "calendar", "categories", "music-sidebar"],
	drawer: ["profile", "announcement", "music-sidebar", "categories", "tags"],
},
```

当前支持区域：

- `left`
- `right`
- `drawer`

当前支持位置：

- `top`
- `sticky`

### 4. 注册渲染组件

文件：`src/components/layout/SidebarColumn.astro`

必须导入组件并加入 `componentMap`：

```ts
import ExampleWidget from "../widgets/example-widget/ExampleWidget.astro";

const componentMap: Record<string, unknown> = {
	profile: Profile,
	announcement: Announcement,
	categories: Categories,
	tags: Tags,
	toc: SidebarTOC,
	"card-toc": CardTOC,
	"music-player": MusicPlayer,
	"music-sidebar": MusicSidebarWidget,
	"site-stats": SiteStats,
	calendar: Calendar,
	"example-widget": ExampleWidget,
};
```

只改 `sidebarConfig.ts` 不注册 `componentMap`，页面会静默不显示。

## 响应式规则

侧栏组件会通过 `widgetManager.getComponentsByPosition(position, side, device)` 按设备筛选。配置中的 `responsive.hidden` 可以隐藏特定设备：

```ts
responsive: {
	hidden: ["mobile"],
	collapseThreshold: 5,
}
```

不要在组件内部硬编码“移动端不显示”，除非组件自身确实无法移动端工作。

## Svelte 组件注意

- 访问浏览器 API 的 Svelte 组件要确认 `client:*` 指令。
- 需要完全跳过 SSR 时使用 `client:only="svelte"`。
- 多个侧栏实例如果需要独立展开状态，状态应放组件内部；真正跨组件共享的状态才放 store。

## 常见问题

### 配置了组件但不显示

按顺序检查：

1. `WidgetComponentType` 是否包含该类型？
2. `sidebarConfig.ts` 的 `properties` 是否包含该类型？
3. `components.left/right/drawer` 是否包含该类型？
4. `SidebarColumn.astro` 的 `componentMap` 是否注册？
5. 当前设备是否被 `responsive.hidden` 隐藏？
6. 组件内部是否有 `enable` 或数据为空导致不渲染？

### 左侧显示，右侧不显示

检查 `sidebarConfig.ts` 的 `components.right`。左右侧栏共用注册表，不存在“右侧栏单独注册一次”的机制。

## 代码审查检查

- [ ] `src/types/config.ts` 已声明类型。
- [ ] `src/config/sidebarConfig.ts` 已配置 `properties`。
- [ ] `components.left/right/drawer` 中的位置符合预期。
- [ ] `src/components/layout/SidebarColumn.astro` 已注册 `componentMap`。
- [ ] Svelte 客户端组件 SSR 边界正确。
- [ ] 没有把侧栏排序写死在组件里。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
