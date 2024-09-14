**本模块适合 `Java后端研发（业务岗、架构岗）`、`Java安卓原生研发`等 Java 相关岗位的同学。**

## 讲讲常见的访问修饰关键字

Java 中的访问修饰符有四种，分别是`private`、`default`、`protected`和`public`。

1. `private`：私有的，只能在本类中访问，其他类无法访问。
2. `default`：默认的，只能在本类、同包类中访问，其他类无法访问。
3. `protected`：受保护的，只能在本类、同包类和子类中访问，其他类无法访问。
4. `public`：公共的，可以在任何地方访问。

## 讲讲`abstract`、`interface`关键字的作用和区别

`abstract`和`interface`关键字都是用来定义抽象类和接口的。此外，`abstract`还可以用来定义抽象方法。

1. `abstract`：抽象类是一种不能被实例化的类，只能被继承，可以包含抽象方法和非抽象方法，抽象方法没有方法体，必须在子类中实现。
2. `interface`：接口是一种不能被实例化的类，只能被实现，可以包含抽象方法和常量，抽象方法没有方法体，必须在实现类中实现。

区别如下：

1. 抽象类可以包含成员变量和非抽象方法，接口只能包含常量和抽象方法。
2. 一个类只能继承一个抽象类，但是可以实现多个接口。
3. 抽象类可以有构造方法，接口不能有构造方法。
4. 抽象类可以有访问修饰符，接口的成员变量和方法默认是`public static final`和`public abstract`。
5. 抽象类是一种模板设计模式，接口是一种规范设计模式。

Java 8 中引入了默认方法和静态方法，接口中可以包含默认方法和静态方法。

默认方法是指接口中可以包含有方法体的方法，实现类可以不实现默认方法，直接继承接口中的默认方法。静态方法是指接口中可以包含静态方法，实现类不能继承接口中的静态方法，要使用接口中的静态方法，需要通过接口名调用。

```java
public class Solution {
    static interface A {
        default void test() {
            System.out.println("test");
        }
        static void test1() {
            System.out.println("test1");
        }
    }

    static class B implements A {
    }

    static class C implements A {
        @Override
        public void test() {
            System.out.println("test in C");
        }
    }

    public static void main(String[] args) {
        B b = new B();
        b.test(); // test
        A.test1(); // test1

        C c = new C();
        c.test(); // test in C
    }
}
```

接口中的方法默认是`public abstract`，默认方法是`public default`，静态方法是`public static`，所以不需要添加额外的访问修饰符或`abstract`关键字，加了也没错。

接口还可以拥有变量，但是变量默认是`public static final`，所以不需要添加额外的访问修饰符，也不可以修改。

## 讲讲`default`关键字的作用

`default`关键字是 Java 8 中引入的新特性，用来定义接口中的默认方法。默认方法是指接口中可以包含有方法体的方法，实现类可以不实现默认方法，直接继承接口中的默认方法。

默认方法的作用是为了解决接口的升级问题，当接口中需要添加新的方法时，实现类不需要修改代码，直接继承接口中的默认方法即可。

默认方法的定义格式如下：

```java
public interface Test {
    default void test() {
        System.out.println("test");
    }
}
```

## 讲讲`final`关键字的作用

`final`关键字是 Java 中的修饰符，可以用来修饰类、方法和变量。

1. 修饰类：`final`修饰的类不能被继承，是最终的类。
2. 修饰方法：`final`修饰的方法不能被重写，是最终的方法。
3. 修饰变量：`final`修饰的变量是常量，只能被赋值一次，是最终的变量。

`final`关键字的作用是为了保护类、方法和变量，防止被继承、重写和修改。

## 讲讲`static`关键字的作用

`static`关键字是 Java 中的修饰符，可以用来修饰类、方法和变量。

1. 修饰类：`static`修饰的类是静态内部类，可以直接通过类名访问，不需要实例化。
2. 修饰方法：`static`修饰的方法是静态方法，可以直接通过类名访问，不需要实例化。
3. 修饰变量：`static`修饰的变量是静态变量，是类变量，所有实例共享，可以直接通过类名访问。

