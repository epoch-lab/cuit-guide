**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 堆排序原理

堆排序（Heap Sort）是一种基于堆数据结构的排序算法。堆是一棵完全二叉树，分为最大堆和最小堆。最大堆的性质是每个节点的值都大于或等于其子节点的值，最小堆的性质是每个节点的值都小于或等于其子节点的值。

堆排序的时间复杂度为 O(n log n)，空间复杂度为 O(1)。

许多编程语言当中的优先队列（Priority Queue）就是基于堆实现的。

## 堆排序实现

如，对数组 `arr = [5, 3, 8, 6, 4]` 进行升序堆排序。

堆排序的步骤如下：

1. 构建最大堆。（实际目的是让大数上浮，小数下沉，最大值在堆顶）
2. 将堆顶元素（最大值）与末尾元素交换，将堆的大小减 1，然后重新调整堆。
3. 重复步骤 2，直到堆的大小为 1。

### 构建最大堆

初始数组：`[5, 3, 8, 6, 4]`

构建最大堆的过程如下：

1. 从最后一个非叶子节点开始调整堆：

    - 节点 `3`（索引 `1`）：

        ```
              5
             / \
            3   8
           / \
          6   4
        ```

        `6` > `4` > `3` ，交换 `3` 和 `6`：

        ```
              5
             / \
            6   8
           / \
          3   4
        ```

    虽然产生了交换，但被交换的节点是叶子节点，不需要递归调整。
    
    接下来寻找前一个非叶子节点调整堆。

2. 此时前一个非叶子节点已经是根节点，故调整根节点：

    - 节点 `5`（索引 `0`）：

        ```
              5
             / \
            6   8
           / \
          3   4
        ```

        `8` > `6` > `5` ，交换 `5` 和 `8`：

        ```
              8
             / \
            6   5
           / \
          3   4
        ```

        因为产生了交换，所以需要继续递归调整受改动的节点 `5`（索引 `2`）：

        ```
              8
             / \
            6   5
           / \
          3   4
        ```

        递归发现 `5` 是叶子节点，不需要进一步调整。

### 堆排序过程

1. 交换堆顶元素和末尾元素，此时将未排序长度减 1（即结尾的 `8` 可以忽略不计）：

    ```
          4
         / \
        6   5
       / \
      3   8
    ```

    从堆顶向下递归，找到最大值上浮：

    ```
          6
         / \
        4   5
       / \
      3   8
    ```

2. 交换堆顶元素和末尾元素，未排序长度减 1：

    ```
          3
         / \
        4   5
       / \
      6   8
    ```

    调整堆：

    ```
          5
         / \
        4   3
       / \
      6   8
    ```

3. 交换堆顶元素和末尾元素，未排序长度减 1：

    ```
          3
         / \
        4   5
       / \
      6   8
    ```

    调整堆：

    ```
          4
         / \
        3   5
       / \
      6   8
    ```

4. 交换堆顶元素和末尾元素：

    ```
          3
         / \
        4   5
       / \
      6   8
    ```

    此时未排序长度为 1，排序完成。

最终排序结果：`[3, 4, 5, 6, 8]`

## 堆排序代码实现

虽然堆排序的实现是基于二叉树的，但我们一般将数组抽象为二叉树来实现。

需要抓住两个关键点：

1. 最后一个非叶子节点的索引为 `nums.length >> 1 - 1` 也就是 `n / 2 - 1`。
2. 非叶子节点 `i` 的左子节点索引为 `2 * i + 1`，右子节点索引为 `2 * i + 2`。

这样即可简单实现堆排序。

```java
public class HeapSort {
    public void heapSort(int[] nums) {
        int n = nums.length;

        // 构建最大堆
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(nums, n, i);
        }

        // 一个个从堆顶取出元素
        for (int i = n - 1; i > 0; i--) {
            swap(nums, 0, i);
            heapify(nums, i, 0);
        }
    }

    private void heapify(int[] nums, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && nums[left] > nums[largest]) {
            largest = left;
        }

        if (right < n && nums[right] > nums[largest]) {
            largest = right;
        }

        if (largest != i) {
            swap(nums, i, largest);
            heapify(nums, n, largest);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

## 手写优先队列（非算法岗了解即可）

优先队列是一种特殊的队列，元素被赋予优先级，当访问元素时，具有最高优先级的元素最先被删除。

大多数时候我们会选择用堆来实现优先队列。

由于 Java 等语言已经提供了优先队列的实现，而 JavaScript、TypeScript 等语言没有提供优先队列的实现，所以这里就用 TypeScript 来手写一个优先队列，大家用 TS 写力扣题时可以直接复制使用。***（但是建议笔试时遇到优先队列题换用已经有优先队列实现的语言）***

暂定`PriorityQueue`类提供了以下构造函数、方法和属性：

- `PriorityQueue(comparer: (a: T, b: T) => number)`：构造函数，传入一个比较函数，用于比较元素的优先级，大于 0 表示 a 的优先级高于 b，小于 0 表示 a 的优先级低于 b。
- `add(val: T): void`：添加元素。
- `remove(): T | undefined`：移除并返回队列中的最高优先级元素。
- `peek(): T | undefined`：返回队列中的最高优先级元素。
- `length: number`：只读属性，返回队列中元素的个数。

实现代码如下：

```typescript
class PriorityQueue<T> {
    private data: T[] = [];
    private comparer: (a: T, b: T) => number;

    constructor(comparer: (a: T, b: T) => number) {
        this.comparer = comparer;
    }

    public add(val: T): void {
        this.data.push(val);
        this.bubbleUp();
    }

    public remove(): T | undefined {
        if (this.data.length === 0) return undefined;
        const top = this.data[0];
        const bottom = this.data.pop();
        if (this.data.length > 0 && bottom !== undefined) {
            this.data[0] = bottom;
            this.bubbleDown();
        }
        return top;
    }

    private bubbleUp(): void {
        let index = this.data.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparer(this.data[index], this.data[parentIndex]) >= 0) break;
            [this.data[index], this.data[parentIndex]] = [this.data[parentIndex], this.data[index]];
            index = parentIndex;
        }
    }

    private bubbleDown(): void {
        let index = 0;
        const length = this.data.length;
        const element = this.data[0];

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = -1;

            if (leftChildIndex < length) {
                if (this.comparer(this.data[leftChildIndex], element) < 0) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                if (
                    (swapIndex === -1 && this.comparer(this.data[rightChildIndex], element) < 0) ||
                    (swapIndex !== -1 && this.comparer(this.data[rightChildIndex], this.data[leftChildIndex]) < 0)
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === -1) break;
            [this.data[index], this.data[swapIndex]] = [this.data[swapIndex], this.data[index]];
            index = swapIndex;
        }
    }

    public get length(): number {
        return this.data.length;
    }

    public peek(): T | undefined {
        return this.data[0];
    }
}
```