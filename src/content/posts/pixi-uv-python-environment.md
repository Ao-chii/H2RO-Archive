---
title: Pixi + uv：面向未来的次世代 Python 环境管理方案
published: 2025-08-20
description: 在 Windows 与 WSL 中使用 Pixi 和 uv 搭建可复现 Python 与深度学习环境的流程笔记。
tags: [Python, Pixi, uv, 环境配置, 深度学习, 语法]
category: self-study
draft: false
lang: zh-CN
---
> *写在前面：告别 Conda 的臃肿与迟缓*

对于每一个涉足深度学习领域的探索者而言，环境管理始终是无法回避的痛点。Conda，作为曾经的“标准答案”，其臃肿的体积、缓慢的依赖解析速度以及日益增多的 Solving environment 无尽等待，都在不断消磨着我们的开发热情与宝贵的科研时间。

现在，是时候向前看了，接下来该引介的是一套更为现代化、极致高效的环境管理与工作流工具：**Pixi + uv**。

- **Pixi**: 一个基于 conda 生态、但使用 Rust 重新构建的跨平台包管理器和工作流工具。它提供了声明式的环境定义（`pixi.toml`），可复现的锁定文件（`pixi.lock`），以及远超 Conda 的依赖解析速度。
- **uv**: 一个由 Ruff 的作者开发的、同样基于 Rust 的 Python 包安装器与解析器。其设计目标是成为 pip 和 pip-tools 的直接替代品，其速度之快，足以用“颠覆性”来形容。

二者的结合，将为我们带来前所未有的流畅体验。这不仅仅是工具的更替，更是开发范式的进化。本手册将提供从零开始在 Windows 和 WSL 环境下部署并使用 pixi + uv 的完整命令流程。

---

## 1. 安装 Pixi & uv

在开始之前，请确保系统满足基本要求。对于 Windows 用户，建议使用 Windows 10 或 11，并安装了 PowerShell 5.1 或更高版本。对于 WSL 用户，一个现代的 Linux 发行版（如 Ubuntu 22.04）是理想的选择。

### 1.1. Windows 环境部署

在 Windows 平台，我们将使用 winget 或 PowerShell 进行安装。

#### 1.1.1. 安装 Pixi

打开你的 PowerShell (建议以管理员身份运行)，执行以下命令：

```powershell
irm https://pixi.sh/install.ps1 | iex
```

该脚本将自动检测你的系统架构并下载、安装最新版本的 Pixi。安装完成后，重启你的终端以使 pixi 命令生效。

验证安装：

```powershell
pixi --version
```

#### 1.1.2. 安装 uv

uv 的安装同样轻而易举。在 PowerShell 中执行：

```powershell
irm https://astral.sh/uv/install.ps1 | iex
```

同样，重启终端后验证安装：

```powershell
uv --version
```

### 1.2. WSL 环境部署

WSL 环境下的安装过程更为直接，遵循 Linux 标准实践。

#### 1.2.1. 安装 Pixi

打开 WSL 终端，执行以下命令：

```bash
curl -fsSL https://pixi.sh/install.sh | bash
```

此命令将 Pixi 安装到你的用户主目录下的 `.pixi/bin`。安装脚本会自动尝试将此路径添加到你的 shell 配置文件（如 `.bashrc` 或 `.zshrc`）中。为了立即生效，请重新加载 shell 配置或重启终端。

手动生效 (以 bash 为例):

```bash
source ~/.bashrc
```

验证安装：

```bash
pixi --version
```

#### 1.2.2. 安装 uv

在 WSL 终端中执行：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

这将把 uv 安装到 `~/.cargo/bin` 目录（如果你的系统安装了 Rust 工具链）或一个独立的目录，并指导你如何将其添加到 `PATH`。同样，重启终端或 `source` 你的 shell 配置文件。

验证安装：

```bash
uv --version
```

## 2. 项目初始化：构建深度学习环境

部署完备后，我们将开始构建一个深度学习项目。流程在 Windows 与 WSL 中完全一致。

### 2.1. 创建项目并初始化 Pixi

首先，为你的项目创建一个目录。

```bash
mkdir my-dl-project
cd my-dl-project
```

现在，使用 `pixi init` 初始化项目。这会生成一个核心配置文件 `pixi.toml`。

```bash
pixi init
```

### 2.2. 配置 Pixi 使用 uv

