**本模块是公共类课程，适合绝大部分计算机岗位。由于 Java 受众最广且易读性强，本模块示例代码使用 Java 编写，其他语言也可参考学习。**

## 讲讲常见的设计模式

常见的设计模式主要有以下几种：

1. 创建型模式：单例模式、工厂模式、抽象工厂模式、建造者模式、原型模式。
2. 结构型模式：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
3. 行为型模式：策略模式、模板方法模式、观察者模式、迭代器模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

设计模式是为了提高代码的可读性、可维护性、可扩展性，根据不同的需求选择合适的设计模式。

## 讲讲单例模式的实现方式（只需要讲懒汉式和饿汉式）

单例模式是一种创建型设计模式，主要有以下两种实现方式：

1. 懒汉式：懒汉式是在第一次调用时创建实例。

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

2. 饿汉式：饿汉式是在类加载时创建实例。

```java
public class Singleton {
    private static Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

单例模式是为了保证一个类只有一个实例，提高代码的可读性、可维护性、可扩展性，根据不同的需求选择合适的实现方式。

至于双重校验锁、静态内部类、枚举（只有 Java、Python 这种枚举实例是引用类型数据的情况才能用）等实现方式，可以根据需要进行了解，但面试大概率不会问，特别是枚举实现实际上是旁门左道，踩在编程语言的特性上歪打正着做文章，不要听八股文瞎扯。笔者写了一篇文章专门研究过枚举实现单例的问题，有兴趣的可以看看：[从源码角度告诉你为什么 Java 和 Python 可以用枚举类实现单例模式](https://juejin.cn/post/7398709913570820131)

## 什么是工厂模式？有哪些实现方式？

工厂模式是一种创建型设计模式，主要有以下几种实现方式：

1. 简单工厂模式：简单工厂模式是通过一个工厂类来创建实例，根据不同的参数返回不同的实例。

```java
public class SimpleFactory {
    public static Product createProduct(String type) {
        if ("A".equals(type)) {
            return new ProductA();
        } else if ("B".equals(type)) {
            return new ProductB();
        }
        return null;
    }
}
```

2. 工厂方法模式：工厂方法模式是通过一个工厂接口来创建实例，每个实例对应一个工厂类。

```java
public interface Factory {
    Product createProduct();
}

public class FactoryA implements Factory {
    @Override
    public Product createProduct() {
        return new ProductA();
    }
}

public class FactoryB implements Factory {
    @Override
    public Product createProduct() {
        return new ProductB();
    }
}
```

3. 抽象工厂模式：抽象工厂模式是通过一个抽象工厂接口来创建实例，每个实例对应一个工厂类，每个工厂类对应多个实例。

```java
public interface AbstractFactory {
    ProductA createProductA();
    ProductB createProductB();
}

public class FactoryA implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ProductA();
    }

    @Override
    public ProductB createProductB() {
        return new ProductB();
    }
}

public class FactoryB implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ProductA();
    }

    @Override
    public ProductB createProductB() {
        return new ProductB();
    }
}
```

工厂模式是为了解耦对象的创建和使用，提高代码的可读性、可维护性、可扩展性，根据不同的需求选择合适的实现方式。

此外，SpringBoot 中一般用实现`BeanFactoryAware`接口的方式来实现工厂模式，因为 SpringBoot 框架中，绝大部分类的实例化都由框架完成。

```java
public class ProductFactory implements BeanFactoryAware {
    private BeanFactory beanFactory;

    public Product createProduct(String type) {
        return beanFactory.getBean(type, Product.class);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }
}
```

## 什么是适配器模式？

适配器模式是一种结构型设计模式，主要是为了解决接口不兼容的问题，提高代码的可读性、可维护性、可扩展性。

```java
// 第一步：定义接口
public interface MediaPlayer {
    void play(String audioType, String fileName);
}

public interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// 第二步：实现接口
public class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file. Name: " + fileName);
    }

    @Override
    public void playMp4(String fileName) {
        // do nothing
    }
}

