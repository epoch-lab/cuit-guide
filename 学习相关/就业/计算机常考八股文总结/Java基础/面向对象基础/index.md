**本模块适合 `Java后端研发（业务岗、架构岗）`、`Java安卓原生研发`等 Java 相关岗位的同学。**

## Java 是完全的面向对象语言吗？

Java 是一种面向对象的编程语言，但不是完全的面向对象语言。Java 中有 8 种基本数据类型，这些基本数据类型不是对象，不具有面向对象的特性。另外，Java 中还有一些关键字，比如 static、final、synchronized 等，这些关键字也不是面向对象的。

## 讲讲 Object 的常用方法 API

Java 中的 Object 类是所有类的父类，提供了一些常用的方法 API，如下：

1. `public String toString()`：返回对象的字符串表示。
2. `public boolean equals(Object obj)`：判断两个对象是否相等。
3. `public int hashCode()`：返回对象的哈希码值。
4. `protected Object clone()`：创建并返回此对象的一个副本。
5. `public final Class<?> getClass()`：返回对象的运行时类。(反射)
6. `protected void finalize()`：当对象被垃圾回收器回收时调用。
7. `public final void notify()`：唤醒在此对象监视器上等待的单个线程。
8. `public final void notifyAll()`：唤醒在此对象监视器上等待的所有线程。
9. `public final void wait()`：导致当前线程等待，直到另一个线程调用此对象的`notify()`方法或`notifyAll()`方法。
10. `public final void wait(long timeout)`：导致当前线程等待，直到另一个线程调用此对象的`notify()`方法或`notifyAll()`方法，或者指定的时间已经过去。
11. `public final void wait(long timeout, int nanos)`：导致当前线程等待，直到另一个线程调用此对象的`notify()`方法或`notifyAll()`方法，或者其他某个线程中断当前线程，或者已经过去的时间超过指定的时间。
 
## 简单讲讲`equals()`重写的原则

在 Java 中，`equals()`方法是用来判断两个对象是否相等的，但是默认情况下，`equals()`方法是继承自 Object 类的，它只是比较两个对象的引用是否相等，即比较的是内存地址。

为了实现自定义的相等判断，需要重写`equals()`方法，一般遵循以下原则：

1. 自反性：对于任何非 null 的引用值 x，x.equals(x) 应该返回 true。
2. 对称性：对于任何非 null 的引用值 x 和 y，如果 x.equals(y) 返回 true，则 y.equals(x) 也应该返回 true。
3. 传递性：对于任何非 null 的引用值 x、y 和 z，如果 x.equals(y) 返回 true，并且 y.equals(z) 返回 true，则 x.equals(z) 也应该返回 true。
4. 一致性：对于任何非 null 的引用值 x 和 y，只要 equals 的比较操作在对象中所用的信息没有被修改，多次调用 x.equals(y) 应该一致地返回 true 或 false。
5. 非空性：对于任何非 null 的引用值 x，x.equals(null) 应该返回 false。

## 例题：重写`equals()`方法，让 a 和 b 相等

```java
public class Test {
    private int age;
    private String name;

    public Test(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Test test = (Test) obj;
        return age == test.age && Objects.equals(name, test.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(age, name);
    }

    public static void main(String[] args) {
        Test a = new Test(18, "Tom");
        Test b = new Test(18, "Tom");
        System.out.println(a.equals(b)); // true
    }
}
```

## 为什么要在重写`equals()`方法的时候同时重写`hashCode()`方法？

在 Java 中，`hashCode()`方法是用来计算对象的哈希码值的，哈希码值是用来确定对象在哈希表中的位置的。如果两个对象相等，那么它们的哈希码值也应该相等，否则会导致哈希表中的冲突。

所以在重写`equals()`方法的时候，一般也要重写`hashCode()`方法，保证相等的对象具有相等的哈希码值。

## 讲讲`clone()`方法的实现原理

`clone()`方法是用来创建并返回对象的一个副本的，它是`Object`类的一个`protected`方法，需要实现`Cloneable`接口。

`clone()`方法的实现原理如下：

1. 首先，`clone()`方法是一个`protected`方法，只能在子类中调用，所以如果要使用`clone()`方法，需要重写`clone()`方法，并将其改为`public`。
2. 其次，`clone()`方法是浅拷贝，即只拷贝对象的引用，而不拷贝对象的内容。如果对象中包含引用类型的成员变量，那么拷贝的对象和原对象中的引用会指向同一个对象。
3. 最后，如果要实现深拷贝，需要在`clone()`方法中手动拷贝对象的内容，包括基本数据类型和引用类型。

