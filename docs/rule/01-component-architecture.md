# 组件架构设计规范

本文档描述 H2RO Archive 当前真实采用的组件架构。维护时以现有代码结构为准，不要为了套用传统 Atomic Design 目录树而反向改代码。

## 当前组件分层

`src/components/` 目前不是单纯的 `atoms -> molecules -> organisms -> pages`。当前有效分层如下：

| 层级 | 路径 | 职责 |
|------|------|------|
| 基础组件 | `src/components/atoms/` | 按钮、图标、图片、链接、徽章、加载器等低业务含量 UI |
| 功能组件 | `src/components/features/` | 文章、归档、PDF 预览、项目、时间线、TOC、设置面板等业务功能 |
| 小组件 | `src/components/widgets/` | 侧栏和可配置小部件，如 profile、categories、tags、calendar、music-sidebar |
| 页面骨架 | `src/components/layout/` | 横幅、左右侧栏列、页面布局相关结构 |
| 组织组件 | `src/components/organisms/` | 导航栏、页脚等跨页面大块组件 |
| 控制组件 | `src/components/control/` | 返回顶部、分页、浮动控制、主题/布局切换等交互控制 |
| 通用兼容组件 | `src/components/misc/` | Markdown 包装、许可证、兼容 Icon 包装器、分享海报等历史通用件 |
| 评论组件 | `src/components/comment/` | Twikoo、Giscus 和评论入口 |

## 分层规则

- `atoms/` 只放低业务含量的基础 UI，不读取站点配置，不直接查询内容集合。
- `features/` 按业务域组织，例如 `posts/`、`artifacts/`、`toc/`、`projects/`。
- `widgets/` 用于侧栏或可配置展示单元，是否出现和排序由配置控制。
- `layout/` 只负责布局骨架和组件编排，不承载业务数据处理。
- `organisms/` 用于导航、页脚这类跨页面大结构。
- `misc/` 是历史兼容区，新代码不要随手往里面塞；如果组件有明确业务域，优先放到 `features/` 或 `widgets/`。

## 组件目录约定

复杂组件推荐使用目录封装：

```text
src/components/features/example/
├── ExamplePanel.astro
├── ExampleClient.svelte
├── hooks/
├── types.ts
└── index.ts
```

规则：

- 对外导出优先走该目录的 `index.ts`。
- Props 类型简单时可写在组件内，多个组件共享时放 `types.ts`。
- Svelte 客户端组件只负责浏览器交互；可在 Astro 完成的数据准备不要下放到客户端。
- 同一业务域的 hooks、utils、types 放在业务目录内；跨业务复用后再提升到 `src/utils/`。

## Astro 与 Svelte 边界

- `.astro` 组件优先用于静态结构、服务端数据准备和页面组合。
- `.svelte` 组件用于需要客户端状态、音频控制、筛选、面板开关等交互。
- Svelte 组件如果访问 `window`、`document`、`localStorage`，必须确认渲染指令不会触发 SSR 错误。
- 需要完全跳过 SSR 的 Svelte 组件使用 `client:only="svelte"`。

## 配置驱动边界

这些功能有明确配置入口，不要在组件里散落写死：

| 功能 | 配置入口 |
|------|----------|
| 站点信息 | `src/config/siteConfig.ts` |
| 导航 | `src/config/navBarConfig.ts` |
| 分类 | `src/config/archiveCategories.ts` |
| 固定链接 | `src/config/permalinkConfig.ts` |
| 侧栏组件 | `src/config/sidebarConfig.ts` |
| 音乐 | `src/config/musicConfig.ts` |
| 评论 | `src/config/commentConfig.ts` |
| 相关/随机文章 | `src/config/relatedPostsConfig.ts`、`src/config/randomPostsConfig.ts` |

## 导入规则

- 项目支持 `@components/*`、`@utils/*`、`@layouts/*`、`@/*` 等路径别名，配置见 `tsconfig.json`。
- 同目录或相邻文件可以使用相对路径；跨大目录优先使用别名。
- 不要从深层文件绕过模块入口导入内部实现，除非该目录没有 `index.ts`。

## 代码审查检查

- [ ] 新组件放在符合职责的目录，而不是塞进 `misc/`。
- [ ] 组件没有把配置、数据查询、UI 状态混在一起。
- [ ] 业务功能组件按业务域聚合，跨域复用才提升。
- [ ] Svelte 组件的 SSR 边界明确。
- [ ] 配置项使用现有 `src/config/` 入口，没有在组件里写死。
- [ ] 导出入口和类型位置清晰，后续维护者能顺着目录找到实现。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
