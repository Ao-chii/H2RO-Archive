---
title: Python 数据结构学习笔记
published: 2025-02-21
description: 整理 Python 语境下的数组、链表、哈希表、二叉树、二叉堆、线段树和图论基础。
tags: [Python, 数据结构, 算法, "2025", 大二下]
category: self-study
draft: false
lang: zh-CN
---

## 前言：基本语法

[Python 语法基础 - AcWing](https://www.acwing.com/file_system/file/content/whole/index/content/8017225/)

## 一、数组

[数组（顺序存储）基本原理 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/array-basic/)

### 1. 静态数组

```python
arr = [0] * 10
```

### 2. 动态数组

```python
arr = []
```

### 3. 环形数组

逻辑实现：

```python
arr = [1, 2, 3, 4, 5]
i = 0

while i < len(arr):
    print(arr[i])
    i = (i + 1) % len(arr)
```

具体代码实现，`start` 和 `end` 最好是**左闭右开**区间：

```python
class CycleArray:
    def __init__(self, size=1):
        self.size = size
        # 因为 Python 支持直接创建泛型数组，所以不需要类型转换
        self.arr = [None] * size
        # start 指向第一个有效元素的索引，闭区间
        self.start = 0
        # 切记 end 是一个开区间，即 end 指向最后一个有效元素的下一个位置索引
        self.end = 0
        self.count = 0

    # 自动扩缩容辅助函数
    def resize(self, newSize):
        # 创建新的数组
        new_arr = [None] * newSize
        # 将旧数组的元素复制到新数组中
        for i in range(self.count):
            new_arr[i] = self.arr[(self.start + i) % self.size]
        self.arr = new_arr
        # 重置 start 和 end 指针
        self.start = 0
        self.end = self.count
        self.size = newSize

    # 在数组头部添加元素，时间复杂度 O(1)
    def add_first(self, val):
        # 当数组满时，扩容为原来的两倍
        if self.is_full():
            self.resize(self.size * 2)
        # 因为 start 是闭区间，所以先左移，再赋值
        self.start = (self.start - 1 + self.size) % self.size
        self.arr[self.start] = val
        self.count += 1

    # 删除数组头部元素，时间复杂度 O(1)
    def remove_first(self):
        if self.is_empty():
            raise Exception("Array is empty")
        # 因为 start 是闭区间，所以先赋值，再右移
        self.arr[self.start] = None
        self.start = (self.start + 1) % self.size
        self.count -= 1
        # 如果数组元素数量减少到原大小的四分之一，则减小数组大小为一半
        if self.count > 0 and self.count == self.size // 4:
            self.resize(self.size // 2)

    # 在数组尾部添加元素，时间复杂度 O(1)
    def add_last(self, val):
        if self.is_full():
            self.resize(self.size * 2)
        # 因为 end 是开区间，所以是先赋值，再右移
        self.arr[self.end] = val
        self.end = (self.end + 1) % self.size
        self.count += 1

    # 删除数组尾部元素，时间复杂度 O(1)
    def remove_last(self):
        if self.is_empty():
            raise Exception("Array is empty")
        # 因为 end 是开区间，所以先左移，再赋值
        self.end = (self.end - 1 + self.size) % self.size
        self.arr[self.end] = None
        self.count -= 1
        # 缩容
        if self.count > 0 and self.count == self.size // 4:
            self.resize(self.size // 2)

    # 获取数组头部元素，时间复杂度 O(1)
    def get_first(self):
        if self.is_empty():
            raise Exception("Array is empty")
        return self.arr[self.start]

    # 获取数组尾部元素，时间复杂度 O(1)
    def get_last(self):
        if self.is_empty():
            raise Exception("Array is empty")
        # end 是开区间，指向的是下一个元素的位置，所以要减 1
        return self.arr[(self.end - 1 + self.size) % self.size]

    def is_full(self):
        return self.count == self.size

    def size(self):
        return self.count

    def is_empty(self):
        return self.count == 0
```

## 二、链表

[链表（链式存储）基本原理 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/linkedlist-basic/)

### 1. 单链表

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def createLinkedList(arr: 'List[int]') -> 'ListNode':
    if arr is None or len(arr) == 0:
        return None

    head = ListNode(arr[0])
    cur = head
    for i in range(1, len(arr)):
        cur.next = ListNode(arr[i])
        cur = cur.next

    return head
```

### 2. 双链表

```python
class DoublyListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
        self.prev = None

def createDoublyLinkedList(arr: List[int]) -> Optional[DoublyListNode]:
    if not arr:
        return None

    head = DoublyListNode(arr[0])
    cur = head

    # for 循环迭代创建双链表
    for val in arr[1:]:
        new_node = DoublyListNode(val)
        cur.next = new_node
        new_node.prev = cur
        cur = cur.next

    return head
```

## 三、哈希表

[哈希表核心原理 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/hashmap-basic/)

### 1. 核心原理

伪码实现：

```python
class MyHashMap:
    def __init__(self):
        self.table = [None] * 1000

    # 增/改，复杂度 O(1)
    def put(self, key, value):
        index = self.hash(key)
        self.table[index] = value

    # 查，复杂度 O(1)
    def get(self, key):
        index = self.hash(key)
        return self.table[index]

    # 删，复杂度 O(1)
    def remove(self, key):
        index = self.hash(key)
        self.table[index] = None

    # 哈希函数，把 key 转化成 table 中的合法索引
    # 时间复杂度必须是 O(1)，才能保证上述方法的复杂度都是 O(1)
    def hash(self, key):
        # ...
        pass
```

- 不建议使用 **for 循环**遍历哈希表。
- 字典的键和集合元素必须可哈希，即**不可变**。

### 2. 链表加强哈希表：LinkedHashMap

链地址法用于解决哈希冲突：

```python
class HashLinkedList:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]  # 每个槽是一个链表（列表）

    def _hash(self, key):
        return hash(key) % self.size  # 计算哈希值

    def insert(self, key, value):
        index = self._hash(key)
        for item in self.table[index]:
            if item[0] == key:  # 如果键已存在，更新值
                item[1] = value
                return
        self.table[index].append([key, value])  # 否则，添加到链表

    def get(self, key):
        index = self._hash(key)
        for item in self.table[index]:
            if item[0] == key:
                return item[1]
        raise KeyError(f"Key {key} not found")

    def delete(self, key):
        index = self._hash(key)
        for i, item in enumerate(self.table[index]):  # 注意这里需要索引，故使用 enumerate()
            if item[0] == key:
                del self.table[index][i]
                return
        raise KeyError(f"Key {key} not found")