public class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        // do nothing
    }

    @Override
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file. Name: " + fileName);
    }
}

// 第三步：实现适配器
public class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedMediaPlayer;

    public MediaAdapter(String audioType) {
        if ("vlc".equalsIgnoreCase(audioType)) {
            advancedMediaPlayer = new VlcPlayer();
        } else if ("mp4".equalsIgnoreCase(audioType)) {
            advancedMediaPlayer = new Mp4Player();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if ("vlc".equalsIgnoreCase(audioType)) {
            advancedMediaPlayer.playVlc(fileName);
        } else if ("mp4".equalsIgnoreCase(audioType)) {
            advancedMediaPlayer.playMp4(fileName);
        }
    }
}

// 第四步：使用适配器
public class AudioPlayer implements MediaPlayer {
    private MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        if ("mp3".equalsIgnoreCase(audioType)) {
            System.out.println("Playing mp3 file. Name: " + fileName);
        } else if ("vlc".equalsIgnoreCase(audioType) || "mp4".equalsIgnoreCase(audioType)) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media. " + audioType + " format not supported");
        }
    }
}
```

## 讲讲代理模式，以及和适配器模式的区别

代理模式是一种结构型设计模式，主要是为了控制对对象的访问，提高代码的可读性、可维护性、可扩展性。

```java
// 第一步：定义接口
public interface Image {
    void display();
}

// 第二步：实现接口
public class RealImage implements Image {
    private String fileName;

    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk(fileName);
    }

    @Override
    public void display() {
        System.out.println("Displaying " + fileName);
    }

    private void loadFromDisk(String fileName) {
        System.out.println("Loading " + fileName);
    }
}

// 第三步：实现代理
public class ProxyImage implements Image {
    private RealImage realImage;
    private String fileName;

    public ProxyImage(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(fileName);
        }
        realImage.display();
    }
}

// 第四步：使用代理
public class ProxyPatternDemo {
    public static void main(String[] args) {
        Image image = new ProxyImage("test.jpg");
        image.display();
    }
}
```

代理模式和适配器模式的区别主要有以下几点：

1. 目的不同：代理模式是为了控制对对象的访问，适配器模式是为了解决接口不兼容的问题。
2. 实现方式不同：代理模式是通过代理类来控制对对象的访问，适配器模式是通过适配器类来解决接口不兼容的问题。
3. 使用场景不同：代理模式适合控制对对象的访问，适配器模式适合解决接口不兼容的问题。

## 讲讲装饰器模式，以及和代理模式、适配器模式的区别

装饰器模式是一种结构型设计模式，主要是为了动态地给对象添加新的功能，提高代码的可读性、可维护性、可扩展性。

```java
// 第一步：定义接口
public interface Shape {
    void draw();
}

// 第二步：实现接口
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Shape: Circle");
    }
}

// 第三步：实现装饰器
public abstract class ShapeDecorator implements Shape {
    protected Shape shape;

    public ShapeDecorator(Shape shape) {
        this.shape = shape;
    }

    @Override
    public void draw() {
        shape.draw();
    }
}

public class RedShapeDecorator extends ShapeDecorator {
    public RedShapeDecorator(Shape shape) {
        super(shape);
    }

    @Override
    public void draw() {
        shape.draw();
        setRedBorder(shape);
    }

    private void setRedBorder(Shape shape) {
        System.out.println("Border Color: Red");
    }
}