这是关键一步。我们需要编辑 `pixi.toml` 文件，明确指示 Pixi 使用 uv 作为其 pip 包的管理器。这将极大地加速 pip 依赖的解析与安装。

打开 `pixi.toml` 文件，在 [project] 部分下方添加以下配置：

```toml
[project]
name = "my-dl-project"
version = "0.1.0"
description = "A next-gen deep learning environment"
authors = ["Your Name <your.email@example.com>"]
channels = ["conda-forge", "pytorch"] # 优先使用 conda-forge 和 pytorch 官方频道
platforms = ["linux-64", "win-64"] # 定义项目支持的平台

[pypi-options] solver = "uv"

[tasks]
# 这里可以定义项目脚本

[dependencies]
# 这里将定义 conda 依赖
python = ">=3.10,<3.12"
```

**配置解析**:
- `channels`: 我们将 conda-forge 和 pytorch 作为主要的 conda 包来源。conda-forge 提供了最广泛、最新的软件包，而 pytorch 频道则确保我们能获取到官方构建的、针对特定 CUDA 版本优化的 PyTorch。

### 2.3. 添加核心依赖

现在，让我们为深度学习项目添加必要的依赖。我们将使用 `pixi add` 命令。Pixi 会智能地判断包是来自 conda 频道还是 PyPI。

#### 2.3.1. 添加基础与 PyTorch (Conda)

对于像 Python、PyTorch 和 CUDA Toolkit 这样与底层硬件紧密相关的核心库，我们优先使用 Conda 包，以确保二进制兼容性。

```bash
# 添加 Python (通常在 init 时已定义，可按需修改版本)
pixi add python>=3.10

# 添加 PyTorch, torchvision, torchaudio, 和 PyTorch 对应的 CUDA 版本
# Pixi 会自动从 pytorch channel 解析最佳匹配
# 请根据本机的 NVIDIA 驱动版本，将 `pytorch-cuda=12.1` 替换为相应的版本
pixi add pytorch torchvision torchaudio pytorch-cuda=12.1
```

#### 2.3.2. 添加常用工具 (PyPI via uv)

对于绝大多数 Python 工具库，我们可以让 Pixi (以及其背后的 uv) 从 PyPI 添加。

```bash
pixi add jupyterlab numpy pandas matplotlib scikit-learn tqdm
```

`pixi add` 命令执行后，你会注意到：

1. `pixi.toml` 文件中的 [dependencies] 和 [pypi-dependencies] 部分会自动更新
2. 会生成一个 `pixi.lock` 文件。这个文件锁定了所有依赖（包括间接依赖）的精确版本，确保任何人在任何机器上都能构建出**完全一致**的环境，实现了真正的可复现性。

此时，`pixi.toml` 文件结构大致如下：

```toml
[project]
# ... (project metadata) ...

[tasks]

[dependencies]
python = ">=3.10,<3.12"
pytorch = "*"
pytorch-cuda = "12.1"
torchaudio = "*"
torchvision = "*"

[pypi-dependencies]
jupyterlab = "*"
numpy = "*"
pandas = "*"
matplotlib = "*"
scikit-learn = "*"
tqdm = "*"
```

## 3. 环境激活与使用

环境定义完毕后，激活并进入这个由 Pixi 管理的环境。

### 3.1. 激活 Shell

执行 `pixi shell` 命令，你将进入一个已经配置好所有路径和环境变量的新 shell。

```bash
pixi shell
```

可以注意到终端提示符发生了变化，表明我们已处于 Pixi 环境中。在此 Shell 中，所有安装的工具（如 python, pip, jupyter）都已可用。

### 3.2. 运行代码与工具

现在可以像在任何其他 Python 环境中一样工作。

```bash
# 检查 Python 版本
python --version

# 检查 PyTorch 是否安装成功并能识别 GPU
python -c "import torch; print(f'PyTorch版本: {torch.__version__}'); print(f'PyTorch编译CUDA版本: {torch.version.cuda}'); print(f'CUDA可用: {torch.cuda.is_available()}'); print(f'GPU数量: {torch.cuda.device_count()}'); torch.cuda.is_available() and print(f'当前GPU: {torch.cuda.get_device_name(0)}')"

# 启动 JupyterLab
jupyter lab
```

### 3.3. 使用 `pixi run` 执行任务

Pixi 的另一个强大功能是 [tasks]，可以在 `pixi.toml` 中定义常用的命令别名。

例如，在 `pixi.toml` 中添加：

