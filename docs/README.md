# H2RO Archive 文档中心

这里是 H2RO Archive 的维护文档入口。本站基于 Mizuki 模板改造，但内容组织、分类 URL、PDF 归档、视觉约束和部署规则已经按 H2RO Archive 固定下来；维护时以本目录文档和当前代码为准。

H2RO Archive 是一个面向公开成果的个人档案站，用来归档学习、项目、生活中可以公开的 Markdown、PDF、项目记录和说明材料。文档的目标不是保留模板教程，而是让后续维护者知道：内容放哪里、格式怎么写、部署不能碰什么、组件改动要遵守哪些边界。

## 快速入口

| 任务                                   | 入口                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| 新增普通 Markdown / MDX 文章           | [内容维护规范](./CONTENT_REPOSITORY.md)                                |
| 上传 PDF 并生成页面预览                | [内容维护规范](./CONTENT_REPOSITORY.md#pdf-文档归档)                   |
| 检查 Markdown 表格、提示块、代码块写法 | [Markdown 写作语法约束](./CONTENT_REPOSITORY.md#markdown-写作语法约束) |
| 调整分类、URL 和内容路径               | [内容维护规范](./CONTENT_REPOSITORY.md#当前规则)                       |
| 查看部署版本、站点地址和构建约束       | [部署维护指南](./DEPLOYMENT.md)                                        |
| 开发或拆分组件                         | [开发规范索引](./rule/README.md)                                       |
| 新增或调整侧栏组件                     | [侧栏组件开发指南](./rule/06-sidebar-widget-dev.md)                    |
| 使用 Iconify / 图标组件                | [图标使用规范](./rule/07-icon-usage-specification.md)                  |

## 内容维护要点

- 文章统一放在 `src/content/posts/`。
- 特殊页面内容放在 `src/content/spec/`。
- 分类唯一入口是 `src/config/archiveCategories.ts`。
- frontmatter 的 `category` 使用英文 slug。
- 全站内容路径遵守 `/%category%/%postname%/`。
- PDF 文档使用 `docType: pdf`，工件放在 `public/artifacts/<slug>/`。
- PDF 预览在本地执行 `pnpm artifact <slug> "原始文件.pdf"` 生成，生成物随内容一起提交。
- 上传 Markdown 必须使用本站支持的语法，尤其是表格、提示块、代码块和 frontmatter 字段，不要按印象自造格式。

## 部署维护要点

- Node 固定为 `22.15.x`。
- pnpm 固定为 `11.5.3`。
- 正式站点地址配置在 `src/config/siteConfig.ts` 的 `siteURL`。
- `astro.config.mjs` 保留 `import sitemap from "@astrojs/sitemap";` 静态导入。
- Expressive Code 保留外部 CSS 输出机制。
- 不跑 `pnpm build`，除非维护者明确要求。

## 开发规范

[rule/](./rule/README.md) 目录记录当前代码结构下的组件架构、拆分、文件组织、CSS、原子组件、侧栏组件和图标使用规范。实际开发时以当前代码结构为准，不要为了套用旧模板或理想目录树反向改代码。

当前最可靠的规则入口：

- [组件架构设计规范](./rule/01-component-architecture.md)
- [组件拆分指南](./rule/02-component-split-guide.md)
- [文件组织架构规范](./rule/03-file-organization-architecture.md)
- [CSS 样式指南](./rule/04-css-style-guide.md)
- [原子化组件使用规范](./rule/05-atom-component-usage.md)
- [侧栏组件开发指南](./rule/06-sidebar-widget-dev.md)
- [图标使用规范](./rule/07-icon-usage-specification.md)

## 维护红线

- Git 状态检查使用 `GIT_OPTIONAL_LOCKS=0 git status`。
- 不做 `git reset --hard`、`git clean`、强推等破坏性操作，除非维护者明确要求。
- 不把独立内容仓库、submodule 或旧内容同步脚本当作当前主流程。
- 不把 PDF 预览生成放到 CI / Vercel 构建里。
- 不改 Expressive Code 外部 CSS 机制来绕样式问题。
- 隐私内容由维护者终审，文档只记录结构和流程。