// 第四步：使用装饰器
public class DecoratorPatternDemo {
    public static void main(String[] args) {
        Shape circle = new Circle();
        Shape redCircle = new RedShapeDecorator(new Circle());
        Shape redRectangle = new RedShapeDecorator(new Rectangle());
        circle.draw();
        redCircle.draw();
        redRectangle.draw();
    }
}
```

装饰器模式和代理模式、适配器模式的区别主要有以下几点：

1. 目的不同：装饰器模式是为了动态地给对象添加新的功能，代理模式是为了控制对对象的访问，适配器模式是为了解决接口不兼容的问题。
2. 实现方式不同：装饰器模式是通过装饰器类来动态地给对象添加新的功能，代理模式是通过代理类来控制对对象的访问，适配器模式是通过适配器类来解决接口不兼容的问题。
3. 使用场景不同：装饰器模式适合动态地给对象添加新的功能，代理模式适合控制对对象的访问，适配器模式适合解决接口不兼容的问题。

## 什么是外观模式？

外观模式是一种结构型设计模式，主要是为了提供一个统一的接口，隐藏系统的复杂性，提高代码的可读性、可维护性、可扩展性。有些地方也称之为门面模式，这是机翻，听起来高大上但是面试官听不懂，最好还是叫外观模式。

```java
// 第一步：定义接口
public interface Shape {
    void draw();
}

public interface Color {
    void fill();
}

// 第二步：实现接口
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Shape: Circle");
    }
}

public class Red implements Color {
    @Override
    public void fill() {
        System.out.println("Color: Red");
    }
}

// 第三步：实现外观
public class ShapeMaker {
    private Shape circle;
    private Color red;

    public ShapeMaker() {
        circle = new Circle();
        red = new Red();
    }

    public void drawCircle() {
        circle.draw();
    }

    public void fillRed() {
        red.fill();
    }
}

// 第四步：使用外观
public class FacadePatternDemo {
    public static void main(String[] args) {
        ShapeMaker shapeMaker = new ShapeMaker();
        shapeMaker.drawCircle();
        shapeMaker.fillRed();
    }
}
```

## 什么是策略模式？

策略模式是一种行为型设计模式，主要是为了定义一系列算法，将每个算法封装起来，提供一个统一的接口，提高代码的可读性、可维护性、可扩展性。

```java
// 第一步：定义接口
public interface Strategy {
    int doOperation(int num1, int num2);
}

// 第二步：实现接口
public class OperationAdd implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 + num2;
    }
}

public class OperationSubtract implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 - num2;
    }
}

public class OperationMultiply implements Strategy {
    @Override
    public int doOperation(int num1, int num2) {
        return num1 * num2;
    }
}

// 第三步：使用策略
public class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public int executeStrategy(int num1, int num2) {
        return strategy.doOperation(num1, num2);
    }
}

// 第四步：使用策略
public class StrategyPatternDemo {
    public static void main(String[] args) {
        Context context = new Context(new OperationAdd());
        System.out.println("10 + 5 = " + context.executeStrategy(10, 5));
        context = new Context(new OperationSubtract());
        System.out.println("10 - 5 = " + context.executeStrategy(10, 5));
        context = new Context(new OperationMultiply());
        System.out.println("10 * 5 = " + context.executeStrategy(10, 5));
    }
}
```

## 什么是观察者模式？

观察者模式是一种行为型设计模式，主要是为了定义一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会收到通知，提高代码的可读性、可维护性、可扩展性。

值得一提的是，我们在消息队列、事件总线（事件中心）的使用中常常提到的发布订阅模式，就是观察者模式的一种特殊实现。

```java
// 第一步：定义接口
public abstract class Observer {
    protected Subject subject;
    public abstract void update();
}

public class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }
}

// 第二步：实现接口
public class BinaryObserver extends Observer {
    public BinaryObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Binary String: " + Integer.toBinaryString(subject.getState()));
    }
}

public class OctalObserver extends Observer {
    public OctalObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Octal String: " + Integer.toOctalString(subject.getState()));
    }
}

public class HexaObserver extends Observer {
    public HexaObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Hex String: " + Integer.toHexString(subject.getState()).toUpperCase());
    }
}

// 第三步：使用观察者
public class ObserverPatternDemo {
    public static void main(String[] args) {
        Subject subject = new Subject();
        new BinaryObserver(subject);
        new OctalObserver(subject);
        new HexaObserver(subject);
        System.out.println("First state change: 15");
        subject.setState(15);
        System.out.println("Second state change: 10");
        subject.setState(10);
    }
}
```