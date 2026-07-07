# 图标使用规范

本文档说明 H2RO Archive 当前图标系统。项目同时使用 `astro-icon`、`@iconify/svelte` 和自定义 Icon 包装器，属性名不能混用。

## 使用方式

| 场景 | 导入 | 属性 | 说明 |
|------|------|------|------|
| `.astro` 常规图标 | `import { Icon } from "astro-icon/components"` | `name` | 首选方式，构建期处理 |
| `.svelte` 图标 | `import Icon from "@iconify/svelte"` | `icon` | Svelte 客户端组件使用 |
| `.astro` 需要 fallback/loading | `import { Icon } from "@components/atoms/Icon"` | `icon` | 使用自定义包装器 |
| 历史兼容 | `src/components/misc/Icon.astro` | `icon` | 只作为兼容层，新代码少用 |

不要直接在业务代码中写原生 `<iconify-icon>`。

## Astro 文件首选写法

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="material-symbols:archive-outline" class="text-base" />
```

注意：`astro-icon` 使用 `name`，不是 `icon`。

## Svelte 文件写法

```svelte
<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<Icon icon="material-symbols:play-arrow" class="text-xl" />
```

注意：`@iconify/svelte` 使用 `icon`，不是 `name`。

## 自定义 Icon 包装器

当前实现位置：

- `src/components/atoms/Icon/Icon.astro`
- `src/components/atoms/Icon/types.ts`
- `src/components/misc/Icon.astro`

Props：

```ts
export interface IconProps {
	icon: string;
	class?: string;
	style?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	color?: string;
	fallback?: string;
	loading?: "lazy" | "eager";
}
```

新代码如果需要这个包装器，优先从 `@components/atoms/Icon` 或具体实现路径导入。`misc/Icon.astro` 只是向后兼容包装器。

## 图标集

当前依赖里包含：

- `@iconify-json/material-symbols`
- `@iconify-json/mdi`
- `@iconify-json/simple-icons`
- `@iconify-json/solar`
- `@iconify-json/fa7-solid`
- `@iconify-json/fa7-regular`
- `@iconify-json/fa7-brands`

新增普通 UI 图标时优先选 `material-symbols:`，品牌图标再用 `simple-icons:` 或 `fa7-brands:`。

## 尺寸规则

- 优先用 Tailwind 文本尺寸或宽高类控制图标大小，例如 `text-base`、`text-xl`、`w-4 h-4`。
- 不在多个组件里写散乱的 `width="17"`、`height="17"`。
- 图标按钮要有稳定尺寸，hover 状态不能改变按钮布局。

## 常见错误

```astro
<!-- 错误：astro-icon 不认识 icon -->
<Icon icon="material-symbols:home" />

<!-- 正确 -->
<Icon name="material-symbols:home" />
```

```svelte
<!-- 错误：@iconify/svelte 不认识 name -->
<Icon name="material-symbols:home" />

<!-- 正确 -->
<Icon icon="material-symbols:home" />
```

```astro
<!-- 错误：业务代码直接使用 Web Component -->
<iconify-icon icon="material-symbols:home"></iconify-icon>
```

## 代码审查检查

- [ ] `.astro` 中常规图标使用 `astro-icon/components` 和 `name`。
- [ ] `.svelte` 中使用 `@iconify/svelte` 和 `icon`。
- [ ] 没有直接写 `<iconify-icon>`。
- [ ] 新代码没有优先使用 `misc/Icon.astro`。
- [ ] 图标尺寸和按钮尺寸稳定。
- [ ] 图标集选择符合当前视觉风格。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