```toml
[tasks]
notebook = "jupyter lab --ip 0.0.0.0 --port 8888"
train = "python src/train.py --epochs 10"
```

然后，我们无需激活 pixi shell，可以直接在项目根目录运行这些任务：

```bash
pixi run notebook
pixi run train
```

这极大地简化了工作流，并确保了命令总是在正确的环境中执行。

## 4. 环境管理与维护

随着项目的演进，我们也需要管理依赖。

- 添加新包: `pixi add <package_name>` 、`pixi add --pip <package_name>`。
- 移除包: `pixi remove <package_name>`
- 更新依赖: `pixi update` 会根据 `pixi.toml` 中的版本约束，将所有包更新到最新版本，并重新生成 `pixi.lock`。
- 查看环境信息: `pixi list` 或 `pixi tree` 可以清晰地展示已安装的包及其依赖关系。
- 导出依赖：`pixi export environment.yaml --platform win-64` (导出为环境文件) 和 `pixi export requirements.txt` (导出为 requirements.txt)。
- 删除环境：只需将整个项目目录删除，所有相关的环境文件、依赖包和配置都会随之移除，不会在系统中留下任何残留。
```bash
rm -rf my-dl-project  # macOS / Linux / WSL
rmdir /s /q my-dl-project # Windows 命令提示符
Remove-Item -Recurse -Force my-dl-project # Windows PowerShell
```

## 5. 备选方案：Conda + uv 的现代化升级

如果你已习惯 Conda 生态，但厌倦了其缓慢的pip安装速度，Conda + uv 是一个无缝过渡方案。Conda 负责创建隔离环境和安装核心依赖（如 Python、CUDA），而 uv 作为 pip 的 drop-in 替换，处理 PyPI 包的解析与安装。这避免了 Conda 的“solving environment”瓶颈，同时保持了 Conda 的跨平台兼容性。

- **优势**：Conda 处理二进制依赖（如 PyTorch 的 CUDA 版），uv 加速纯 Python 包；整体速度提升显著；易于现有 Conda 用户迁移。
- **注意**：在 Conda 环境中使用 uv 时，避免混用 pip 和 uv ，以防依赖冲突。优先用 uv pip 命令替换 pip。

流程在 Windows 和 WSL 中类似，但Conda安装需 Anaconda/Miniconda。

### 5.1. 安装 Conda & uv

先安装 Miniconda（轻量版 Conda），然后添加 uv，此处不过多赘述。

### 5.2. 项目初始化：构建深度学习环境

#### 5.2.1. 创建 Conda 环境

创建一个新环境：

```bash
conda create -n my-dl-env python=3.10  
conda activate my-dl-env       
```

#### 5.2.2. 配置使用 uv

在激活的环境中，直接用 uv pip 命令作为 pip 替换，确保 uv 在 PATH 中。

添加 Conda 频道（可选，但推荐）：

```bash
conda config --add channels conda-forge  
conda config --add channels pytorch 
```

#### 5.2.3. 添加核心依赖

#### 5.2.3.1. 添加基础与 PyTorch (Conda)

用 Conda 安装核心：

```bash
# 基于 NVIDIA 驱动替换 CUDA 版本
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia 
```

#### 5.2.3.2. 添加常用工具 (PyPI via uv)

```bash
# 用 uv 安装 PyPI 包
uv pip install jupyterlab numpy pandas matplotlib scikit-learn tqdm

# 导出依赖
uv pip freeze > requirements.txt
```

### 5.3. 环境激活与使用

激活环境：

```bash
conda activate my-dl-env
```

### 5.4. 环境管理与维护

- 添加包：`conda install <package>` 或 `uv pip install <package>`。
- 移除：`conda remove <package>` 或 `uv pip uninstall <package>`。
- 更新：`conda update --all` 或 `uv pip install -U <package>`。
- 查看：`conda list` 或 `uv pip list`。
- 导出：`conda env export > environment.yml`（完整环境）；`uv pip freeze > requirements.txt`（PyPI 部分）。
- 删除：`conda env remove -n my-dl-env`。

**最佳实践**：用 Conda 只安装必需的核心（如 Python、PyTorch），其余用 uv 处理，以最大化速度。避免在 Conda 环境中用 pip（用 uv pip 代替）。如果冲突，用 `uv pip compile pyproject.toml -o requirements.txt` 生成锁文件。

这种方案适合不愿完全放弃 Conda 的用户，提供渐进式升级。相比纯 Pixi，它更成熟于复杂依赖，但速度稍逊。
