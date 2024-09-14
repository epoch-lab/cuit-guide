**本模块适合 `Java后端研发（业务岗、架构岗）`、`Java安卓原生研发`等 Java 相关岗位的同学。**

## `String a = "abc"; String b = "abc";` 会创建几个对象？

`String a = "abc"; String b = "abc";` 会创建一个对象，因为 Java 中的字符串常量是存储在常量池中的，当创建一个字符串常量时，会先在常量池中查找是否存在相同的字符串常量，如果存在，则直接返回引用，如果不存在，则创建一个新的字符串常量。

在这个例子中，`"abc"` 是一个字符串常量。第一次执行 `String a = "abc";` 时，常量池中没有 `"abc"`，所以会创建一个新的字符串对象并将其放入常量池中。第二次执行 `String b = "abc";` 时，常量池中已经有了 `"abc"`，所以 `b` 会直接引用常量池中的这个对象，而不会创建新的对象。因此，`a` 和 `b` 都引用同一个字符串对象。

## 讲讲`String`和`StringBuffer`、`StringBuilder`的区别

`String`、`StringBuffer`和`StringBuilder`都是 Java 中的字符串类，它们之间的区别如下：

1. `String`：`String`是不可变的字符串类，一旦创建就不能被修改，每次修改都会创建一个新的字符串对象，效率较低。
2. `StringBuffer`：`StringBuffer`是可变的字符串类，可以修改字符串的内容，是线程安全的，效率较低。
3. `StringBuilder`：`StringBuilder`是可变的字符串类，可以修改字符串的内容，是非线程安全的，效率较高。

`StringBuffer`和`StringBuilder`的区别是`StringBuffer`是线程安全的，`StringBuilder`是非线程安全的，所以在单线程环境下，推荐使用`StringBuilder`，在多线程环境下，推荐使用`StringBuffer`。

## 讲讲`String`的常用方法 API

`String`类是 Java 中的字符串类，提供了一些常用的方法 API，如下：

1. `public int length()`：返回字符串的长度。
2. `public char charAt(int index)`：返回字符串中指定位置的字符。
3. `public int indexOf(String str)`：返回字符串中指定子串的位置。
4. `public String substring(int beginIndex)`：返回字符串中从指定位置开始到末尾的子串。
5. `public String substring(int beginIndex, int endIndex)`：返回字符串中从指定位置开始到指定位置结束的子串。
6. `public String replace(char oldChar, char newChar)`：返回字符串中指定字符替换后的字符串。
7. `public String replace(CharSequence target, CharSequence replacement)`：返回字符串中指定子串替换后的字符串。
8. `public String toUpperCase()`：返回字符串中所有字符转换为大写的字符串。
9. `public String toLowerCase()`：返回字符串中所有字符转换为小写的字符串。
10. `public String trim()`：返回字符串中去除前后空格的字符串。
11. `public boolean equals(Object obj)`：判断两个字符串是否相等。
12. `public boolean equalsIgnoreCase(String anotherString)`：忽略大小写判断两个字符串是否相等。
13. `public boolean startsWith(String prefix)`：判断字符串是否以指定前缀开头。
14. `public boolean endsWith(String suffix)`：判断字符串是否以指定后缀结尾。
15. `public boolean contains(CharSequence s)`：判断字符串是否包含指定子串。
16. `public String[] split(String regex)`：返回字符串根据指定分隔符分割后的字符串数组。
17. `public byte[] getBytes()`：返回字符串的字节数组。
18. `public char[] toCharArray()`：返回字符串的字符数组。
19. `public int compareTo(String anotherString)`：比较字符串的大小。
20. `public int compareToIgnoreCase(String str)`：忽略大小写比较字符串的大小。
21. `public boolean isEmpty()`：判断字符串是否为空。

## 讲讲`StringBuffer`的常用方法 API

`StringBuffer`类是 Java 中的可变字符串类，提供了一些常用的方法 API，如下：

1. `public synchronized int length()`：返回字符串的长度。
2. `public synchronized int capacity()`：返回字符串的容量。
3. `public synchronized char charAt(int index)`：返回字符串中指定位置的字符。
4. `public synchronized int indexOf(String str)`：返回字符串中指定子串的位置。
5. `public synchronized StringBuffer append(String str)`：追加字符串。
6. `public synchronized StringBuffer insert(int offset, String str)`：插入字符串。
7. `public synchronized StringBuffer delete(int start, int end)`：删除字符串。
8. `public synchronized StringBuffer replace(int start, int end, String str)`：替换字符串。
9. `public synchronized StringBuffer reverse()`：反转字符串。
10. `public synchronized String substring(int start)`：返回字符串中从指定位置开始到末尾的子串。
11. `public synchronized String substring(int start, int end)`：返回字符串中从指定位置开始到指定位置结束的子串。
12. `public synchronized String toString()`：返回字符串的字符串表示。
13. `public synchronized void setCharAt(int index, char ch)`：设置字符串中指定位置的字符。
14. `public synchronized void setLength(int newLength)`：设置字符串的长度。
15. `public synchronized void ensureCapacity(int minimumCapacity)`：确保字符串的容量。
16. `public synchronized void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)`：将字符串中的字符复制到目标数组中。
17. `public synchronized void trimToSize()`：将字符串的容量调整为字符串的长度。

## 讲讲`StringBuilder`的常用方法 API

`StringBuilder`类是 Java 中的可变字符串类，提供了一些常用的方法 API，如下：

1. `public int length()`：返回字符串的长度。
2. `public int capacity()`：返回字符串的容量。
3. `public char charAt(int index)`：返回字符串中指定位置的字符。
4. `public int indexOf(String str)`：返回字符串中指定子串的位置。
5. `public StringBuilder append(String str)`：追加字符串。
6. `public StringBuilder insert(int offset, String str)`：插入字符串。
7. `public StringBuilder delete(int start, int end)`：删除字符串。
8. `public StringBuilder replace(int start, int end, String str)`：替换字符串。
9. `public StringBuilder reverse()`：反转字符串。
10. `public String substring(int start)`：返回字符串中从指定位置开始到末尾的子串。
11. `public String substring(int start, int end)`：返回字符串中从指定位置开始到指定位置结束的子串。
12. `public String toString()`：返回字符串的字符串表示。
13. `public void setCharAt(int index, char ch)`：设置字符串中指定位置的字符。
14. `public void setLength(int newLength)`：设置字符串的长度。
15. `public void ensureCapacity(int minimumCapacity)`：确保字符串的容量。
16. `public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)`：将字符串中的字符复制到目标数组中。
17. `public void trimToSize()`：将字符串的容量调整为字符串的长度。