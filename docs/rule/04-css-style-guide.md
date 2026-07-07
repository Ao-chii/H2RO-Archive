# CSS 样式指南

本文档记录 H2RO Archive 当前样式规则。本站视觉方向是纸面、档案、克制、可阅读；改样式时优先使用现有 token 和局部组件样式，不要靠强行覆盖堆出效果。

## 样式入口

| 路径 | 作用 |
|------|------|
| `src/styles/main.css` | 全局样式入口 |
| `src/styles/variables.styl` | 主题变量和基础 token |
| `src/styles/markdown.css` | Markdown 正文样式 |
| `src/styles/markdown-extend.styl` | Markdown 扩展样式 |
| `src/styles/expressive-code.css` | 代码块补充样式 |
| `src/styles/toc.css` | TOC 样式 |
| `src/styles/twikoo.css` | Twikoo 评论样式覆盖 |
| `src/styles/widget-responsive.css` | 小组件响应式样式 |

## 基本原则

- 优先使用 CSS 变量、Tailwind 工具类和组件局部样式。
- 不新增一套平行主题变量。
- 不使用大面积高饱和渐变或与纸墨风格冲突的装饰。
- 卡片、面板、按钮圆角跟随现有 8px 左右的克制风格。
- 页面级样式放全局样式文件，组件私有样式放组件内。
- 修改 Markdown、代码块、TOC、评论区这类共享样式时要特别克制。

## `!important` 规则

默认禁止新增 `!important`。

允许例外：

- `src/styles/twikoo.css` 中覆盖第三方 Twikoo 注入样式。
- 第三方库样式无法通过正常选择器覆盖时，可以少量使用，但必须写明原因。

不允许用 `!important` 解决普通组件样式冲突。普通冲突应该通过更清晰的作用域、组件结构或变量解决。

## 主题变量

新增颜色、间距或字体前先查现有变量。常见变量来自：

- `src/styles/variables.styl`
- `src/styles/main.css`
- Astro / Tailwind 已有工具类

规则：

- 语义色用变量，不在多个组件里硬编码同一个色值。
- 新增变量要能被两个以上位置复用，或代表明确语义。
- 不为了单个按钮新增全局变量。

## Markdown 样式

Markdown 内容由 Astro Markdown 管线和 `src/styles/markdown.css` 等文件共同处理。

规则：

- 表格、提示块、代码块样式修改要兼容现有文章。
- 不用正文样式兜底修 Expressive Code 的布局问题。
- 代码块异常时先查 `astro.config.mjs` 的 Expressive Code 配置和外部 CSS 是否正常加载。
- 提示块类型以 `note`、`tip`、`important`、`warning`、`caution` 为准。

## Expressive Code

`astro.config.mjs` 当前使用 `astro-expressive-code`，并保留外部 CSS 机制。

禁止事项：

- 不设置 `emitExternalStylesheet: false` 来绕问题。
- 不用手写 `.ec-line` 大片样式替代插件主题。
- 不把 `import sitemap from "@astrojs/sitemap";` 改成动态加载来绕工具链问题。

## 响应式样式

- 移动端优先保证不横向溢出。
- 固定格式元素应有稳定尺寸，例如工具栏、按钮组、PDF 预览页。
- 文本不能靠视口宽度无限缩放。
- 控件 hover、active、loading 状态不能改变布局尺寸。

## 代码审查检查

- [ ] 没有无理由新增 `!important`。
- [ ] 使用了现有 token 或局部作用域，而不是散落硬编码。
- [ ] Markdown、代码块、TOC、评论区修改没有扩大影响面。
- [ ] 响应式下文本和控件不会重叠。
- [ ] 没有为了视觉效果破坏 H2RO Archive 的纸墨档案风格。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
