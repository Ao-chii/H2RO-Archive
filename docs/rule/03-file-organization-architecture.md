# 文件组织架构规范

本文档记录 H2RO Archive 当前仓库结构。新增文件时先匹配现有目录职责，不要按旧模板或理想架构新建平行体系。

## 顶层结构

```text
H2RO-Archive/
├── docs/                  # 当前维护文档
├── public/                # 静态资源和 PDF 工件
├── scripts/               # 本地脚本，如 PDF 预览生成
├── src/                   # Astro 源码
├── astro.config.mjs       # Astro、Markdown、Vite 配置
├── package.json           # 脚本、依赖、Node/pnpm 版本
└── tsconfig.json          # TS 配置和路径别名
```

## src 目录职责

| 路径 | 职责 |
|------|------|
| `src/components/` | UI 组件 |
| `src/config/` | 站点、导航、分类、侧栏、评论、音乐等配置 |
| `src/content/` | Markdown / MDX 内容集合 |
| `src/data/` | 特色页面用结构化数据 |
| `src/i18n/` | 模板遗留多语言文案，当前站点主要使用 `zh_CN` |
| `src/layouts/` | 页面布局 |
| `src/pages/` | Astro 路由 |
| `src/plugins/` | Markdown、rehype、Expressive Code、icon 等插件 |
| `src/scripts/` | 浏览器脚本和 Swup hooks |
| `src/stores/` | 客户端共享状态 |
| `src/styles/` | 全局样式和主题样式 |
| `src/types/` | 全局类型 |
| `src/utils/` | 跨域工具函数 |

## 内容目录

```text
src/content/
├── posts/     # 普通文章和 PDF 文档 post
└── spec/      # about、friends 等特殊页面内容
```

规则：

- 普通文章和 PDF 文档都走 `posts` 集合。
- PDF 文档通过 frontmatter 的 `docType: pdf` 区分。
- 内容 schema 在 `src/content.config.ts`。
- 分类 slug 来自 `src/config/archiveCategories.ts`。

## PDF 工件目录

```text
public/artifacts/<slug>/
├── original.pdf
├── manifest.json
└── preview/
    ├── p-01.webp
    └── ...
```

规则：

- `<slug>` 必须和 `src/content/posts/<slug>.md` 对齐。
- `manifest.json` 和 `preview/p-NN.webp` 由 `pnpm artifact <slug> "原始文件名.pdf"` 生成。
- PDF 预览产物进 Git，不放到 CI 生成。

## 组件目录

```text
src/components/
├── atoms/
├── comment/
├── common/
├── control/
├── features/
├── layout/
├── misc/
├── organisms/
└── widgets/
```

新增组件时按职责放置：

- 低业务 UI 放 `atoms/`。
- 页面或内容域功能放 `features/<domain>/`。
- 侧栏小组件放 `widgets/<widget>/`。
- 页面框架放 `layout/`。
- 导航、页脚放 `organisms/`。
- 历史兼容或通用包装才放 `misc/`。

## 配置目录

`src/config/` 是站点行为的主要入口。新增可维护配置时优先放这里，并在 `src/config/index.ts` 暴露。

常用配置：

- `siteConfig.ts`
- `navBarConfig.ts`
- `archiveCategories.ts`
- `permalinkConfig.ts`
- `sidebarConfig.ts`
- `musicConfig.ts`
- `commentConfig.ts`
- `relatedPostsConfig.ts`
- `randomPostsConfig.ts`

不要在组件里复制一份配置常量。

## 命名规则

- Astro / Svelte 组件文件使用 `PascalCase`，例如 `PostCard.astro`、`MusicPlayer.svelte`。
- hooks 使用 `useXxx.ts`。
- 工具函数文件使用小写短横线或既有目录风格，优先跟随同目录。
- 类型共享文件使用 `types.ts`。
- 目录已有 `index.ts` 时，对外导入优先走入口。

## 路径别名

`tsconfig.json` 当前配置了：

```json
{
  "@components/*": ["./src/components/*"],
  "@assets/*": ["./src/assets/*"],
  "@constants/*": ["./src/constants/*"],
  "@utils/*": ["./src/utils/*"],
  "@i18n/*": ["./src/i18n/*"],
  "@layouts/*": ["./src/layouts/*"],
  "@/*": ["./src/*"]
}
```

跨目录导入优先使用这些别名，局部相邻文件可以使用相对路径。

## 禁止事项

- 不新增 `molecules/` 这种当前不存在的顶层目录，除非先完成整体架构决策。
- 不恢复独立内容仓库文档或旧内容分离流程。
- 不把 PDF 原件散落在 `src/content/posts/`。
- 不把页面数据、组件配置和样式覆盖混在同一个文件里。
- 不为追求“整洁”移动大量文件而不改行为测试。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
