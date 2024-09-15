**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 什么是KMP算法？

KMP算法是一种字符串匹配算法，用于在一个主串中查找一个模式串的出现位置。KMP算法的核心思想是利用已匹配的信息，尽量减少不必要的匹配，提高匹配效率。

KMP算法的主要步骤如下：

1. 构建模式串的最长前缀后缀数组（Next数组）。
2. 在主串中查找模式串。

KMP算法的时间复杂度为O(m+n)，其中m为主串长度，n为模式串长度。

## KMP算法的实现

KMP算法的实现主要包括两个步骤：构建模式串的最长前缀后缀数组和在主串中查找模式串。

假设现在有一个主串text和一个模式串pattern，主串的内容为"ABABACB"，模式串的内容为"ABAC"，现在要在主串中查找模式串的位置。

### 第一步，开始构建Next数组

此时不妨列出如下表格：

| pattern      | A   | B   | A   | C   |
| ------------ | --- | --- | --- | --- |
| index        | 0   | 1   | 2   | 3   |
| cursor(i, j) | j   | i   |     |     |
| next         | 0   |     |     |     |

指定两个指针i和j，i初始化为1，j初始化为0，next[0] = 0。

### 第二步，开始比较pattern[i]和pattern[j]，直到遍历完整个模式串

如果相等，则next[i] = j + 1，i和j分别加1；如果不相等，则j回溯到next[j-1]的位置，如果j为0，则next[i] = 0，i++。直到遍历完整个模式串。

比如，此时pattern[1] = 'B'，pattern[0] = 'A'，不相等，由于j = 0，所以直接设置next[1] = 0，i++。

| pattern      | A   | B   | A   | C   |
| ------------ | --- | --- | --- | --- |
| index        | 0   | 1   | 2   | 3   |
| cursor(i, j) | j   |     | i   |     |
| next         | 0   | 0   |     |     |

接下来，pattern[2] = 'A'，pattern[0] = 'A'，相等，next[2] = 1，i++，j++。

| pattern      | A   | B   | A   | C   |
| ------------ | --- | --- | --- | --- |
| index        | 0   | 1   | 2   | 3   |
| cursor(i, j) |     | j   |     | i   |
| next         | 0   | 0   | 1   |     |

最后，pattern[3] = 'C'，pattern[1] = 'B'，不相等，j回溯到next[j-1]的位置，即j = 0，next[3] = 0，i++。此时模式串的最长前缀后缀数组为next = [0, 0, 1, 0]。

| pattern      | A   | B   | A   | C   |
| ------------ | --- | --- | --- | --- |
| index        | 0   | 1   | 2   | 3   |
| cursor(i, j) | j   |     |     | i   |
| next         | 0   | 0   | 1   | 0   |

### 第三步，开始在主串中查找模式串

指定两个指针i和j，i和j初始化为0。

先列出如下表格：

| text         | A   | B   | A   | B   | A   | C   | B   |
| ------------ | --- | --- | --- | --- | --- | --- | --- |
| textIndex    | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| i            | i   |     |     |     |     |     |     |
| pattern      | A   | B   | A   | C   |     |     |     |
| patternIndex | 0   | 1   | 2   | 3   |     |     |     |
| j            | j   |     |     |     |     |     |     |
| next         | 0   | 0   | 1   | 0   |     |     |     |

开始比较text[i]和pattern[j]，如果相等，则i和j分别加1；如果不相等，则j回溯到next[j-1]的位置，如果j为0，则i++。直到遍历完整个主串。

比如，直到i和j都为2时，text[2] = 'A'，pattern[2] = 'A'，相等，i++，j++。

| text         | A   | B   | A   | B   | A   | C   | B   |
| ------------ | --- | --- | --- | --- | --- | --- | --- |
| textIndex    | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| i            |     |     |     | i   |     |     |     |
| pattern      | A   | B   | A   | C   |     |     |     |
| patternIndex | 0   | 1   | 2   | 3   |     |     |     |
| j            |     |     |     | j   |     |     |     |
| next         | 0   | 0   | 1   | 0   |     |     |     |

此时，i和j都为3，text[3] = 'B'，pattern[3] = 'C'，不相等，j回溯到next[j-1]的位置，即j = 1.因为j != 0，所以这里i不变。由于j向左发生了2格的偏移，这里不妨把pattern及以下的表格向右移动2格。

| text         | A   | B   | A   | B   | A   | C   | B   |
| ------------ | --- | --- | --- | --- | --- | --- | --- |
| textIndex    | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| i            |     |     |     | i   |     |     |     |
| pattern      |     |     | A   | B   | A   | C   |     |
| patternIndex |     |     | 0   | 1   | 2   | 3   |     |
| j            |     |     |     | j   |     |     |     |
| next         |     |     | 0   | 0   | 1   | 0   |     |

接下来，由于j直接指向了字符'B'，免去了从'A'开始的比较，直接比较text[3] = 'B'和pattern[1] = 'B'，相等，i++，j++，直到遍历完模式串，返回匹配的位置`i - j`。

| text         | A   | B   | A   | B   | A   | C   | B   |
| ------------ | --- | --- | --- | --- | --- | --- | --- |
| textIndex    | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
| i            |     |     |     |     |     |     | i   |
| pattern      |     |     | A   | B   | A   | C   |     |
| patternIndex |     |     | 0   | 1   | 2   | 3   | 4   |
| j            |     |     |     |     |     |     | j   |
| next         |     |     | 0   | 0   | 1   | 0   |     |

最终，模式串在主串中的索引为`i - j = 6 - 4 = 2`。

## KMP算法的代码实现

例题：给定一个主串text和一个模式串pattern，返回模式串在主串中的索引，如果不存在则返回-1。*（手写`String.indexOf()`方法）*

```java
// 计算模式串的最长前缀后缀
public int[] getNext(String pattern) {
    int n = pattern.length();
    // 这里不需要next[0] = 0，因为int数组默认值为0，如果是js等弱类型语言则需要手动初始化为0
    int[] next = new int[n];
    int i = 1, j = 0;
    while (i < n) {
        if (pattern.charAt(i) == pattern.charAt(j))
            next[i++] = ++j;
        else if (j > 0)
            j = next[j - 1];
        else
            next[i++] = 0;
    }
    return next;
}

// KMP算法，返回模式串在主串中的索引
public int kmp(String text, String pattern) {
    int m = text.length(), n = pattern.length();
    // 主串长度不可以小于模式串长度
    if (m < n) return -1;
    // 空串默认视为在主串的起始位置
    if (n == 0) return 0;

    int[] next = getNext(pattern);
    int i = 0, j = 0;
    while (i < m && j < n) {
        if (text.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
        } else if (j > 0)
            j = next[j - 1];
        else
            i++;
    }
    return j == n ? i - j : -1;
}
```