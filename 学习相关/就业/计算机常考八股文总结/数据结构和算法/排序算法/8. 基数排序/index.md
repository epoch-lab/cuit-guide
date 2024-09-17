**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 基数排序原理

基数排序（Radix Sort）是一种非比较型整数排序算法。它通过将整数按位数分割，然后按每个位数进行排序来实现排序。基数排序可以使用计数排序或桶排序作为子过程来对每个位数进行排序。

基数排序的时间复杂度为 O(d * (n + k))，其中 d 是位数，n 是元素数量，k 是基数。空间复杂度为 O(n + k)。

基数排序一般不会在笔试、面试手撕题目中出现，但有可能出现在选择题、面试问答题中。

## 基数排序实现

如，对数组 `arr = [170, 45, 75, 90, 802, 24, 2, 66]` 进行升序基数排序。

基数排序的步骤如下：

1. 找到数组中的最大数，确定排序的最大位数。
2. 从最低位开始，对每个位数进行排序。

### 基数排序过程

初始数组：`[170, 45, 75, 90, 802, 24, 2, 66]`

1. 找到最大数 `802`，确定最大位数为 3。

2. 从最低位（个位）开始，对每个位数进行计数排序：

    - 对个位数进行排序：

        ```
        原数组：[170, 45, 75, 90, 802, 24, 2, 66]
        计数排序后：[170, 90, 802, 2, 24, 45, 75, 66]
        ```

    - 对十位数进行排序：

        ```
        原数组：[170, 90, 802, 2, 24, 45, 75, 66]
        计数排序后：[802, 2, 24, 45, 66, 75, 170, 90]
        ```

    - 对百位数进行排序：

        ```
        原数组：[802, 2, 24, 45, 66, 75, 170, 90]
        计数排序后：[2, 24, 45, 66, 75, 90, 170, 802]
        ```

最终排序结果：`[2, 24, 45, 66, 75, 90, 170, 802]`

## 基数排序代码实现（非算法岗了解即可）

```java
import java.util.Arrays;

public class RadixSort {
    public void radixSort(int[] nums) {
        if (nums == null || nums.length == 0) {
            return;
        }

        // 找到最大数，确定最大位数
        int max = Arrays.stream(nums).max().getAsInt();
        int exp = 1; // exp 是位数的指数，1 表示个位，10 表示十位，100 表示百位

        // 从个位开始，对每个位数进行计数排序
        while (max / exp > 0) {
            countingSort(nums, exp);
            exp *= 10;
        }
    }

    private void countingSort(int[] nums, int exp) {
        int n = nums.length;
        int[] output = new int[n]; // 输出数组
        int[] count = new int[10]; // 计数数组，基数为 10

        // 统计每个位数出现的次数
        for (int i = 0; i < n; i++) {
            int index = (nums[i] / exp) % 10;
            count[index]++;
        }

        // 计算累积计数
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // 根据计数数组构建输出数组
        for (int i = n - 1; i >= 0; i--) {
            int index = (nums[i] / exp) % 10;
            output[count[index] - 1] = nums[i];
            count[index]--;
        }

        // 将排序结果复制回原数组
        System.arraycopy(output, 0, nums, 0, n);
    }

    public static void main(String[] args) {
        RadixSort sorter = new RadixSort();
        int[] nums = {170, 45, 75, 90, 802, 24, 2, 66};
        sorter.radixSort(nums);
        System.out.println(Arrays.toString(nums)); // 输出：[2, 24, 45, 66, 75, 90, 170, 802]
    }
}
```