## 简单手写一下浅拷贝，不用`clone()`方法和使用`clone()`方法都写一遍

```java
public static <T> T shallowCopy(T obj) {
    if (obj == null) {
        return null;
    }
    try {
        T copy = (T) obj.getClass().getDeclaredConstructor().newInstance();
        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            field.set(copy, field.get(obj));
        }
        return copy;
    } catch (InstantiationException | IllegalAccessException e) {
        e.printStackTrace();
        return null;
    }
}
```

```java
public class Test implements Cloneable {
    private int age;
    private String name;

    public Test(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public Object clone() {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        Test a = new Test(18, "Tom");
        Test b = (Test) a.clone();
        System.out.println(a.equals(b)); // false
    }
}
```

## 如何改写`clone()`方法实现深拷贝？

```java
public class Test<T> implements Cloneable {
    private int age;
    private String name;
    private List<T> list;

    public Test(int age, String name, List<T> list) {
        this.age = age;
        this.name = name;
        this.list = list;
    }

    @Override
    public Object clone() {
        try {
            Test copy = (Test) super.clone();
            copy.list = new ArrayList<>();
            for (T t : list)
                copy.list.add(t.clone()); // 这里要求 T 也实现 Cloneable 接口
            return copy;
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        Test<String> a = new Test<>(18, "Tom", list);
        Test<String> b = (Test<String>) a.clone();
        System.out.println(a.equals(b)); // false
    }
}
```

## 什么是协变和逆变？

协变和逆变是支持泛型的语言才有的概念。

协变是指子类对象可以赋值给父类引用，逆变是指父类对象可以赋值给子类引用。

换句话说，协变是符合里氏替换原则的，逆变是违反里氏替换原则的。

举个例子：

```java
List<? extends Number> list1 = new ArrayList<Integer>(); // 协变
List<? super Integer> list2 = new ArrayList<Number>(); // 逆变
```

在协变中，`List<? extends Number>`表示可以接受任何继承自 Number 的子类，所以`ArrayList<Integer>`可以赋值给`List<? extends Number>`。

在逆变中，`List<? super Integer>`表示可以接受任何父类为 Integer 的类，所以`ArrayList<Number>`可以赋值给`List<? super Integer>`。

## 讲讲面向对象的四大特性

面向对象的四大特性是封装、继承、多态和抽象。

1. 封装：封装是指将对象的属性和方法封装在一个类中，对外部隐藏对象的内部实现细节，只提供公共的访问接口。封装可以提高代码的可维护性和可复用性，降低代码的耦合度。
2. 继承：继承是指一个类可以继承另一个类的属性和方法，从而实现代码的复用。子类可以继承父类的属性和方法，也可以重写父类的方法，实现多态。
3. 多态：多态是指同一个方法可以根据不同的对象调用不同的实现。多态可以提高代码的灵活性和可扩展性，降低代码的耦合度。
4. 抽象：抽象是指将对象的共同特征提取出来，形成一个抽象类或接口，用来定义对象的行为和属性。抽象类不能被实例化，只能被继承，接口定义了对象的行为，实现了多态。

## 讲讲面向对象的七大原则

面向对象的七大原则是设计模式的基础，包括单一职责原则、开闭原则、里氏替换原则、依赖倒置原则、接口隔离原则、迪米特法则和合成复用原则。

1. 单一职责原则：一个类只负责一项职责，降低类的复杂度，提高类的可维护性。
2. 开闭原则：对扩展开放，对修改关闭，通过抽象和多态实现代码的可扩展性。
3. 里氏替换原则：子类可以替换父类，子类对象可以赋值给父类引用，实现代码的灵活性和可扩展性。
4. 依赖倒置原则：高层模块不应该依赖低层模块，两者都应该依赖抽象，抽象不应该依赖细节，细节应该依赖抽象。
5. 接口隔离原则：一个类对另一个类的依赖应该建立在最小的接口上，不应该依赖不需要的接口。
6. 迪米特法则：一个对象应该对其他对象有最少的了解，降低对象之间的耦合度。
7. 合成复用原则：尽量使用合成/聚合，而不是继承，通过组合的方式实现代码的复用。