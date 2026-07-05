---
title: 数学建模上机实验
published: 2025-04-10
description: 数学建模与最优化课程上机实验，围绕医院护士排班问题建立线性规划模型并求解。
tags: ["2025", 大二下, 数学建模, Python]
category: study
draft: false
lang: zh-CN
---
## 一、背景与问题

某医院每天各时间段内需要的值班护士数如下：

| 时间区段               | 护士数量 |
| ---------------------- | -------- |
| `6:00-10:00`         | 18       |
| `10:00-14:00`        | 20       |
| `14:00-18:00`        | 19       |
| `18:00-22:00`        | 17       |
| `22:00-6:00`（次日） | 12       |

该医院护士上班分五个班次，每班 8 小时，具体上班时间为第一班 `2:00-10:00`，第二班 `6:00-14:00`，第三班 `10:00-18:00`，第四班 `14:00-22:00`，第五班 `18:00-2:00`（次日）。每名护士每周上 5 个班，并被安排在不同的日子，由一名总护士长负责护士的值班安排。值班方案要做到在人员或经济上比较节省，又做到尽可能合情合理。下面是一些正在考虑中的值班方案：

【方案 1】每名护士连续上班 5 天，休息 2 天，并从上班第一天起按从上第一班到第五班顺序安排。

【方案 2】考虑到方案 1 中每名护士在周末（周六、周日）两天内休息安排不均匀，于是规定每名护士在周六、周日两天内安排一天、且只安排一天休息，再在周一至周五期间安排 4 个班，同样上班的 5 天内分别顺序安排 5 个不同班次。

在对方案 1、2 建立线性规划模型并求解后发现，方案 2 虽然在安排周末休息上比较合理，但所需值班人员要比方案 1 有较多增加，经济上不太合算，于是又提出了第 3 方案：

【方案 3】在方案 2 的基础上，动员一部分护士放弃周末休息，即每周在周一至周五间由总护士长给安排三天值班，加周六周日共上五个班，同样五个班分别安排不同班次。作为奖励，规定放弃周末休息的护士，其工资和奖金总额比其他护士增加 $a\%$。

根据上述方案，帮助总护士长分析研究：

1. 对方案 1、2 建立使值班护士人数为最少的线性规划模型并求解。
2. 对方案 3，同样建立使值班护士人数为最少的线性规划模型并求解，然后回答 $a$ 的值为多大时，第 3 方案较第 2 方案更经济。

## 二、问题重述与分析

我们把需求、数据和目的等精简一下：

1. **需求分析：** 不同时间段所需的*最小护士数量*。
   - `6:00-10:00`：18 人
   - `10:00-14:00`：20 人
   - `14:00-18:00`：19 人
   - `18:00-22:00`：17 人
   - `22:00-6:00`（次日）：12 人
2. **班次要求：** 5 个固定的 8 小时班次。
   - 班次 1：`2:00-10:00`
   - 班次 2：`6:00-14:00`
   - 班次 3：`10:00-18:00`
   - 班次 4：`14:00-22:00`
   - 班次 5：`18:00-2:00`（次日）
3. **排班规则和目的：** 每名护士每周上 5 个班，即工作 5 天，休息 2 天。关键在于不同方案下，这 5 天工作和 2 天休息如何安排，以及工作日内 5 个班次如何分配。

接下来可以进行数学建模，对不同方案进行建模和分析。

## 三、模型假设

1. 每名护士每周必须也只需上 5 个班，并被安排在不同的日子；
2. 每名护士可视为工作能力效率相同，基本工资（方案一、二中）相同；
3. 每个班次的工作强度相同；
4. 不考虑请假等例外情况；
5. 部分护士可以因为工资和奖金增加而放弃周末休息。

## 四、模型建立

### 方案一：工作五天 + 双休

#### 1. 方案详情

每名护士连续上班 5 天，休息 2 天，并从上班第一天起按从上第一班到第五班顺序安排。

#### 2. 定义变量

| 变量    | 含义                                               |
| ------- | -------------------------------------------------- |
| $x_1$ | 采用“周一至周五上班，周六周日休息”模式的护士人数 |
| $x_2$ | 采用“周二至周六上班，周日周一休息”模式的护士人数 |
| $x_3$ | 采用“周三至周日上班，周一周二休息”模式的护士人数 |
| $x_4$ | 采用“周四至周一上班，周二周三休息”模式的护士人数 |
| $x_5$ | 采用“周五至周二上班，周三周四休息”模式的护士人数 |
| $x_6$ | 采用“周六至周三上班，周四周五休息”模式的护士人数 |
| $x_7$ | 采用“周日至周四上班，周五周六休息”模式的护士人数 |

#### 3. 目标函数

最小化护士人数：

$$
\min Z = \sum_{i=1}^{7} x_i
$$

