**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 快速排序原理

快速排序（Quick Sort）是一种基于分治法的排序算法。其核心思想是通过选择一个基准元素（pivot），将数组分成两个子数组，使得左子数组的所有元素都小于基准元素，右子数组的所有元素都大于基准元素，然后递归地对两个子数组进行排序。

快速排序的时间复杂度在最优和平均情况下为 O(n log n)，在最坏情况下为 O(n^2)。原地快排空间复杂度为 O(log n)（递归调用栈的深度），非原地快排空间复杂度为 O(n log n)（需要额外的空间存储中间结果，每次递归都要创建新的数组）。

***但要注意，和[归并排序](../5.%20归并排序/index.md)不同，快排更加推荐使用原地排序，因为原地排序的空间复杂度更低，性能更好。***

## 快速排序实现

如，对数组 `arr = [5, 3, 8, 6, 4]` 进行升序快速排序。

快速排序的步骤如下：

1. 选择一个基准元素（pivot）。
2. 将数组分成两个子数组，使得左子数组的所有元素都小于基准元素，右子数组的所有元素都大于基准元素。
3. 递归地对两个子数组进行快速排序。

排序过程如下：

1. 初始数组：`[5, 3, 8, 6, 4]`

    选择基准元素：`5`

    依次同基准元素比对大小，小元素放左，大元素放右，最终分成两个子数组：

    - 左子数组：`[3, 4]`
    - 右子数组：`[8, 6]`
  
    此时数组变为：`[3, 4, 5, 8, 6]`

2. 对左子数组 `[3, 4]` 进行排序：

    - 选择基准元素：`3`
    - 分成两个子数组：`[]` 和 `[4]`
    - 递归地对两个子数组进行排序（单个元素视为有序）

3. 对右子数组 `[8, 6]` 进行排序：

    - 选择基准元素：`8`
    - 分成两个子数组：`[6]` 和 `[]`
    - 递归地对两个子数组进行排序（单个元素视为有序）

4. 合并结果：

    - 左子数组排序结果：`[3, 4]`
    - 右子数组排序结果：`[6, 8]`
    - 合并结果：`[3, 4, 5, 6, 8]`

## 快速排序代码实现

原地快排代码实现如下：

```java
public class QuickSort {
    public void quickSort(int[] nums) {
        if (nums == null || nums.length < 2) {
            return;
        }
        quickSort(nums, 0, nums.length - 1);
    }

    private void quickSort(int[] nums, int left, int right) {
        if (left < right) {
            int pivotIndex = partition(nums, left, right);
            quickSort(nums, left, pivotIndex - 1);
            quickSort(nums, pivotIndex + 1, right);
        }
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left - 1;
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                i++;
                swap(nums, i, j);
            }
        }
        swap(nums, i + 1, right);
        return i + 1;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

快排的核心是 `partition` 方法，该方法将数组分成两个子数组，并返回基准元素的索引。`quickSort` 方法递归地对两个子数组进行排序。

非原地快排代码实现如下：

```java
import java.util.ArrayList;
import java.util.List;

public class QuickSortNonInPlace {
    public static List<Integer> quickSort(List<Integer> list) {
        if (list.size() <= 1) {
            return list;
        }
        int pivot = list.get(list.size() / 2);
        List<Integer> left = new ArrayList<>();
        List<Integer> right = new ArrayList<>();
        List<Integer> equal = new ArrayList<>();
        for (int num : list) {
            if (num < pivot) {
                left.add(num);
            } else if (num > pivot) {
                right.add(num);
            } else {
                equal.add(num);
            }
        }
        List<Integer> sortedLeft = quickSort(left);
        List<Integer> sortedRight = quickSort(right);
        sortedLeft.addAll(equal);
        sortedLeft.addAll(sortedRight);
        return sortedLeft;
    }
}
```

## 快速排序优化（非算法岗不常考）

快速排序的性能取决于基准元素的选择。如果每次选择的基准元素都是最大或最小元素，那么快速排序的时间复杂度将退化为 O(n^2)。

为了避免这种情况，可以采用以下优化策略：

1. 三数取中法：选择基准元素时，使用三数取中法（选择左、中、右三个元素的中间值）来避免最坏情况。
2. 尾递归优化：在递归调用时，优先对较小的子数组进行递归，以减少递归调用栈的深度。
3. 小数组使用插入排序：对于小数组（如长度小于 10），可以使用插入排序来提高性能。

如，三数取中法的代码实现如下：

```java
public class OptimizedQuickSort {
    public void quickSort(int[] nums) {
        if (nums == null || nums.length < 2) {
            return;
        }
        quickSort(nums, 0, nums.length - 1);
    }

    private void quickSort(int[] nums, int left, int right) {
        if (left < right) {
            int pivotIndex = medianOfThree(nums, left, right);
            swap(nums, pivotIndex, right);
            pivotIndex = partition(nums, left, right);
            quickSort(nums, left, pivotIndex - 1);
            quickSort(nums, pivotIndex + 1, right);
        }
    }

    private int medianOfThree(int[] nums, int left, int right) {
        int mid = left + (right - left) / 2;
        if (nums[left] > nums[mid]) {
            swap(nums, left, mid);
        }
        if (nums[left] > nums[right]) {
            swap(nums, left, right);
        }
        if (nums[mid] > nums[right]) {
            swap(nums, mid, right);
        }
        return mid;
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[right];
        int i = left - 1;
        for (int j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                i++;
                swap(nums, i, j);
            }
        }
        swap(nums, i + 1, right);
        return i + 1;
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```