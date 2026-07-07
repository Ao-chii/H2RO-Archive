# 组件拆分指南

本文档用于判断 H2RO Archive 中的组件是否需要拆分，以及拆到哪里。拆分的目标是降低维护成本，不是追求目录数量。

## 什么时候应该拆分

出现以下情况时优先考虑拆分：

- 单个组件超过约 300 行，且包含多块独立 UI 或多组状态。
- 一个文件同时处理数据准备、布局、交互状态、样式细节。
- 同一 UI 结构在两个以上组件中重复出现。
- Svelte 组件状态过多，hooks 或 store 可以抽离出稳定边界。
- 组件名称已经无法准确描述职责，例如同时承担导航、搜索、设置面板。
- 修改一个小功能时必须理解整个大组件。

这些只是信号，不是机械阈值。几十行的混乱组件也该拆，五百行但职责单一的配置表不一定要拆。

## 拆分优先级

1. 先抽纯展示子组件。
2. 再抽客户端状态 hooks。
3. 再抽共享类型。
4. 最后才移动目录或改公开导出。

不要在同一个提交里同时做大规模移动、重命名和逻辑改写。规则很简单：一边搬家一边改水电，出问题时谁也不知道是哪根线断了。

## 按当前目录拆分

| 目标 | 放置位置 |
|------|----------|
| 基础按钮、徽章、图标、链接、图片 | `src/components/atoms/` |
| 某个页面或业务域专用组件 | `src/components/features/<domain>/` |
| 侧栏小部件 | `src/components/widgets/<widget>/` |
| 导航栏、页脚等跨页面大组件 | `src/components/organisms/` |
| 页面布局骨架 | `src/components/layout/` |
| 浮动按钮、分页、返回顶部等控制件 | `src/components/control/` |
| 历史兼容包装 | `src/components/misc/` |

## 拆分模式

### Astro 组件拆分

适合静态结构、内容渲染和页面拼装：

```text
FeaturePanel.astro
FeatureHeader.astro
FeatureList.astro
FeatureEmptyState.astro
types.ts
index.ts
```

原则：

- 父组件准备数据，子组件负责展示。
- 不要让每个子组件都重复读取同一份配置。
- 子组件 Props 保持明确，不传整个大对象除非确实需要。

### Svelte 组件拆分

适合交互状态较重的功能：

```text
MusicPlayer.svelte
hooks/useAudioPlayer.ts
hooks/usePlaylist.ts
atoms/PlayButton.svelte
molecules/PlayerControls.svelte
organisms/Playlist.svelte
types.ts
```

当前音乐播放器已经采用这种拆法，后续交互组件可以参考它，但不要把所有功能都硬拆成 atoms/molecules/organisms。

## 状态拆分

- 组件内只保留局部 UI 状态。
- 跨多个组件共享的状态才放 store，例如 `src/stores/musicPlayerStore.ts`。
- 只服务一个业务域的 hooks 放在该业务目录下。
- 真正跨域复用的工具函数放到 `src/utils/`。

## 拆分前检查

- [ ] 是否已有现成 atoms、features 或 widgets 可复用？
- [ ] 拆出的组件名称是否能说明职责？
- [ ] 拆分后父组件是否更容易读？
- [ ] 是否避免同时做无关重构？
- [ ] 是否没有改变原有 URL、配置结构和内容 schema？

## 拆分后检查

- [ ] 导入路径使用现有别名或清晰相对路径。
- [ ] 对外导出从 `index.ts` 暴露。
- [ ] Svelte 客户端组件的 `client:*` 指令正确。
- [ ] 样式没有依赖父组件偶然的 DOM 层级。
- [ ] 没有新增 `!important`，除非属于允许的第三方覆盖场景。

**最后更新**: 2026-07-07
**维护者**: H2RO Archive 维护者