```

有序字典：

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # 将访问的键移动到末尾
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)  # 更新键的位置
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # 删除最久未使用的键
```

### 3. 数组加强哈希表：ArrayHashMap

可快速随机访问键，时间复杂度为 O(1)，优化数组空洞：

```python
import random

class EnhancedHashTable:
    def __init__(self):
        self.keys = []          # 存储所有键的数组
        self.key_to_index = {}  # 键到数组索引的映射

    def insert(self, key):
        if key in self.key_to_index:
            return  # 键已存在，无需插入
        self.keys.append(key)
        self.key_to_index[key] = len(self.keys) - 1  # 记录索引

    def delete(self, key):
        if key not in self.key_to_index:
            return  # 键不存在，无需删除

        # 将数组末尾元素覆盖到待删除位置
        index = self.key_to_index[key]
        last_key = self.keys[-1]

        self.keys[index] = last_key  # 覆盖
        self.key_to_index[last_key] = index  # 更新末尾元素的索引

        # 删除末尾元素和哈希表项
        self.keys.pop()
        del self.key_to_index[key]

    def get_random_key(self):
        if not self.keys:
            return None
        random_index = random.randint(0, len(self.keys) - 1)
        return self.keys[random_index]
```

## 四、二叉树基础及遍历

### 1. 二叉树基础

