# H2RO Archive 开发规范

本目录记录 H2RO Archive 当前代码结构下的开发规则。这里的文档只保留中文，并以现有 Astro 项目为准，不再保留旧模板的多语言教程和历史参考。

## 规范列表

| 文档 | 说明 |
|------|------|
| [组件架构设计规范](./01-component-architecture.md) | 当前 `src/components/` 分层和 Astro / Svelte 边界 |
| [组件拆分指南](./02-component-split-guide.md) | 什么时候拆、拆到哪里、如何避免无意义重构 |
| [文件组织架构规范](./03-file-organization-architecture.md) | `src/`、`public/artifacts/`、配置和内容目录规则 |
| [CSS 样式指南](./04-css-style-guide.md) | 样式入口、token、Markdown、Expressive Code 和 `!important` 规则 |
| [原子化组件使用规范](./05-atom-component-usage.md) | 当前 atoms 清单、新增 atom 条件、与 `misc/` 的边界 |
| [侧栏组件开发指南](./06-sidebar-widget-dev.md) | 侧栏类型、配置、`SidebarColumn.astro` 注册流程 |
| [图标使用规范](./07-icon-usage-specification.md) | `astro-icon`、`@iconify/svelte`、自定义 Icon 包装器用法 |

## 当前代码事实

- 组件目录包括 `atoms`、`features`、`widgets`、`organisms`、`layout`、`control`、`misc`、`comment`。
- 侧栏组件不是自动发现，必须改 `WidgetComponentType`、`sidebarConfig.ts` 和 `SidebarColumn.astro`。
- 图标系统有多个入口，`.astro` 和 `.svelte` 的属性名不同。
- Markdown 能力由 `astro.config.mjs` 的 remark / rehype 插件决定，不要自造语法。
- PDF 文档使用 `docType: pdf`，预览工件在 `public/artifacts/<slug>/`。

## 代码审查总清单

- [ ] 新文件放在符合职责的目录。
- [ ] 没有按旧模板理想目录树新建平行结构。
- [ ] 配置项进入 `src/config/`，没有散落在组件里。
- [ ] 内容 schema、分类、固定链接遵守 [内容维护规范](../CONTENT_REPOSITORY.md)。
- [ ] 侧栏组件已完成类型、配置和 `componentMap` 三处接入。
- [ ] 图标使用了对应框架的正确组件和属性名。
- [ ] 样式优先使用现有 token，没有无理由新增 `!important`。
- [ ] Svelte 客户端组件的 SSR 边界明确。
- [ ] 不跑 `pnpm build`，除非维护者明确要求。

## 相关文档

- [文档中心](../README.md)
- [内容维护规范](../CONTENT_REPOSITORY.md)
- [部署维护指南](../DEPLOYMENT.md)

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