#### 4. 约束条件

各时间段涉及的班次如下：

| 时间区段        | 涉及的班次     |
| --------------- | -------------- |
| `6:00-10:00`  | 班次 1，班次 2 |
| `10:00-14:00` | 班次 2，班次 3 |
| `14:00-18:00` | 班次 3，班次 4 |
| `18:00-22:00` | 班次 4，班次 5 |
| `22:00-2:00`  | 班次 5，班次 1 |

**注意**：由于第五班和第一班并没有时间覆盖，所以实际上需要每个班次都要至少 12 人。

再将一天的规律扩展到一周，由此得到约束条件：

$$
\begin{aligned}
x_1 + x_7 &\geq 20 \\
x_7 + x_6 &\geq 20 \\
x_6 + x_5 &\geq 20 \\
x_5 + x_4 &\geq 20 \\
x_4 + x_3 &\geq 20 \\
x_3 + x_2 &\geq 20 \\
x_2 + x_1 &\geq 20 \\
x_i &\geq 12 \quad (i = 1, 2, \cdots, 7)
\end{aligned}
$$

#### 5. 代码实现

使用 Python 求解：

```python
import numpy as np
from scipy.optimize import linprog


def solve_scheme1():
    print("\n============ 方案1求解结果 ============")

    c = np.ones(7)
    A_day_constraints = np.array([
        [-1, 0, 0, 0, 0, 0, -1],  # -(x1 + x7) <= -20
        [0, 0, 0, 0, 0, -1, -1],  # -(x7 + x6) <= -20
        [0, 0, 0, 0, -1, -1, 0],  # -(x6 + x5) <= -20
        [0, 0, 0, -1, -1, 0, 0],  # -(x5 + x4) <= -20
        [0, 0, -1, -1, 0, 0, 0],  # -(x4 + x3) <= -20
        [0, -1, -1, 0, 0, 0, 0],  # -(x3 + x2) <= -20
        [-1, -1, 0, 0, 0, 0, 0],  # -(x2 + x1) <= -20
    ])
    b_day = -20 * np.ones(7)

    A_shift_constraints = -np.eye(7)
    b_shift = -12 * np.ones(7)

    A = np.vstack([A_day_constraints, A_shift_constraints])
    b = np.hstack([b_day, b_shift])

    result = linprog(c, A_ub=A, b_ub=b, method="highs")

    if result.success:
        print(f"求解成功！状态: {result.message}")
        print(f"最优解: 最少需要 {int(np.sum(np.ceil(result.x)))} 名护士")
        print("\n各模式护士数量:")
        for i in range(7):
            print(f"模式{i + 1}（休息日: {i + 1} 和 {(i + 1) % 7 + 1}）: {int(np.ceil(result.x[i]))}")

        print("\n检查约束条件满足情况:")
        for i in range(7):
            if i == 0:
                day_indices = [0, 6]
            else:
                day_indices = [i, i - 1]
            day_sum = sum(int(np.ceil(result.x[j])) for j in day_indices)
            print(f"第{i + 1}天护士总数: {day_sum} >= 20")

        for i in range(7):
            print(f"模式{i + 1}护士数: {int(np.ceil(result.x[i]))} >= 12")

        return np.ceil(result.x), np.sum(np.ceil(result.x))

    print(f"求解失败: {result.message}")
    return None, None


nurse_counts, total_nurses = solve_scheme1()

if nurse_counts is not None:
    print("\n============ 方案1结果汇总 ============")
    print(f"最少护士总人数: {int(total_nurses)}")
    print("各模式分配:")
    total_distribution = np.zeros(7)

    for i in range(7):
        day1 = i + 1
        day2 = (i + 1) % 7 + 1
        print(f"模式{i + 1} (休息日:{day1},{day2}): {int(nurse_counts[i])}人")

        for j in range(7):
            if j != i and j != (i + 1) % 7:
                total_distribution[j] += nurse_counts[i]

    print("\n每天工作的护士总数:")
    days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    for i in range(7):
        print(f"{days[i]}: {int(total_distribution[i])}人")
```

#### 6. 结果分析

结果表明每天上第一班次的人都应是 12 人，最少总人数是 84 人。经检验符合条件。

### 方案二：周末均匀单休

#### 1. 方案详情

考虑到方案 1 中每名护士在周末（周六、周日）两天内休息安排不均匀，于是规定每名护士在周六、周日两天内安排一天、且只安排一天休息，再在周一至周五期间安排 4 个班，同样上班的 5 天内分别顺序安排 5 个不同班次。

#### 2. 定义变量