[二叉树基础及常见类型 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/binary-tree-basic/#%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91)

### 2. 二叉树的遍历

[二叉树的递归/层序遍历 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/binary-tree-traverse-basic/)

DFS 适合求所有路径：

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 二叉树的遍历框架
def traverse(root: TreeNode):
    if root is None:
        return
    traverse(root.left)
    traverse(root.right)
```

BFS 适合求最短路径：

```python
# 写法一，无法知道节点层数
from collections import deque

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    q.append(root)
    while q:
        cur = q.popleft()
        # 访问 cur 节点
        print(cur.val)

        # 把 cur 的左右子节点加入队列
        if cur.left is not None:
            q.append(cur.left)
        if cur.right is not None:
            q.append(cur.right)

# 写法二，改进写法一
from collections import deque

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    q.append(root)
    # 记录当前遍历到的层数（根节点视为第 1 层）
    depth = 1

    while q:
        level_size = len(q)  # 注意提前保留长度，以免 for 循环中 len(q) 改变
        for i in range(level_size):  # 每层分别进行 for 循环以打印层数
            cur = q.popleft()
            # 访问 cur 节点，同时知道它所在的层数
            print(f"depth = {depth}, val = {cur.val}")

            # 把 cur 的左右子节点加入队列
            if cur.left is not None:
                q.append(cur.left)
            if cur.right is not None:
                q.append(cur.right)
        depth += 1

# 写法三，考虑权重
class State:
    def __init__(self, node, depth):
        self.node = node
        self.depth = depth

def levelOrderTraverse(root):
    if root is None:
        return
    q = deque()
    # 根节点的路径权重和是 1
    q.append(State(root, 1))

    while q:
        cur = q.popleft()
        # 访问 cur 节点，同时知道它的路径权重和
        print(f"depth = {cur.depth}, val = {cur.node.val}")

        # 把 cur 的左右子节点加入队列
        if cur.node.left is not None:
            q.append(State(cur.node.left, cur.depth + 1))
        if cur.node.right is not None:
            q.append(State(cur.node.right, cur.depth + 1))
```

### 3. 多叉树的遍历

[多叉树的递归/层序遍历 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/n-ary-tree-traverse-basic/)

基本定义：

```python
class Node:
    def __init__(self, val: int):
        self.val = val
        self.children = []
```

DFS：

```python
def traverse(root: Node):
    if root is None:
        return
    for child in root.children:
        traverse(child)
```

BFS 类似二叉树。

### 4. 二叉搜索树的应用

[二叉搜索树的应用及可视化 | labuladong 的算法笔记](https://labuladong.online/algo/data-structure-basic/tree-map-basic/)

TreeNode：

```python
class TreeNode:
    # 红黑树的节点类
    def __init__(self, key, value=None, is_red=True):
        self.key = key
        self.value = value
        self.left = None
        self.right = None
        self.is_red = is_red  # True 表示红色，False 表示黑色
```

TreeMap：

```python
class TreeMap:
    """红黑树节点类"""
    def __init__(self):
        self.root = None
        self.size = 0

    def _is_red(self, node):
        """检查节点是否为红色"""
        if node is None:
            return False
        return node.is_red

    def _rotate_left(self, h):
        """左旋转操作"""
        x = h.right
        h.right = x.left
        x.left = h
        x.is_red = h.is_red
        h.is_red = True
        return x

    def _rotate_right(self, h):
        """右旋转操作"""
        x = h.left
        h.left = x.right
        x.right = h
        x.is_red = h.is_red
        h.is_red = True
        return x

    def _flip_colors(self, h):
        """颜色翻转"""
        h.is_red = not h.is_red
        h.left.is_red = not h.left.is_red
        h.right.is_red = not h.right.is_red

    def _put(self, node, key, value):
        """辅助方法 - 插入键值对"""
        if node is None:
            self.size += 1
            return TreeNode(key, value)

        if key < node.key:
            node.left = self._put(node.left, key, value)
        elif key > node.key:
            node.right = self._put(node.right, key, value)
        else:
            node.value = value

        # 红黑树平衡调整
        if self._is_red(node.right) and not self._is_red(node.left):
            node = self._rotate_left(node)
        if self._is_red(node.left) and self._is_red(node.left.left):
            node = self._rotate_right(node)
        if self._is_red(node.left) and self._is_red(node.right):
            self._flip_colors(node)

        return node

    def put(self, key, value):
        """插入键值对"""
        self.root = self._put(self.root, key, value)
        self.root.is_red = False  # 根节点始终为黑色

    def _get(self, node, key):
        """辅助方法 - 根据键获取值"""
        if node is None:
            return None

        if key < node.key:
            return self._get(node.left, key)
        elif key > node.key:
            return self._get(node.right, key)
        else:
            return node.value

    def get(self, key):
        """根据键获取值"""
        return self._get(self.root, key)

    def _remove(self, node, key):
        """辅助方法 - 删除指定键的节点"""
        # 这是一个简化版实现，完整的红黑树删除较为复杂
        if node is None:
            return None

        if key < node.key:
            node.left = self._remove(node.left, key)
        elif key > node.key:
            node.right = self._remove(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left

            # 有两个子节点的情况
            temp = node
            node = self._min_node(temp.right)
            node.right = self._remove_min(temp.right)
            node.left = temp.left

        return node

    def remove(self, key):
        """删除指定键的节点"""
        if self.get(key) is None:
            return

        self.root = self._remove(self.root, key)
        self.size -= 1
        if self.root:
            self.root.is_red = False

    def _min_node(self, node):
        """辅助方法 - 查找最小节点"""
        if node.left is None:
            return node
        return self._min_node(node.left)

    def _remove_min(self, node):
        """辅助方法 - 删除最小节点"""
        if node.left is None:
            return node.right

        node.left = self._remove_min(node.left)
        return node

    def contains_key(self, key):
        """检查是否包含某个键"""
        return self.get(key) is not None

    def is_empty(self):
        """检查 TreeMap 是否为空"""
        return self.size == 0

    def __len__(self):
        """返回 TreeMap 中键值对的数量"""
        return self.size

    def _inorder_traversal(self, node, result):
        """辅助方法 - 中序遍历获取所有键"""
        if node:
            self._inorder_traversal(node.left, result)
            result.append(node.key)
            self._inorder_traversal(node.right, result)

    def keys(self):
        """返回所有键的列表，按排序顺序"""
        result = []
        self._inorder_traversal(self.root, result)
        return result

    def _key_value_traversal(self, node, result):
        """辅助方法 - 遍历获取所有键值对"""
        if node:
            self._key_value_traversal(node.left, result)
            result.append((node.key, node.value))
            self._key_value_traversal(node.right, result)

    def items(self):
        """返回所有键值对的列表，按键的排序顺序"""
        result = []
        self._key_value_traversal(self.root, result)
        return result

    def _floor(self, node, key):
        """辅助方法 - 查找小于等于指定键的最大键"""
        if node is None:
            return None

        if key == node.key:
            return node

        if key < node.key:
            return self._floor(node.left, key)

        t = self._floor(node.right, key)
        if t:
            return t
        else:
            return node

    def floor_key(self, key):
        """查找小于等于指定键的最大键"""
        node = self._floor(self.root, key)
        if node:
            return node.key
        return None

    def _ceiling(self, node, key):
        """辅助方法 - 查找大于等于指定键的最小键"""
        if node is None:
            return None

        if key == node.key:
            return node

        if key > node.key:
            return self._ceiling(node.right, key)

        t = self._ceiling(node.left, key)
        if t:
            return t
        else:
            return node

    def ceiling_key(self, key):
        """查找大于等于指定键的最小键"""
        node = self._ceiling(self.root, key)
        if node:
            return node.key
        return None
```

TreeSet：

```python
class TreeSet:
    """基于 TreeMap 实现的 TreeSet，仅存储键而不存储值"""
    def __init__(self):
        self.tree_map = TreeMap()

    def add(self, item):
        """添加元素"""
        self.tree_map.put(item, True)  # 使用布尔值 True 作为占位符

    def remove(self, item):
        """删除元素"""
        self.tree_map.remove(item)

    def contains(self, item):
        """检查是否包含某个元素"""
        return self.tree_map.contains_key(item)

    def is_empty(self):
        """检查集合是否为空"""
        return self.tree_map.is_empty()

    def __len__(self):
        """返回集合元素数量"""
        return len(self.tree_map)

    def items(self):
        """返回集合中所有元素的列表，按排序顺序"""
        return self.tree_map.keys()

    def floor(self, item):
        """查找小于等于指定元素的最大元素"""
        return self.tree_map.floor_key(item)

    def ceiling(self, item):
        """查找大于等于指定元素的最小元素"""
        return self.tree_map.ceiling_key(item)
```

Python 第三方库中的高性能排序容器：**sortedcontainers**，时间复杂度为 O(log n)。

```python
# SortedList
from sortedcontainers import SortedList

# 创建排序列表
sl = SortedList([3, 1, 2, 5, 4])
print(sl)  # SortedList([1, 2, 3, 4, 5])

# 添加元素
sl.add(0)

# 删除元素
sl.remove(3)

# 查找元素位置
print(sl.index(4))  # 3

# 二分查找
print(sl.bisect_left(3))  # 2，如果插入 3，应该放在索引 2 的位置
```

```python
# SortedDict
from sortedcontainers import SortedDict

# 创建排序字典
sd = SortedDict({3: 'c', 1: 'a', 2: 'b'})
print(sd)  # SortedDict({1: 'a', 2: 'b', 3: 'c'})

# 添加键值对
sd[4] = 'd'
print(sd)  # SortedDict({1: 'a', 2: 'b', 3: 'c', 4: 'd'})

# 删除键值对
del sd[2]
print(sd)  # SortedDict({1: 'a', 3: 'c', 4: 'd'})

# 获取最小/最大键
print(sd.peekitem(0))  # (1, 'a')
print(sd.peekitem(-1))  # (4, 'd')

# 获取小于等于某个键的键值对
print(sd.items())  # SortedDict_items([(1, 'a'), (3, 'c'), (4, 'd')])
```

```python
# SortedSet
from sortedcontainers import SortedSet

# 创建排序集合
ss = SortedSet([3, 1, 2, 1, 5])
print(ss)  # SortedSet([1, 2, 3, 5])

# 添加元素
ss.add(4)
print(ss)  # SortedSet([1, 2, 3, 4, 5])

# 删除元素
ss.remove(3)
print(ss)  # SortedSet([1, 2, 4, 5])

# 获取子集
print(ss.bisect_left(3))  # 2
print(list(ss.irange(2, 5)))  # [2, 4, 5]
```

## 五、二叉堆

[二叉堆 - OI Wiki](https://oi-wiki.org/ds/binary-heap/)

### 1. 二叉堆原理及性质

- 定义：二叉堆（Binary Heap）是一种特殊的二叉树数据结构，通常以**数组**的形式实现。
- 形状性质：它是**完全二叉树**，即所有层（除最后一层外）都完全填满，最后一层从左到右填充。
- 堆序性质：每个节点的值都满足某种顺序关系：
  - **最大堆**：父节点的值 ≥ 子节点的值。
  - **最小堆**：父节点的值 ≤ 子节点的值。
- 数组实现：
  - 根节点位于索引 0。
  - 对于索引为 `i` 的节点：
    - 左孩子索引：`2 * i + 1`。
    - 右孩子索引：`2 * i + 2`。
    - 父节点索引：`⌊(i - 1) / 2⌋`。

核心操作：

1. **上浮（swim）**
   - 当插入新元素，或某节点值变大（最大堆）/变小（最小堆）时，需将其与父节点比较，若违反堆序性质，则交换并递归向上调整。
   - 时间复杂度：O(log n)。
2. **下沉（sink）**
   - 当删除堆顶元素，或某节点值变小（最大堆）/变大（最小堆）时，需将其与子节点比较，交换至合适位置，递归向下调整。
   - 时间复杂度：O(log n)。

### 2. 优先级队列

- 定义：优先级队列（Priority Queue）是一种抽象数据类型，支持以下操作：
  - **插入元素**：将元素加入队列。
  - **删除优先级最高元素**：返回并移除优先级最高（最大或最小）的元素。
- 二叉堆天然适合实现优先级队列：
  - **最大堆**：实现“最大值优先”的队列，堆顶为最大元素。
  - **最小堆**：实现“最小值优先”的队列，堆顶为最小元素。

操作实现：

1. **插入（enqueue）**：将元素添加到数组末尾（树的最后一个位置），然后执行上浮操作。
2. **删除（dequeue）**：将堆顶（根节点）与数组末尾元素交换，移除末尾元素，然后对新根执行下沉操作。

### 3. 堆排序

- 定义：堆排序（Heap Sort）是一种基于**最大堆**的比较排序算法，时间复杂度为 O(nlogn)，空间复杂度为 O(1)（原地排序）。

算法步骤：

1. **构建最大堆**
   - 从最后一个非叶子节点（索引 `⌊n / 2 - 1⌋`）开始，对每个节点执行下沉操作，将数组调整为最大堆。
   - 时间复杂度：O(n)。
2. **排序过程**
   - 反复执行以下步骤：
     - 将堆顶（最大值）与数组末尾交换，堆大小减 1。
     - 对新的堆顶执行下沉操作，恢复堆序性质。
   - 时间复杂度：O(nlogn)，因为每次下沉为 O(log n)，共 n 次。

```python
def sift_down(arr, start, end):
    # 计算父结点和子结点的下标
    parent = int(start)
    child = int(parent * 2 + 1)
    while child <= end:  # 子结点下标在范围内才做比较
        # 先比较两个子结点大小，选择最大的
        if child + 1 <= end and arr[child] < arr[child + 1]:
            child += 1
        # 如果父结点比子结点大，代表调整完毕，直接跳出函数
        if arr[parent] >= arr[child]:
            return
        else:  # 否则交换父子内容，子结点再和孙结点比较
            arr[parent], arr[child] = arr[child], arr[parent]
            parent = child
            child = int(parent * 2 + 1)

def heap_sort(arr, length):
    # 从最后一个节点的父节点开始 sift down 以完成堆化
    i = (length - 1 - 1) // 2
    while i >= 0:
        sift_down(arr, i, length - 1)
        i -= 1
    # 先将第一个元素和已经排好的元素前一位做交换，再重新调整，直到排序完毕
    i = length - 1
    while i > 0:
        arr[0], arr[i] = arr[i], arr[0]
        sift_down(arr, 0, i - 1)
        i -= 1
```

### 4. Python 标准库中的 `heapq`

[heapq --- 堆队列算法 — Python 3.13.2 文档](https://docs.python.org/zh-cn/3.13/library/heapq.html)

#### 4.1. 关键要点

- Python 标准库的 `heapq` 模块实现了一个**最小堆（min-heap）**，总是将最小元素放在堆的前面，实现了堆队列算法，也称为优先队列算法。
- 它提供多种函数，如 `heappush`、`heappop` 和 `heapify`，用于管理优先队列和高效查找最大/最小元素。
- `heapq` 适合处理需要频繁提取最小元素的场景，如任务调度或图算法。

#### 4.2. 主要函数

| 函数名 | 描述 |
| --- | --- |
| `heapify(x)` | 将列表 `x` 原地转换为堆，时间复杂度 O(n)。 |
| `heappush(heap, item)` | 将 `item` 推入堆，保持堆属性，时间复杂度 O(log n)。 |
| `heappop(heap)` | 移除并返回堆中最小的元素，时间复杂度 O(log n)，空堆时抛出 `IndexError`。 |
| `heappushpop(heap, item)` | 先推入 `item` 再弹出最小元素，比单独调用更高效，时间复杂度 O(log n)。 |
| `heapreplace(heap, item)` | 弹出最小元素并推入 `item`，保持堆大小不变，时间复杂度 O(log n)。 |
| `merge(*iterables, key=None, reverse=False)` | 合并多个已排序的输入流为一个排序输出，时间复杂度 O(n log k)，其中 n 是总元素数，k 是输入流数。 |
| `nlargest(n, iterable, key=None)` | 返回 `iterable` 中最大的 n 个元素，时间复杂度 O(n log k)，k 为 n。 |
| `nsmallest(n, iterable, key=None)` | 返回 `iterable` 中最小的 n 个元素，时间复杂度 O(n log k)，k 为 n。 |

#### 4.3. 使用示例

创建堆并排序：

```python
import heapq

numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
heapq.heapify(numbers)
print(numbers)  # 输出类似 [1, 1, 2, 3, 5, 9, 4, 6, 5, 3, 5]，满足堆属性但非排序

sorted_numbers = []
while numbers:
    sorted_numbers.append(heapq.heappop(numbers))

print(sorted_numbers)  # 输出 [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
```

优先队列实现：

```python
tasks = []
heapq.heappush(tasks, (2, 'task1'))  # (优先级, 任务)
heapq.heappush(tasks, (1, 'task2'))
heapq.heappush(tasks, (3, 'task3'))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(task)  # 输出 task2, task1, task3，按优先级排序
```

查找最值：

```python
data = [1, 3, 5, 7, 9, 2, 4, 6, 8, 0]
print(heapq.nsmallest(3, data))  # 输出 [0, 1, 2]
print(heapq.nlargest(3, data))  # 输出 [9, 8, 7]
```

合并排序：

```python
a = [1, 3, 5]
b = [2, 4, 6]
c = [0, 7, 8]
merged = heapq.merge(a, b, c)
print(list(merged))  # 输出 [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

#### 4.4. 性能方面

- 插入和删除最小元素的时间复杂度为 O(log n)。
- `nlargest` 和 `nsmallest` 的时间复杂度为 O(n log k)，其中 k 为 n，适合 n 远小于数据规模时。
- `merge` 的时间复杂度为 O(n log k)，其中 n 是总元素数，k 是输入流数。

## 六、线段树

[线段树 - OI Wiki](https://oi-wiki.org/ds/seg/)

[从线段树二分的角度，带你发明线段树【力扣周赛 440】](https://www.bilibili.com/video/BV15gRaYZE5o/?spm_id_from=333.1007.tianma.2-2-5.click&vd_source=2ec749fa32b4f9ed98007167a68a993f)

稍微了解即可。

## 七、图论

[图论理论基础](https://programmercarl.com/kamacoder/%E5%9B%BE%E8%AE%BA%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html#%E5%9B%BE%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

### 1. 重要概念

- **连通分量**：在无向图中的极大连通子图称之为该图的一个连通分量。

### 2. 图的构造

1. *朴素存储*
2. *邻接矩阵*：二维数组。
3. *邻接表*：数组 + 链表。

### 3. 图的遍历

1. DFS
2. BFS
