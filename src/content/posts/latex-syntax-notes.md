---
title: LaTeX 语法笔记
published: 2025-09-19
description: LaTeX 文档结构、公式、表格、图像、参考文献与中文支持的语法速查。
tags: [LaTeX, 语法]
category: self-study
draft: false
lang: zh-CN
---
> LaTeX（读作/ˈlɑːtɛx/或/ˈleɪtɛx/）是一个让文档看起来更专业的排版系统。它尤其适合处理篇幅较长、结构严谨的文档，并且十分擅长处理公式表达。它是免费的软件，对大多数操作系统都适用。
> 
> LaTeX 基于 TeX（Donald Knuth 在 1978 年为数字化排版设计的排版系统）。TeX 是一种电脑能够处理的低级语言，但大多数人发现它很难使用。LaTeX 正是为了让它变得更加易用而设计的。目前 LaTeX 的版本是 LaTeX 2e。
> 
> 如果你习惯于使用微软的 Office Word 处理文档，那么你会觉得 LaTeX 的工作方式让你很不习惯。Word 是典型的「所见即所得」的编辑器，你可以在编排文档的时侯查看到最终的排版效果。但使用 LaTeX 时你并不能方便地查看最终效果，这使得你专注于内容而不是外观的调整。
> 
> 一个 LaTeX 文档是一个以 `.tex` 结尾的文本文件，可以使用任意的文本编辑器编辑，比如 Notepad，但对于大多数人而言，使用一个合适的 LaTeX 编辑器会使得编辑的过程容易很多。在编辑的过程中你可以标记文档的结构。完成后你可以进行编译——这意味着将它转化为另一种格式的文档。它支持多种格式，但最常用的是 PDF 文档格式。
> 
> 在 Visual Studio Code 中配置 LaTeX，详细教程可以参考 [Visual Studio Code (vscode)配置LaTeX](https://zhuanlan.zhihu.com/p/166523064)。
> 
> 更详细的语法规则可以参考一份（不太）简短的 LATEX 2ε 介绍。

## 1. 基本结构

LaTeX 文档的基本框架如下：

```latex
\documentclass[选项]{文档类}  % 如 \documentclass[12pt,a4paper]{article}
\usepackage{包名}             % 引入包，如 \usepackage{amsmath} 用于数学
\title{标题}
\author{作者}
\date{日期}
\begin{document}
\maketitle                    % 生成标题
正文内容...
\bibliographystyle{样式}     % 参考文献样式
\bibliography{文件}          % 参考文献文件
\end{document}
```

- **文档类**：`article`（文章）、`report`（报告）、`book`（书籍）。
- **选项**：`12pt`（字体大小）、`a4paper`（纸张大小）。
- **常用包**：
  - `amsmath`：高级数学。
  - `graphicx`：图像插入。
  - `booktabs`：美观表格。
  - `hyperref`：超链接。
  - `geometry`：页边距调整，如 `\usepackage[margin=2cm]{geometry}`。
  - `ctex`：引入宏包以在 LaTeX 中使用中文。

---

## 2. 文本格式与结构

### 2.1 字体与格式

- **粗体**：`\textbf{文本}` 或 `{\bf 文本}`（旧式）。
- **斜体**：`\textit{文本}` 或 `{\it 文本}`。
- **下划线**：`\underline{文本}`。
- **上标/下标**：`x^{2}`（上标）、`H_{2}O`（下标）。
- **换行**：`\\`（强制换行）、`\newline`。
- **段落**：空行分段，或 `\par`。

### 2.2 列表

- **无序列表**：
  ```latex
  \begin{itemize}
  \item 第一项
  \item 第二项
  \end{itemize}
  ```

- **有序列表**：
  ```latex
  \begin{enumerate}
  \item 第一项
  \item 第二项
  \end{enumerate}
  ```

- **描述列表**：
  ```latex
  \begin{description}
  \item[标签] 描述
  \end{description}
  ```

### 2.3 章节与目录

- **章节**：`\section{标题}`、`\subsection{子标题}`、`\subsubsection{子子标题}`。
- **生成目录**：`\tableofcontents`（置于 `\begin{document}` 后）。

---

## 3. 数学公式

LaTeX 的数学模式强大，分为内联（`$...$`）和显示（`\[...\]` 或环境）。

### 3.1 内联数学

- 示例：`The formula is $E=mc^2$.`

### 3.2 显示数学

- **基本方程**：
  ```latex
  \begin{equation}
  E = mc^2
  \label{eq:einstein}  % 标签，用于引用
  \end{equation}
  ```
引用：`如公式 \ref{eq:einstein} 所示`。

- **多行对齐**（使用 `amsmath` 包）：
  ```latex
  \begin{align}
  a &= b + c \\
  d &= e \times f
  \end{align}
  ```

- **分式**：`\frac{分子}{分母}`。
- **根号**：`\sqrt{x}` 或 `\sqrt[n]{x}`。
- **积分**：`\int_{a}^{b} f(x) \, dx`。
- **求和**：`\sum_{i=1}^{n} i`。
- **矩阵**：
  ```latex
  \begin{pmatrix}
  1 & 2 \\
  3 & 4
  \end{pmatrix}
  ```

- **高级**：`\begin{cases} ... \end{cases}`（分段函数）、`\begin{multline} ... \end{multline}`（长公式换行）。

## 4. 表格

使用 `tabular` 环境。引入 `booktabs` 包以获得专业线条。

### 4.1 基本表格

```latex
\begin{table}[h]  % h: here, t: top, b: bottom
\centering
\begin{tabular}{|c|c|c|}  % |: 竖线，c: 居中，l: 左对齐，r: 右对齐
\hline  % 水平线
头1 & 头2 & 头3 \\ \hline
1 & 2 & 3 \\ \hline
4 & 5 & 6 \\ \hline
\end{tabular}
\caption{表格标题}
\label{tab:example}
\end{table}
```
引用：`如表 \ref{tab:example}`。

- **合并单元格**：`\multicolumn{列数}{对齐}{内容}`、`\multirow{行数}{宽度}{内容}`（需 `multirow` 包）。
- **美观线条**：`\toprule`、`\midrule`、`\bottomrule`（`booktabs`）。

### 4.2 跨页表格

使用 `longtable` 包（`\usepackage{longtable}`），自动处理长表格跨页。
```latex
\begin{longtable}{|c|c|}
\caption{长表格标题} \\
\toprule
头1 & 头2 \\ \midrule
\endfirsthead  % 第一页头

\multicolumn{2}{c}{续表} \\  % 续页头
\midrule
\endhead

1 & 2 \\  % 内容，可多行
3 & 4 \\
\end{longtable}
```
- `\endfirsthead`：第一页表头。
- `\endhead`：续页表头。
- `\endfoot`：每页脚。
- `\endlastfoot`：最后一页脚。

### 4.3 自适应列宽
LaTeX 提供了几种方式实现表格列宽自适应内容或页面宽度，避免内容溢出。

#### 方法 1：使用 `tabularx` 包

`tabularx` 包（`\usepackage{tabularx}`）允许定义表格总宽度，自动调整列宽。`X` 列类型会根据内容自动分配宽度。

```latex
\usepackage{tabularx}
\begin{table}[h]
\centering
\begin{tabularx}{\textwidth}{|X|X|X|}  % 总宽度为 \textwidth
\hline
长内容会自动换行 & 另一列内容 & 短内容 \\ \hline
文本文本文本文本 & 更多文本 & 示例 \\ \hline
\end{tabularx}
\caption{自适应列宽表格}
\label{tab:adaptive}
\end{table}
```

**说明**：
  - `\textwidth`：页面文本宽度，表格总宽不超过页面。
  - `X` 列：自动计算宽度，内容自动换行。
  - 可混合其他列类型，如 `{l|X|r}`。
  - 调整宽度：替换 `\textwidth` 为自定义值，如 `0.8\textwidth`。

#### 方法 2：使用 `tabulary` 包

`tabulary` 包（`\usepackage{tabulary}`）根据内容长度动态调整列宽，优先让内容较短的列更窄。

```latex
\usepackage{tabulary}
\begin{table}[h]
\centering
\begin{tabulary}{\textwidth}{|L|C|R|}  % L: 左对齐自适应，C: 居中，R: 右对齐
\hline
很长的文本内容会自动换行 & 中等长度 & 短 \\ \hline
示例 & 示例文本 & 数据 \\ \hline
\end{tabulary}
\caption{动态列宽表格}
\label{tab:tabulary}
\end{table}
```

**说明**：
  - `L`、`C`、`R`：类似 `tabularx` 的 `X`，但更智能地根据内容分配宽度。
  - 总宽度：设置为 `\textwidth` 或其他值。
  - 优点：对短内容更友好，减少空白。

#### 方法 3：使用 `p{宽度}` 列类型

手动指定固定宽度列，内容自动换行，适合部分列需要控制宽度的情况。

```latex
\begin{table}[h]
\centering
\begin{tabular}{|p{4cm}|p{5cm}|c|}
\hline
固定宽4cm & 固定宽5cm & 普通列 \\ \hline
长内容自动换行 & 很长的文本会换行 & 短 \\ \hline
\end{tabular}
\caption{固定宽度表格}
\label{tab:fixed}
\end{table}
```

**说明**：
  - `p{宽度}`：指定列宽（如 `4cm`），内容自动换行。
  - 缺点：需手动估算宽度，不够动态。

#### 方法 4：调整字体或间距

如果表格仍可能溢出，可通过以下方式优化：

- **缩小字体**：在表格内使用 `\small` 或 `\footnotesize`：
  ```latex
  \begin{table}[h]
  \centering
  \small
  \begin{tabularx}{\textwidth}{|X|X|X|}
  ...
  \end{tabularx}
  \end{table}
  ```

- **减少列间距**：设置 `\setlength{\tabcolsep}{3pt}`（默认 6 pt）。

- **旋转表格**：使用 `rotating` 包的 `sidewaystable` 环境，将表格横置：
  ```latex
  \usepackage{rotating}
  \begin{sidewaystable}
  \centering
  \begin{tabularx}{\textheight}{|X|X|X|}
  ...
  \end{tabularx}
  \caption{横置表格}
  \end{sidewaystable}
  ```

#### 方法 5：处理超宽表格

若内容复杂，表格仍可能溢出，考虑：

- **长表格**：使用 `longtable`（如笔记 4.2 所述），自动跨页。
- **缩小表格**：`\resizebox{\textwidth}{!}{\begin{tabular}...\end{tabular}}`（需 `graphicx` 包），强制缩放到页面宽度。
  ```latex
  \begin{table}[h]
  \centering
  \resizebox{0.9\textwidth}{!}{
    \begin{tabular}{|c|c|c|}
    \hline
    超宽内容 & 超宽内容 & 超宽内容 \\ \hline
    ...
    \end{tabular}
  }
  \caption{缩放表格}
  \end{table}
  ```
  - 警告：缩放可能影响字体清晰度，谨慎使用。

- `longtable`（跨页表格）也可结合 `tabularx` 实现自适应列宽：
  ```latex
  \usepackage{longtable,tabularx}
  \begin{longtable}{|X|X|}
  \caption{跨页自适应表格} \\
  \hline
  内容 & 内容 \\ \hline
  \endfirsthead
  \hline
  续表 \\ \hline
  \endhead
  ...
  \end{longtable}
  ```


### 4.4 注意事项

- **优先级**：推荐 `tabularx` 或 `tabulary` 用于动态调整，`p{宽度}` 用于精确控制。
- **溢出检查**：编译后查看 PDF，若有警告（如 `Overfull \hbox`），检查 `.log` 文件调整宽度。
- **美观性**：结合 `booktabs` 包（`\toprule`、`\midrule`），避免过多竖线。

---

## 5. 图像

引入 `graphicx` 包：`\usepackage{graphicx}`。支持 PDF/PNG/EPS 等格式。

### 5.1 基本插入

```latex
\begin{figure}[h]
\centering
\includegraphics[width=0.8\textwidth]{image.png}  % width: 宽度，height: 高度，scale: 缩放
\caption{图像标题}
\label{fig:example}
\end{figure}
```
引用：`如图 \ref{fig:example}`。

- **子图**（使用 `subcaption` 包）：
  ```latex
  \begin{figure}
  \begin{subfigure}{0.45\textwidth}
  \includegraphics[width=\textwidth]{img1.png}
  \caption{子图1}
  \end{subfigure}
  \hfill  % 水平填充
  \begin{subfigure}{0.45\textwidth}
  \includegraphics[width=\textwidth]{img2.png}
  \caption{子图2}
  \end{subfigure}
  \caption{总标题}
  \end{figure}
  ```

### 5.2 跨页图像

使用 `longfigure` 或手动拆分，但 LaTeX 不原生支持跨页图像。推荐：
- 将长图像拆分成多张。
- 或使用 `pdfpages` 包插入多页 PDF：`\includepdf[pages=-]{file.pdf}`。

## 6. 参考文献与自填充

### 6.1 参考文献（BibTeX 自填充）

- 创建 `.bib` 文件（如 `refs.bib`），内容示例：
  ```
  @article{key,
  author = {作者},
  title = {标题},
  journal = {期刊},
  year = {2023}
  }
  ```

- 在 LaTeX 中：
  ```latex
  \begin{document}
  引用 \cite{key}。
  \bibliographystyle{plain}  % 样式：plain, alpha, unsrt
  \bibliography{refs}        % 无 .bib 扩展
  \end{document}
  ```

- 编译顺序：LaTeX → BibTeX → LaTeX → LaTeX。

- 使用 `natbib` 包增强：`\usepackage{natbib}`，引用如 `\citep{key}`（括号）、`\citet{key}`（文本）。

### 6.2 其他自填充

- **自动编号**：LaTeX 自动处理公式/表格/图像编号（`\theequation` 等计数器）。

- **循环生成**（使用 `forloop` 包或 LuaTeX）：
  ```latex
  \usepackage{forloop}
  \newcounter{myctr}
  \forloop{myctr}{0}{\value{myctr} < 5}{项 \arabic{myctr} }
  ```

- **动态表格**：使用 `datatool` 包从 CSV 填充表格。
  ```latex
  \usepackage{datatool}
  \DTLloaddb{db}{data.csv}
  \begin{tabular}{cc}
  \DTLforeach{db}{\colA=column1,\colB=column2}{%
    \colA & \colB \\
  }
  \end{tabular}
  ```

- **索引**：`\usepackage{makeidx}`，`\index{关键词}`，末尾 `\printindex`。

## 7. 高级主题

### 7.1 页眉页脚

使用 `fancyhdr` 包：
```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{}  % 清空
\lhead{左页眉} \rhead{右页眉}
\lfoot{左页脚} \cfoot{\thepage}  % 页码居中
```

### 7.2 颜色与超链接

- `xcolor` 包：`\usepackage{xcolor}`，`\textcolor{red}{文本}`。
- `hyperref`：自动生成 PDF 链接，`\href{url}{文本}`。

### 7.3 自定义命令

```latex
\newcommand{\mycommand}[1]{自定义内容 #1}  % #1 为参数
\mycommand{参数}
\renewcommand{\section}[1]{\bigskip \textbf{#1}}  % 重新定义
```

### 7.4 错误调试

- 常见错误：缺少 `$` 或 `\end{环境}`。
- 日志文件：查看 `.log` 文件中的警告。
- 编译：`pdflatex file.tex` 或 `xelatex`（支持中文）。

## 8. 中文支持

使用 XeLaTeX 或 LuaLaTeX：
```latex
\usepackage{fontspec}
\setmainfont{SimSun}  % 宋体
\documentclass[UTF8]{ctexart}  % ctex 包简化中文
```