变量数量需要扩展，可以用 $x_i \ (i = 1, 2, 3, \cdots, 10)$ 表示周六、周日两天 10 个班次的护士人数。其中 $x_1$ 至 $x_5$ 分别代表周六第 1 个到第 5 个班次的护士人数，$x_6$ 至 $x_{10}$ 分别代表周日第 1 个到第 5 个班次的护士人数。

#### 3. 目标函数

最小化护士人数：

$$
\min Z = \sum_{i=1}^{10} x_i
$$

#### 4. 约束条件

继续根据变量和排班表进行分析，得出新的约束条件：

$$
\begin{aligned}
x_6 + x_{10} &\geq 18 \\
x_6 + x_7 &\geq 20 \\
x_3 + x_4 &\geq 20 \\
x_4 + x_5 &\geq 19 \\
x_1 + x_5 &\geq 17 \\
x_1 + x_2 &\geq 18 \\
x_2 + x_3 &\geq 20 \\
x_7 + x_8 &\geq 20 \\
x_8 + x_9 &\geq 19 \\
x_9 + x_{10} &\geq 17 \\
x_1 + x_2 + x_6 + x_{10} &\geq 20 \\
x_1 + x_5 + x_9 + x_{10} &\geq 20 \\
x_4 + x_5 + x_8 + x_9 &\geq 20 \\
x_4 + x_8 &\geq 12 \\
x_3 + x_7 &\geq 12 \\
x_1, x_2, x_5, x_6, x_9, x_{10} &\geq 12 \\
x_3, x_4, x_7, x_8 &\geq 0
\end{aligned}
$$

#### 5. 代码实现

```python
from pulp import LpMinimize, LpProblem, LpStatus, LpVariable, lpSum

prob = LpProblem("方案二求解", LpMinimize)

lb = [12, 12, 0, 0, 12, 12, 0, 0, 12, 12]
x = [LpVariable(f"x{i}", lowBound=lb[i - 1], cat="Integer") for i in range(1, 11)]

prob += lpSum(x), "Total_Nurses"

prob += x[5] + x[9] >= 18, "Constraint_1"
prob += x[5] + x[6] >= 20, "Constraint_2"
prob += x[2] + x[3] >= 20, "Constraint_3"
prob += x[3] + x[4] >= 19, "Constraint_4"
prob += x[0] + x[4] >= 17, "Constraint_5"
prob += x[0] + x[1] >= 18, "Constraint_6"
prob += x[1] + x[2] >= 20, "Constraint_7"
prob += x[6] + x[7] >= 20, "Constraint_8"
prob += x[7] + x[8] >= 19, "Constraint_9"
prob += x[8] + x[9] >= 17, "Constraint_10"
prob += x[0] + x[1] + x[5] + x[9] >= 20, "Constraint_11"
prob += x[0] + x[4] + x[8] + x[9] >= 20, "Constraint_12"
prob += x[3] + x[4] + x[7] + x[8] >= 20, "Constraint_13"
prob += x[3] + x[7] >= 12, "Constraint_14"
prob += x[2] + x[6] >= 12, "Constraint_15"

prob.solve()

print("求解状态:", LpStatus[prob.status])
print("最优解：")
for i in range(10):
    print(f"x{i + 1} = {x[i].varValue}")
print(f"最小护士人数 = {prob.objective.value()}")
```

#### 6. 结果分析

经检验符合条件。

### 方案三：加薪加班

#### 1. 方案详情

在方案 2 的基础上，动员一部分护士放弃周末休息，即每周在周一至周五间由总护士长给安排三天值班，加周六周日共上五个班，同样五个班分别安排不同班次。作为奖励，规定放弃周末休息的护士，其工资和奖金总额比其他护士增加 $a\%$。

#### 2. 定义变量

为了建立线性规划模型，需要根据护士的工作模式定义变量。护士分为普通护士和加班护士，每种类型有不同的工作日组合。由组合知识可假设：$x_1$ 至 $x_5$ 周末两天都上班，$x_6$ 至 $x_{15}$ 周末只上一天。

#### 3. 目标函数

最小化护士人数：

$$
\min Z = \sum_{i=1}^{15} x_i
$$

#### 4. 约束条件