`static`关键字的作用是为了实现代码的复用和提高代码的性能，静态方法和静态变量是类级别的，不依赖于实例，可以直接通过类名访问。

## 讲讲`this`和`super`关键字的作用

`this`和`super`关键字都是 Java 中的关键字，用来引用当前对象和父类对象。

1. `this`：`this`关键字是用来引用当前对象的，可以用来引用当前对象的属性和方法，也可以用来调用当前对象的构造方法。
2. `super`：`super`关键字是用来引用父类对象的，可以用来引用父类的属性和方法，也可以用来调用父类的构造方法。

`this`和`super`关键字的作用是为了区分局部变量和成员变量、子类方法和父类方法，实现代码的复用和提高代码的可读性。

在子类的构造方法中，如果要使用`super()`和`this()`构造器，在 JDK 22 之前，必须放在第一行，否则会报错。但在 JDK 22 的预览功能中，构造器调用可以放在任意位置，但编译器会严格检查是否违反运行限制，比如在调用构造器前就访问了成员变量。

## 讲讲异常捕获相关关键字

Java 中的异常捕获相关关键字有`try`、`catch`、`finally`、`throw`和`throws`。

1. `try`：`try`关键字用来捕获异常，`try`块中包含可能抛出异常的代码。
2. `catch`：`catch`关键字用来处理异常，`catch`块中包含处理异常的代码。
3. `finally`：`finally`关键字用来释放资源，`finally`块中包含释放资源的代码，无论是否发生异常，`finally`块中的代码都会执行。
4. `throw`：`throw`关键字用来抛出异常，`throw`关键字后面跟一个异常对象。
5. `throws`：`throws`关键字用来声明方法可能抛出的异常，`throws`关键字后面跟一个异常类。

异常捕获的原则是捕获异常应该尽早，处理异常应该尽轻，释放资源应该尽快。

## 下面函数的返回值究竟是什么？

```java
public int test() {
    int i = 0;
    try {
        i = 1;
        return i;
    } catch (Exception e) {
        i = 2;
        return i;
    } finally {
        i = 3;
    }
}
```

返回值是 1。`try`块中的`return`语句会先执行，然后`finally`块中的`i = 3`会执行，但是不会影响`return`语句的返回值。

## 下面函数的返回值究竟是什么？

```java
public int test() {
    try {
        return 1;
    } catch (Exception e) {
        return 2;
    } finally {
        return 3;
    }
}
```

返回值是 3。`finally`块中的`return`语句会覆盖`try`块中的`return`语句。

## 说出几个常见的异常类和具体含义

Java 中的异常类有很多，常见的异常类有`NullPointerException`、`ArrayIndexOutOfBoundsException`、`ClassCastException`、`ArithmeticException`、`NumberFormatException`、`FileNotFoundException`、`IOException`、`SQLException`等。

1. `NullPointerException`：空指针异常，当一个对象为`null`时调用它的方法或访问它的属性会抛出空指针异常。
2. `ArrayIndexOutOfBoundsException`：数组下标越界异常，当访问数组的索引超出数组的范围时会抛出数组下标越界异常。
3. `ClassCastException`：类型转换异常，当一个对象不能被强制转换为另一个类型时会抛出类型转换异常。
4. `ArithmeticException`：算术异常，当一个数除以 0 时会抛出算术异常。
5. `NumberFormatException`：数字格式异常，当一个字符串不能被解析为数字时会抛出数字格式异常。
6. `FileNotFoundException`：文件未找到异常，当一个文件不存在时会抛出文件未找到异常。
7. `IOException`：输入输出异常，当一个输入输出操作失败时会抛出输入输出异常。
8. `SQLException`：SQL 异常，当一个 SQL 操作失败时会抛出 SQL 异常。
9. `NoSuchMethodException`：方法未找到异常，当一个方法不存在时会抛出方法未找到异常。
10. `java.lang.OutofMemoryError`：内存溢出异常，当内存不足时会抛出内存溢出异常。
11. `java.lang.StackOverflowError`：栈溢出异常，当栈空间不足时会抛出栈溢出异常。
12. `java.lang.ClassNotFoundException`：类未找到异常，当一个类不存在时会抛出类未找到异常。