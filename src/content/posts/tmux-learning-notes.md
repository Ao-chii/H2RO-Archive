---
title: tmux 学习笔记
published: 2025-09-28
description: tmux 会话、窗口、面板、复制模式、脚本化操作与常用配置速查。
tags: [tmux, Linux, 终端, 语法]
category: self-study
draft: false
lang: zh-CN
---
> **tmux** (Terminal Multiplexer) 是一个强大的终端复用器，让你在一个终端窗口中管理多个会话、窗口和面板，极大提升终端工作效率。

## 🎯 核心概念

tmux 采用**客户端-服务器**模型，主要包含三个层级：

|概念|说明|类比|
|---|---|---|
|**Session**|独立的工作空间，可包含多个窗口|工作项目|
|**Window**|会话中的标签页，占满整个终端|浏览器标签|
|**Pane**|窗口的分割区域，可显示不同内容|分屏视图|

---

## 💿 安装配置

### 安装方法

**macOS:**

```bash
brew install tmux
```

**Ubuntu/Debian:**

```bash
sudo apt-get install tmux
```

**CentOS/RHEL:**

```bash
sudo yum install tmux
```

### 版本确认

```bash
tmux -V
```

---

## ⚡ 基础操作

### 快捷键说明

> 💡 **前缀键 (Prefix)**: 默认为 `Ctrl+b`，所有快捷键需要先按前缀键

### 启动与退出

| 操作      | 命令                   |
| ------- | -------------------- |
| 启动新会话   | `tmux`               |
| 启动并命名会话 | `tmux new -s <name>` |
| 退出 tmux | `exit` 或 `Ctrl+d`    |
| 分离会话    | `Ctrl+b  d`          |

### 帮助系统

- **查看所有快捷键**: `Ctrl+b ?`
- **退出帮助**: `q`

---

## 🗂️ 会话管理

### 会话操作命令

```bash
# 创建会话
tmux new -s work          # 创建名为 work 的会话
tmux new -s work -d       # 后台创建会话

# 查看会话
tmux ls                   # 列出所有会话
tmux list-sessions        # 同上

# 连接会话
tmux attach -t work       # 连接到 work 会话
tmux a -t work           # 简写形式

# 切换会话
tmux switch -t work       # 切换到 work 会话

# 重命名会话
tmux rename-session -t old-name new-name

# 杀死会话
tmux kill-session -t work
tmux kill-server          # 杀死所有会话
```

### 会话内快捷键

|快捷键|功能|
|---|---|
|`Ctrl+b d`|分离当前会话|
|`Ctrl+b s`|列出所有会话|
|`Ctrl+b $`|重命名当前会话|
|`Ctrl+b (`|切换到上一个会话|
|`Ctrl+b )`|切换到下一个会话|

---

## 🪟 窗口管理

### 窗口快捷键

|快捷键|功能|
|---|---|
|`Ctrl+b c`|创建新窗口|
|`Ctrl+b &`|关闭当前窗口|
|`Ctrl+b ,`|重命名当前窗口|
|`Ctrl+b w`|列出所有窗口|
|`Ctrl+b n`|切换到下一个窗口|
|`Ctrl+b p`|切换到上一个窗口|
|`Ctrl+b 0-9`|切换到指定编号窗口|
|`Ctrl+b l`|切换到最后活动窗口|
|`Ctrl+b f`|查找窗口|

### 窗口布局预设

|快捷键|布局类型|
|---|---|
|`Ctrl+b Alt+1`|水平均分|
|`Ctrl+b Alt+2`|垂直均分|
|`Ctrl+b Alt+3`|主窗口在上，其他在下|
|`Ctrl+b Alt+4`|主窗口在左，其他在右|
|`Ctrl+b Alt+5`|平铺布局|

---

## 📐 面板管理

### 创建面板

|快捷键|功能|
|---|---|
|`Ctrl+b %`|垂直分割（左右）|
|`Ctrl+b "`|水平分割（上下）|

### 面板导航

|快捷键|功能|
|---|---|
|`Ctrl+b ↑/↓/←/→`|切换到指定方向面板|
|`Ctrl+b o`|循环切换面板|
|`Ctrl+b ;`|切换到上一个活动面板|
|`Ctrl+b q`|显示面板编号|

### 面板调整

|快捷键|功能|
|---|---|
|`Ctrl+b Ctrl+↑/↓/←/→`|调整面板大小（1格）|
|`Ctrl+b Alt+↑/↓/←/→`|调整面板大小（5格）|
|`Ctrl+b Space`|切换面板布局|
|`Ctrl+b z`|最大化/恢复当前面板|
|`Ctrl+b !`|将面板转为独立窗口|
|`Ctrl+b x`|关闭当前面板|

### 面板同步

```bash
# 开启/关闭所有面板同步输入
:setw synchronize-panes on
:setw synchronize-panes off
```

---

## 🛠️ 高级技巧

### 复制模式

1. **进入复制模式**: `Ctrl+b [`
2. **移动光标**:
    - `h/j/k/l` 或方向键
    - `g` 跳到开头
    - `G` 跳到结尾
3. **开始选择**: `Space`
4. **复制选中内容**: `Enter`
5. **粘贴**: `Ctrl+b ]`
6. **退出**: `q`

### 命令模式

进入命令模式: `Ctrl+b :`

常用命令：