$$
\begin{aligned}
x_4 + x_5 + x_{11} + x_{15} &\geq 18 \\
x_1 + x_5 + x_{11} + x_{12} &\geq 20 \\
x_4 + x_5 + x_6 + x_7 + x_{11} + x_{15} &\geq 20 \\
x_1 + x_5 + x_7 + x_8 + x_{11} + x_{12} &\geq 19 \\
x_3 + x_4 + x_6 + x_{10} + x_{14} + x_{15} &\geq 20 \\
x_9 + x_{10} + x_{13} + x_{14} &\geq 20 \\
x_6 + x_{10} + x_{14} + x_{15} &\geq 19 \\
x_6 + x_7 + x_{11} + x_{15} &\geq 17 \\
x_7 + x_8 &\geq 18 \\
x_8 + x_9 &\geq 20 \\
x_9 + x_{10} &\geq 19 \\
x_6 + x_{10} &\geq 17 \\
x_1 + x_2 + x_6 + x_7 &\geq 18 \\
x_2 + x_3 + x_7 + x_8 &\geq 20 \\
x_1 + x_2 + x_{12} + x_{13} &\geq 20 \\
x_2 + x_3 + x_{13} + x_{14} &\geq 19 \\
x_3 + x_4 + x_{14} + x_{15} &\geq 17 \\
x_8 + x_{12} &\geq 12 \\
x_5 + x_{11} &\geq 12 \\
x_3 + x_{14} &\geq 12 \\
x_2 + x_9 + x_{13} &\geq 12 \\
x_5 + x_{10} &\geq 12 \\
x_4 + x_{15} &\geq 12 \\
x_6 &\geq 12 \\
x_7 &\geq 12 \\
x_j &\geq 0 \quad (j = 1, 2, \ldots, 15)
\end{aligned}
$$

#### 5. 代码实现

```python
import pulp

num_vars = 15

prob = pulp.LpProblem("方案三解决", pulp.LpMinimize)

lower_bounds = [0] * num_vars
lower_bounds[5] = 12
lower_bounds[6] = 12

x = [
    pulp.LpVariable(f"x{i + 1}", lowBound=lower_bounds[i], cat="Integer")
    for i in range(num_vars)
]

prob += pulp.lpSum(x), "Total_Sum_Objective"

prob += x[3] + x[4] + x[10] + x[14] >= 18, "C1_x4_x5_x11_x15"
prob += x[0] + x[4] + x[10] + x[11] >= 20, "C2_x1_x5_x11_x12"
prob += x[3] + x[4] + x[5] + x[6] + x[10] + x[14] >= 20, "C3_x4_x5_x6_x7_x11_x15"
prob += x[0] + x[4] + x[6] + x[7] + x[10] + x[11] >= 19, "C4_x1_x5_x7_x8_x11_x12"
prob += x[2] + x[3] + x[5] + x[9] + x[13] + x[14] >= 20, "C5_x3_x4_x6_x10_x14_x15"
prob += x[8] + x[9] + x[12] + x[13] >= 20, "C6_x9_x10_x13_x14"
prob += x[5] + x[9] + x[13] + x[14] >= 19, "C7_x6_x10_x14_x15"
prob += x[5] + x[6] + x[10] + x[14] >= 17, "C8_x6_x7_x11_x15"
prob += x[6] + x[7] >= 18, "C9_x7_x8"
prob += x[7] + x[8] >= 20, "C10_x8_x9"
prob += x[8] + x[9] >= 19, "C11_x9_x10"
prob += x[5] + x[9] >= 17, "C12_x6_x10"
prob += x[0] + x[1] + x[5] + x[6] >= 18, "C13_x1_x2_x6_x7"
prob += x[1] + x[2] + x[6] + x[7] >= 20, "C14_x2_x3_x7_x8"
prob += x[0] + x[1] + x[11] + x[12] >= 20, "C15_x1_x2_x12_x13"
prob += x[1] + x[2] + x[12] + x[13] >= 19, "C16_x2_x3_x13_x14"
prob += x[2] + x[3] + x[13] + x[14] >= 17, "C17_x3_x4_x14_x15"
prob += x[7] + x[11] >= 12, "C18_x8_x12"
prob += x[4] + x[10] >= 12, "C19_x5_x11"
prob += x[2] + x[13] >= 12, "C20_x3_x14"
prob += x[1] + x[8] + x[12] >= 12, "C21_x2_x9_x13"
prob += x[4] + x[9] >= 12, "C22_x5_x10"
prob += x[3] + x[14] >= 12, "C23_x4_x15"
prob += x[5] >= 12, "C24_x6"
prob += x[6] >= 12, "C25_x7"

solver = pulp.PULP_CBC_CMD(msg=0)
prob.solve(solver)

print("求解状态:", pulp.LpStatus[prob.status])

if prob.status == pulp.LpStatusOptimal:
    print("最优解：")
    for i in range(num_vars):
        print(f"{x[i].name} = {x[i].varValue}")
    print(f"最小目标值 = {prob.objective.value():.4f}")
elif prob.status == pulp.LpStatusInfeasible:
    print("问题无可行解。")
elif prob.status == pulp.LpStatusUnbounded:
    print("问题无界。")
else:
    print("求解器未能找到最优解。")
```

#### 6. 结果分析

经检验结果符合条件，可见最小护士数为 105 人。最后可得到方程：

$$
26 \times (1 + a\%) + 105 - 26 \leq 112
$$

计算得到：

$$
a \leq 26.92\%
$$
