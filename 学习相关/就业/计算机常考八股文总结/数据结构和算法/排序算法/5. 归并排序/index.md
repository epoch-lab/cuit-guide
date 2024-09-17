**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 归并排序原理

归并排序（Merge Sort）是一种基于分治法的排序算法。其核心思想是将数组分成两个子数组，分别进行排序，然后将两个有序子数组合并成一个有序数组。

归并排序的时间复杂度为 O(n log n)，非原地归并排序空间复杂度为 O(n)，原地归并排序空间复杂度为 O(1)。

***但要注意，原地归并排序的实现较为复杂，且性能可能不如非原地归并排序，因此并不常见，可以不去记忆。***

## 归并排序实现

如，对数组 `arr = [5, 3, 8, 6, 4]` 进行升序归并排序。

归并排序的步骤如下：

1. 将数组分成两个子数组。
2. 递归地对每个子数组进行归并排序。
3. 合并两个有序子数组。

排序过程如下：

1. 初始数组：`[5, 3, 8, 6, 4]`

    分成两个子数组：

    - 左子数组：`[5, 3]`
    - 右子数组：`[8, 6, 4]`

2. 对左子数组 `[5, 3]` 进行排序：

    - 分成两个子数组：`[5]` 和 `[3]`
    - 对每个子数组进行排序（单个元素视为有序）
    - 合并两个有序子数组：

        | 主数组   |     |     |
        | -------- | --- | --- |
        | 当前指针 | cur |     |
        | 子数组1  | 3   |     |
        | 当前指针 | i   |     |
        | 子数组2  | 5   |     |
        | 当前指针 | j   |     |

        `arr1[i] < arr2[j]`，`arr1[i]` 插入主数组

        | 主数组   | 3   |     |
        | -------- | --- | --- |
        | 当前指针 |     | cur |
        | 子数组1  | 3   |     |
        | 当前指针 |     | i   |
        | 子数组2  | 5   |     |
        | 当前指针 | j   |     |

        子数组1已经被遍历完成，`arr2` 元素依次插入主数组

        | 主数组 | 3   | 5   |
        | ------ | --- | --- |

3. 对右子数组 `[8, 6, 4]` 进行排序：

    - 分成两个子数组：`[8]` 和 `[6, 4]`
    - 对子数组 `[6, 4]` 进行排序：
        - 分成两个子数组：`[6]` 和 `[4]`
        - 对每个子数组进行排序（单个元素视为有序）
        - 合并两个有序子数组：`[4, 6]`（过程同步骤2）
    - 合并两个有序子数组：

        | 主数组   |     |     |     |
        | -------- | --- | --- | --- |
        | 当前指针 | cur |     |     |
        | 子数组1  | 4   | 6   |     |
        | 当前指针 | i   |     |     |
        | 子数组2  | 8   |     |     |
        | 当前指针 | j   |     |     |

        `arr1[i] < arr2[j]`，`arr1[i]` 插入主数组

        | 主数组   | 4   |     |     |
        | -------- | --- | --- | --- |
        | 当前指针 |     | cur |     |
        | 子数组1  | 4   | 6   |     |
        | 当前指针 |     | i   |     |
        | 子数组2  | 8   |     |     |
        | 当前指针 | j   |     |     |

        `arr1[i] < arr2[j]`，`arr1[i]` 插入主数组

        | 主数组   | 4   | 6   |     |
        | -------- | --- | --- | --- |
        | 当前指针 |     |     | cur |
        | 子数组1  | 4   | 6   |     |
        | 当前指针 |     |     | i   |
        | 子数组2  | 8   |     |     |
        | 当前指针 | j   |     |     |

        子数组1已经被遍历完成，`arr2` 元素依次插入主数组

        | 主数组 | 4   | 6   | 8   |
        | ------ | --- | --- | --- |

4. 合并两个有序子数组 `[3, 5]` 和 `[4, 6, 8]`：

    | 主数组   |     |     |     |     |     |
    | -------- | --- | --- | --- | --- | --- |
    | 当前指针 | cur |     |     |     |     |
    | 子数组1  | 3   | 5   |     |     |     |
    | 当前指针 | i   |     |     |     |     |
    | 子数组2  | 4   | 6   | 8   |     |     |
    | 当前指针 | j   |     |     |     |     |

    `arr1[i] < arr2[j]`，`arr1[i]` 插入主数组

    | 主数组   | 3   |     |     |     |     |
    | -------- | --- | --- | --- | --- | --- |
    | 当前指针 |     | cur |     |     |     |
    | 子数组1  | 3   | 5   |     |     |     |
    | 当前指针 |     | i   |     |     |     |
    | 子数组2  | 4   | 6   | 8   |     |     |
    | 当前指针 | j   |     |     |     |     |

    `arr1[i] > arr2[j]`，`arr2[j]` 插入主数组

    | 主数组   | 3   | 4   |     |     |     |
    | -------- | --- | --- | --- | --- | --- |
    | 当前指针 |     |     | cur |     |     |
    | 子数组1  | 3   | 5   |     |     |     |
    | 当前指针 |     | i   |     |     |     |
    | 子数组2  | 4   | 6   | 8   |     |     |
    | 当前指针 |     | j   |     |     |     |

    `arr1[i] < arr2[j]`，`arr1[i]` 插入主数组

    | 主数组   | 3   | 4   | 5   |     |     |
    | -------- | --- | --- | --- | --- | --- |
    | 当前指针 |     |     |     | cur |     |
    | 子数组1  | 3   | 5   |     |     |     |
    | 当前指针 |     |     | i   |     |     |
    | 子数组2  | 4   | 6   | 8   |     |     |
    | 当前指针 |     | j   |     |     |     |

    子数组1已经被遍历完成，`arr2` 元素依次插入主数组

    | 主数组 | 3   | 4   | 5   | 6   | 8   |
    | ------ | --- | --- | --- | --- | --- |

## 归并排序代码实现

非原地归并排序代码实现如下：

```java
public class MergeSort {
    public void mergeSort(int[] nums) {
        if (nums == null || nums.length < 2) {
            return;
        }
        int[] temp = new int[nums.length];
        mergeSort(nums, 0, nums.length - 1, temp);
    }

    private void mergeSort(int[] nums, int left, int right, int[] temp) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(nums, left, mid, temp);
            mergeSort(nums, mid + 1, right, temp);
            merge(nums, left, mid, right, temp);
        }
    }

    private void merge(int[] nums, int left, int mid, int right, int[] temp) {
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }
        while (i <= mid) {
            temp[k++] = nums[i++];
        }
        while (j <= right) {
            temp[k++] = nums[j++];
        }
        for (i = 0; i < k; i++) {
            nums[left + i] = temp[i];
        }
    }
}
```

原地归并排序代码实现如下：

```java
public class InPlaceMergeSort {
    public void mergeSort(int[] nums) {
        if (nums == null || nums.length < 2) {
            return;
        }
        mergeSort(nums, 0, nums.length - 1);
    }

    private void mergeSort(int[] nums, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(nums, left, mid);
            mergeSort(nums, mid + 1, right);
            merge(nums, left, mid, right);
        }
    }

    private void merge(int[] nums, int left, int mid, int right) {
        int start2 = mid + 1;
        if (nums[mid] <= nums[start2]) {
            return;
        }
        while (left <= mid && start2 <= right) {
            if (nums[left] <= nums[start2]) {
                left++;
            } else {
                int value = nums[start2];
                int index = start2;

                while (index != left) {
                    nums[index] = nums[index - 1];
                    index--;
                }
                nums[left] = value;

                left++;
                mid++;
                start2++;
            }
        }
    }
}
```