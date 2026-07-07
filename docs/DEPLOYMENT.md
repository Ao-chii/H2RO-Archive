# H2RO Archive 部署维护指南

本文档记录当前 H2RO Archive 的部署约束。旧 Mizuki 模板的内容分离、submodule 和自动触发构建说明已经不作为当前部署依据。

## 当前部署原则

- 项目根目录是 `D:\GitRepo\H2RO-Archive\H2RO-Archive`。
- Node 固定为 `22.15.x`。
- pnpm 固定为 `11.5.3`。
- 正式站点地址配置在 `src/config/siteConfig.ts` 的 `siteURL`，不是直接改 `astro.config.mjs`。
- `astro.config.mjs` 必须保留 `import sitemap from "@astrojs/sitemap";` 这种静态 import。
- Expressive Code 必须保留外部 CSS 输出机制，不要改成内联样式规避问题。
- PDF 预览工件由本地生成并提交进 Git，部署环境不负责运行 `pdftocairo`。
- 不跑 `pnpm build`，除非维护者明确要求。

## 环境版本

当前版本约束来自 `package.json`：

```json
{
  "engines": {
    "node": "22.15.x",
    "pnpm": "11.5.3"
  },
  "packageManager": "pnpm@11.5.3"
}
```

本地推荐确认：

```powershell
node --version
pnpm --version
```

如果使用 nvm-windows：

```powershell
nvm use 22.15.0
```

如果 `pnpm` 版本不一致，使用 Corepack 切到项目指定版本：

```powershell
corepack enable
corepack prepare pnpm@11.5.3 --activate
```

## 站点地址

正式地址在：

```text
src/config/siteConfig.ts
```

字段：

```ts
siteURL: "https://h2ro.cn/"
```

要求：

- 部署前确认是正式域名。
- 以 `/` 结尾。
- `astro.config.mjs` 通过 `site: siteConfig.siteURL` 读取该值，不要复制一份硬编码配置。

## 内容和工件

当前内容直接随主仓库发布：

- Markdown / MDX：`src/content/posts/`
- 特殊页面：`src/content/spec/`
- PDF 原件和预览：`public/artifacts/<slug>/`
- 分类入口：`src/config/archiveCategories.ts`

PDF 预览必须本地生成后提交：

```powershell
pnpm artifact <slug> "原始文件名.pdf"
```

部署平台只读取已提交的：

- `original.pdf`
- `manifest.json`
- `preview/p-NN.webp`

不要把 PDF 预览生成放到 Vercel / GitHub Actions / Netlify 构建里，`pdftocairo` 不应成为线上构建依赖。

## Astro 配置注意事项

### Sitemap

不要把：

```ts
import sitemap from "@astrojs/sitemap";
```

改成 `createRequire()` 或动态加载。之前验证过，这会破坏 Astro/Vite dev 对 Expressive Code 外部 CSS 的处理路径。

### Expressive Code

保留外部 CSS 机制：

- 不要设置 `emitExternalStylesheet: false`。
- 不要用手写 `.ec-line` 样式替代 Expressive Code 主题 CSS。
- 如果代码块样式异常，先检查 `/_astro/ec.*.css` 是否以 `text/css` 正常加载。

### Dev Server

`astro.config.mjs` 当前 dev 端口为：

```ts
server: {
  port: 3000,
}
```

本地预览通常是：

```text
http://127.0.0.1:3000/
```

Codex 环境中不要默认接管维护者已经打开的前台 dev server。需要由 Codex 自己启动时，优先使用单独端口，并避免 Astro agent 自动 background 路径造成运行环境差异。

## 部署前检查

在不运行构建的常规文档维护流程里，只检查配置和 Git 状态：

```powershell
GIT_OPTIONAL_LOCKS=0 git status
```

真正部署或发布前由维护者决定是否运行：

```powershell
pnpm install --frozen-lockfile
pnpm build
```

如果运行构建，应确认当前 Node 是 `22.15.x`，不是 `22.16.0` 或不受控的 `lts/*`。

## CI 配置提示

当前仓库只保留 `.github/workflows/lint.yml` 作为基础检查 workflow：

- 触发分支为 `main` 和 `master`。
- Node 固定为 `22.15.0`。
- pnpm 固定为 `11.5.3`。
- 检查项包括 `pnpm lint`、`pnpm astro check` 和 `pnpm build`。
- 不再包含旧内容仓库同步、submodule 或 `ENABLE_CONTENT_SYNC` 流程。

仓库内不再保留旧模板的 GitHub Pages 部署 workflow。正式部署如继续交给 Vercel 等平台处理，平台构建配置也应沿用 Node `22.15.x` / pnpm `11.5.3`，不要恢复旧 `deploy.yml`。

## 故障排查优先级

### 代码块样式异常

先查 Expressive Code 外部 CSS：

- 浏览器 Network 中 `/_astro/ec.*.css` 是否存在。
- 响应类型是否是 `text/css`。
- `astro.config.mjs` 是否仍是静态导入 `@astrojs/sitemap`。
- Node 是否为 `22.15.x`。

### PDF 页面显示“预览未生成”

检查：

- `public/artifacts/<slug>/original.pdf` 是否存在。
- `public/artifacts/<slug>/manifest.json` 是否存在且 `pages > 0`。
- `public/artifacts/<slug>/preview/p-01.webp` 等文件是否存在。
- post 文件名 slug 是否等于 artifacts 目录名。

### URL 或分类错误

检查：

- post frontmatter 的 `category` 是否为英文 slug。
- `src/config/archiveCategories.ts` 是否包含该 slug。
- `src/config/permalinkConfig.ts` 是否仍为 `"%category%/%postname%"`。