```bash
# 设置选项
:set -g mouse on              # 开启鼠标支持
:setw -g mode-keys vi         # 使用 vi 按键

# 窗口操作
:new-window -n "name"         # 创建命名窗口
:rename-window "new-name"     # 重命名窗口

# 面板操作
:split-window -h              # 垂直分割
:split-window -v              # 水平分割
:resize-pane -L 10           # 向左调整10个单位
```

### 脚本化操作

创建工作环境脚本 `dev-setup.sh`:

```bash
#!/bin/bash
tmux new-session -d -s dev
tmux rename-window -t dev:0 'editor'
tmux new-window -t dev:1 -n 'server'
tmux new-window -t dev:2 -n 'logs'
tmux split-window -t dev:1 -h
tmux send-keys -t dev:0 'vim' C-m
tmux send-keys -t dev:1.0 'npm run dev' C-m
tmux send-keys -t dev:1.1 'npm run test' C-m
tmux attach -t dev
```

---

## ⚙️ 实用配置

创建配置文件 `~/.tmux.conf`:

```bash
# =====================================
# 基础设置
# =====================================

# 设置前缀键为 Ctrl+a
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# 使用 256 色
set -g default-terminal "screen-256color"

# 设置历史记录限制
set -g history-limit 10000

# 设置窗口和面板索引从 1 开始
set -g base-index 1
setw -g pane-base-index 1

# 自动重新编号窗口
set -g renumber-windows on

# =====================================
# 鼠标支持
# =====================================

# 开启鼠标支持
set -g mouse on

# =====================================
# 快捷键绑定
# =====================================

# 重新加载配置文件
bind r source-file ~/.tmux.conf \; display "配置已重载!"

# 更直观的分割键
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# 使用 Alt+方向键 切换面板
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# 使用 Shift+方向键 调整面板大小
bind -n S-Left resize-pane -L 5
bind -n S-Right resize-pane -R 5
bind -n S-Up resize-pane -U 5
bind -n S-Down resize-pane -D 5

# =====================================
# 状态栏美化
# =====================================

# 状态栏颜色
set -g status-bg black
set -g status-fg white

# 状态栏左侧
set -g status-left '#[fg=green]#S #[fg=yellow]#I:#P '
set -g status-left-length 30

# 状态栏右侧
set -g status-right '#[fg=cyan]#H #[fg=yellow]%Y-%m-%d %H:%M'
set -g status-right-length 50

# 窗口状态
setw -g window-status-format '#I:#W'
setw -g window-status-current-format '#[fg=red,bold]#I:#W'

# =====================================
# 复制模式
# =====================================

# 使用 vi 风格按键
setw -g mode-keys vi

# 复制模式快捷键
bind Escape copy-mode
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send -X copy-selection-and-cancel
bind p paste-buffer
```

### 应用配置

```bash
# 立即生效
tmux source-file ~/.tmux.conf

# 或在 tmux 内
Ctrl+b :source-file ~/.tmux.conf
```

---

## ❓ 常见问题

### Q1: 如何在 SSH 断开后保持会话？

tmux 的核心优势之一就是会话持久化。只需要：

1. SSH 连接到服务器
2. 启动 tmux: `tmux new -s remote`
3. 进行工作
4. 分离会话: `Ctrl+b d`
5. 断开 SSH 连接
6. 重新连接后: `tmux attach -t remote`

### Q2: 如何同时操作多个服务器？

使用面板同步功能：

1. 创建多个面板，每个连接一个服务器
2. 开启同步: `:setw synchronize-panes on`
3. 现在输入会同时发送到所有面板

### Q3: 如何备份和恢复会话？

使用 tmux-resurrect 插件：

```bash
# 安装
git clone https://github.com/tmux-plugins/tmux-resurrect ~/tmux-resurrect

# 配置
echo "run-shell ~/tmux-resurrect/resurrect.tmux" >> ~/.tmux.conf

# 保存: Ctrl+b Ctrl+s
# 恢复: Ctrl+b Ctrl+r
```

### Q4: 如何解决中文乱码？

在 `~/.tmux.conf` 添加：

```bash
set -g default-terminal "screen-256color"
set -g status-utf8 on  # tmux < 2.2
set -g utf8 on         # tmux < 2.2
```

### Q5: 如何提高滚动性能？

```bash
# 增加历史缓冲区
set -g history-limit 50000

# 优化刷新
set -g escape-time 0
```

---

## 🎓 学习路径建议

### 初级阶段（1-2天）

- ✅ 掌握会话的创建、分离、连接
- ✅ 学会窗口的创建和切换
- ✅ 熟悉基本快捷键

### 中级阶段（3-5天）

- ✅ 掌握面板分割和调整
- ✅ 学会复制模式的使用
- ✅ 配置个性化 `.tmux.conf`

### 高级阶段（1-2周）

- ✅ 编写自动化脚本
- ✅ 安装和配置插件
- ✅ 集成到日常工作流

---

## 📚 推荐资源

- [tmux 官方文档](https://github.com/tmux/tmux/wiki)
- [tmux 插件管理器 TPM](https://github.com/tmux-plugins/tpm)
- [awesome-tmux](https://github.com/rothgar/awesome-tmux)
- 书籍：《tmux: Productive Mouse-Free Development》

---

## 💡 实用小贴士

1. **项目管理**: 为每个项目创建独立会话，保持工作环境隔离
2. **监控面板**: 创建专门的监控窗口，分割多个面板显示日志、系统状态等
3. **结对编程**: 多人可以连接同一个会话进行协作
4. **备忘命令**: 使用 `Ctrl+b ?` 随时查看快捷键帮助
5. **定期保存**: 重要工作定期分离会话，避免意外丢失
