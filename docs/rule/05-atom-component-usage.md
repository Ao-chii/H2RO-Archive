# 原子化组件使用规范

本文档说明当前 `src/components/atoms/` 的使用边界。原子组件是低业务含量 UI，不是所有小组件的垃圾桶。

## 当前 atoms 清单

| 组件 | 路径 | 用途 |
|------|------|------|
| `Badge` | `src/components/atoms/Badge/` | 徽章、计数、状态标记 |
| `Button` | `src/components/atoms/Button/` | 基础按钮 |
| `Chip` | `src/components/atoms/Chip/` | 标签、分类 chip |
| `Icon` | `src/components/atoms/Icon/` | 自定义 Iconify 图标包装 |
| `Image` | `src/components/atoms/Image/` | 图片封装 |
| `Link` | `src/components/atoms/Link/` | 链接封装 |
| `Loader` | `src/components/atoms/Loader/` | 加载状态 |
| `custom-scrollbar` | `src/components/atoms/custom-scrollbar/` | 自定义滚动条 |
| `filter-tabs` | `src/components/atoms/filter-tabs/` | 筛选 tab |
| `tag-chip` | `src/components/atoms/tag-chip/` | 文章标签 chip |
| `typewriter-text` | `src/components/atoms/typewriter-text/` | 打字机文本 |

## 使用规则

- 写新 UI 前先查 `atoms/` 是否已有基础件。
- 如果只是样式不同，优先通过 props、class 或组合解决，不要复制一份组件。
- 如果组件需要读取内容、配置或业务数据，它通常不该放在 `atoms/`。
- 如果组件只服务一个业务域，先放到对应 `features/<domain>/`。
- 如果组件会进入侧栏配置体系，放到 `widgets/<widget>/`。

## 什么时候新增 atom

满足以下条件时可以新增：

- 它是低业务含量 UI。
- 至少两个业务域可能复用。
- Props 可以保持稳定、简单。
- 不直接依赖页面路由、内容集合或站点配置。

不满足这些条件时，先做业务域组件。过早抽 atom 只会制造另一个难懂的抽象。

## 标准目录

```text
src/components/atoms/Example/
├── Example.astro
├── types.ts
└── index.ts
```

Svelte atom 也可以使用同样结构：

```text
src/components/atoms/Example/
├── Example.svelte
├── types.ts
└── index.ts
```

规则：

- `index.ts` 负责导出组件和类型。
- Props 类型复杂或复用时放 `types.ts`。
- 组件样式优先局部化。
- 不在 atom 中写业务文案。

## 与 misc 的关系

`src/components/misc/` 保留部分历史通用组件和兼容包装，例如：

- `Markdown.astro`
- `License.astro`
- `ListContainer.astro`
- `ListDivider.astro`
- `Icon.astro`

新代码不要默认放 `misc/`。例如图标新代码优先使用 `src/components/atoms/Icon/`，`src/components/misc/Icon.astro` 只是兼容包装器。

## 代码审查检查

- [ ] 是否复用了已有 atom？
- [ ] 新增 atom 是否低业务含量？
- [ ] 是否提供清晰 Props 类型？
- [ ] 是否通过 `index.ts` 导出？
- [ ] 是否避免把业务配置、内容查询和路由逻辑放进 atom？
- [ ] 是否没有为了少写几行代码而制造过度抽象？

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
