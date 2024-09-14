**本模块适合 `Java后端研发（业务岗、架构岗）`等 Java 相关岗位的同学。非后端相关岗位的同学仅做了解即可**

## 讲讲 Java 四种实现多线程的方法

Java 中实现多线程的方法有四种，分别是继承`Thread`类、实现`Runnable`接口、实现`Callable`接口和使用线程池。

1. 继承`Thread`类：继承`Thread`类，重写`run`方法，创建线程对象，调用`start`方法启动线程。

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // 线程执行的代码
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
    }
}
```

缺点是 Java 是单继承的，继承`Thread`类后无法继承其他类。

2. 实现`Runnable`接口：实现`Runnable`接口，重写`run`方法，创建`Thread`对象，将`Runnable`对象作为参数传递给`Thread`对象，调用`start`方法启动线程。

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 线程执行的代码
    }
}

public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}
```

优点是可以继承其他类，实现接口。

3. 实现`Callable`接口：实现`Callable`接口，重写`call`方法，创建`FutureTask`对象，将`Callable`对象作为参数传递给`FutureTask`对象，创建`Thread`对象，将`FutureTask`对象作为参数传递给`Thread`对象，调用`start`方法启动线程。

```java
public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        // 线程执行的代码
        return 1;
    }
}

public class Main {
    public static void main(String[] args) {
        MyCallable myCallable = new MyCallable();
        FutureTask<Integer> futureTask = new FutureTask<>(myCallable);
        Thread thread = new Thread(futureTask);
        thread.start();
        try {
            Integer result = futureTask.get(); // 可以返回数据，实际上可以实现异步回调
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

4. 使用线程池：使用`ExecutorService`接口和`ThreadPoolExecutor`类，创建线程池，提交任务，执行任务。

```java
public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        executorService.execute(() -> {
            // 线程执行的代码
        });
        executorService.shutdown();
    }
}
```

线程池本质其实是一种对象池，可以重复利用线程，减少线程创建和销毁的开销。

## 讲讲线程池的关键属性

线程池是一种特殊的对象池，用来管理线程的创建、销毁和复用，可以提高线程的利用率和性能。

线程池的关键属性如下：

1. `corePoolSize`：核心线程数，线程池中保持存活的线程数量，即使线程处于空闲状态也不会被销毁。
2. `maximumPoolSize`：最大线程数，线程池中允许的最大线程数量，当任务队列满了且核心线程数已满时，会创建新的线程。
3. `keepAliveTime`：线程空闲时间，当线程空闲时间超过该值时，会被销毁。
4. `unit`：时间单位，用来设置`keepAliveTime`的时间单位。
5. `workQueue`：任务队列，用来存储等待执行的任务，有`SynchronousQueue`、`LinkedBlockingQueue`、`ArrayBlockingQueue`等实现类。
6. `threadFactory`：线程工厂，用来创建新的线程。
7. `handler`：拒绝策略，用来处理任务队列满了且线程池已满时的情况。

## 讲讲线程池的拒绝策略

线程池的拒绝策略是用来处理任务队列满了且线程池已满时的情况，有以下几种策略：

1. `AbortPolicy`：默认策略，抛出`RejectedExecutionException`异常。
2. `CallerRunsPolicy`：调用线程执行任务。
3. `DiscardPolicy`：丢弃任务，不抛出异常。
4. `DiscardOldestPolicy`：丢弃队列中最旧的任务，将新任务加入队列。（本质算法是 FIFO）
5. 自定义策略：实现`RejectedExecutionHandler`接口，自定义拒绝策略。

## 讲讲常见的线程池有哪些

Java 中常见的线程池有以下几种：

1. `FixedThreadPool`：固定大小线程池，核心线程数和最大线程数相等，适用于执行长期的任务。
 
```java
ExecutorService executorService = Executors.newFixedThreadPool(10);

public static ExecutorService newFixedThreadPool(int nThreads) {
    return new ThreadPoolExecutor(nThreads, nThreads, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()); // 默认创建了一个链表阻塞队列
}
```

2. `CachedThreadPool`：缓存线程池，核心线程数为 0，最大线程数为`Integer.MAX_VALUE`，适用于执行大量短期的任务。
 
```java
ExecutorService executorService = Executors.newCachedThreadPool();

public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS, new SynchronousQueue<Runnable>());// 默认创建了一个同步队列
}
```

3. `SingleThreadPool`：单线程线程池，核心线程数和最大线程数为 1，适用于执行顺序执行的任务。

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();

public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService(new ThreadPoolExecutor(1, 1, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>()));
}
```

可以理解成会弱化为单线程串行执行，不释放锁，适用于顺序执行的任务。

4. `ScheduledThreadPool`：定时线程池，可以定时执行任务。

```java
ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(10);

public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}
```

5. `WorkStealingPool`：工作窃取线程池，适用于执行大量独立任务。（了解即可，是 JDK 8 新增的线程池）

```java
ExecutorService executorService = Executors.newWorkStealingPool();

public static ExecutorService newWorkStealingPool() {
    return new ForkJoinPool(Runtime.getRuntime().availableProcessors(), ForkJoinPool.defaultForkJoinWorkerThreadFactory, null, true);
}
``` 

## 总结下 Java 当中有哪几种锁的划分类型

从底层实现方面来讲，Java 中真正的锁实现只有隐式锁和显式锁两种。

1. 隐式锁：隐式锁是指 Java 中的`synchronized`关键字，是一种悲观锁，通过`monitorenter`和`monitorexit`指令来实现，是 JVM 层面的锁，对用户不可见。

如果修饰的是具体的对象，锁的是对象，如果修饰的是成员方法，锁的是当前对象`this`，如果修饰的是静态方法，锁的是当前类的`Class`对象。

例如：

```java
public class MyObject {
    // 修饰成员方法
    public synchronized void method() {
        // 临界区
    }

    public void method2(Object lock) {
        // 修饰对象
        synchronized (lock) {
            // 临界区
        }
    }

    // 修饰静态方法
    public static synchronized void method3() {
        // 临界区
    }
}
```

2. 显式锁：显式锁是指 Java 中的`Lock`接口，以及各种实现类，如`ReentrantLock`、`ReadWriteLock`、`StampedLock`等，其中包括有悲观锁和乐观锁，如`ReentrantLock`、`ReadWriteLock`是悲观锁，`StampedLock`是乐观锁。
 
显式锁是一种更加灵活的锁，可以实现更多的功能，如可重入锁、读锁、写锁、公平锁、自旋锁、分段锁等。

例如：

```java
public class MyObject {
    private Lock lock = new ReentrantLock();

    public void method() {
        lock.lock();
        try {
            // 临界区
        } finally {
            lock.unlock();
        }
    }
}
```


实际上，Lock 的实现基本都是通过聚合了一个同步器 AQS（AbstractQueuedSynchronizer）来实现的，AQS 是一种基于 CLH 队列的锁实现，是一种非常高效的锁实现。其目的是为了保证锁的可重入性和线程安全性，底层算法必然是 FIFO 队列。

AQS 的主要使用方式是继承，通过继承 AQS，实现自己的同步器，然后通过`Lock`接口的实现类来使用。在使用过程中，对同步状态进行更改主要有如下几个方法：

1. `protected final int getState()`：获取同步状态。
2. `protected final void setState(int newState)`：设置同步状态。
3. `protected final boolean compareAndSetState(int expect, int update)`：CAS 设置同步状态。

从特性方面来讲，分为乐观锁和悲观锁。

1. 乐观锁：乐观锁是一种乐观思想，认为读操作远远多于写操作，所以读操作不加锁，只在写操作时加锁，例如`CAS`操作。实际上业务中最常见的乐观锁设计反而是在数据库层面中，通过版本号或时间戳来实现。
2. 悲观锁：悲观锁是一种悲观思想，认为写操作远远多于读操作，所以读操作和写操作都加锁，例如`synchronized`关键字和`ReentrantLock`类。

按照锁的顺序来讲，分为公平锁和非公平锁。

1. 公平锁：公平锁是指按照线程请求的顺序来获取锁，先到先得，不会产生饥饿现象。如`ReentrantLock`的构造方法可以传入`true`来创建公平锁。
2. 非公平锁：非公平锁是指不按照线程请求的顺序来获取锁，可能会产生饥饿现象。如`syncronized`关键字就是无法指定公平性的。
 
按照持有性来讲，分为独占锁和共享锁。

1. 独占锁（排他锁）：独占锁是指在同一时刻只能有一个线程持有锁，其他线程必须等待。如`synchronized`关键字和`ReentrantLock`类。
2. 共享锁：共享锁是指在同一时刻可以有多个线程持有锁，适用于读多写少的场景。如`ReadWriteLock`接口和`ReentrantReadWriteLock`类的读锁（写锁是独占锁）。

但要注意，独占锁和共享锁更多时候是一种广义的概念，具体实现还是互斥锁和读写锁。

## 简单对比下显式锁和隐式锁，以及其优缺点

显式锁和隐式锁是 Java 中的两种锁实现，各有优缺点。

1. 显式锁（`Lock`接口）：
 - 优点：显式锁是一种更加灵活的锁，可以实现更多的功能，如可重入锁、读锁、写锁、公平锁、自旋锁、分段锁等。
 - 缺点：显式锁需要手动加锁和解锁，容易出现死锁、忘记解锁等问题，使用复杂，代码量较多。

2. 隐式锁（`synchronized`关键字）：
 - 优点：隐式锁是一种简单易用的锁，不需要手动加锁和解锁，JVM 会自动帮助加锁和解锁，使用方便，没有内存泄漏的风险。
 - 缺点：隐式锁功能较为简单，只能实现基本的加锁和解锁，不支持可重入锁、读锁、写锁、公平锁等功能，不可以跨方法调用，不可以设置等待时间不能监控锁状态。

总的来说，显式锁更加灵活，功能更加丰寶，但使用复杂，代码量较多；隐式锁简单易用，但功能较为简单，只能实现基本的加锁和解锁。

## 讲讲什么是`CAS`操作

`CAS`（Compare And Swap）操作是一种乐观锁技术，是一种无锁算法，用来解决多线程并发访问共享变量的问题。需要注意到是，这不是一个 Java 级别的锁，而是一种硬件级别的原子操作。

`CAS`操作的原理是先比较当前内存值和期望值是否相等，如果相等则更新为新值，否则不更新。

在 Java 的`java.util.concurrent.atomic`包中提供了一些原子类，如`AtomicInteger`、`AtomicLong`、`AtomicReference`等，这些类底层就是通过`CAS`操作来保证线程安全的。

`CAS`操作的步骤如下：

1. 读取内存值。
2. 比较内存值和期望值是否相等。
3. 如果相等，则更新内存值为新值。
4. 如果不相等，则不更新内存值。

`CAS`操作是一种乐观锁技有，不需要加锁，可以提高并发性能。但是`CAS`操作有三大问题：

1. ABA 问题：如果一个值原来是 A，后来被改成了 B，又被改回了 A，那么使用`CAS`进行检查时会发现没有变化，但实际上已经发生了变化。
2. 循环时间长开销大：如果一直检查到变量没有发生变化，会一直循环检查，会消耗大量的 CPU 时间。
3. 只能保证一个共享变量的原子操作：`CAS`只能保证一个共享变量的原子操作，对于多个共享变量操作，需要加锁保证原子性。

## 讲讲`volatile`关键字的作用

很多人说`volatile`关键字是 Java 中的轻量级锁，这个说法是不准确的。`volatile`关键字是一种内存屏障，用来保证变量的可见性和有序性，不是一种锁。

`volatile`关键字是 Java 中的修饰符，用来修饰变量，保证变量的可见性和有序性。

`volatile`关键字的作用是为了解决多线程并发访问共享变量的问题，保证变量的可见性和有序性。

`volatile`关键字的特点如下：

1. 可见性：`volatile`关键字保证变量的修改对其他线程是可见的，一个线程修改了`volatile`变量的值，其他线程可以立即看到修改后的值。
2. 有序性：`volatile`关键字保证变量的读写操作是有序的，一个线程写入了`volatile`变量的值，其他线程可以立即看到写入的值。

`volatile`关键字的使用场景是在多线程并发访问共享变量的情况下，保证变量的可见性和有序性。

其具体实现涉及到了 Java 内存模型（JMM）的相关知识。JMM 中规定，所有共享变量都存储在主内存中，每个线程都有自己的工作内存，线程对共享变量的操作都是在工作内存中进行的，线程之间的共享变量不可见。

为了保障可见性，除了使用`synchronized`关键字外，还可以使用`volatile`关键字。`volatile`关键字修饰的变量在被进行读写操作时，会直接越过工作内存，在主内存中进行操作，从而保证了变量的可见性。

但设计同一块主内存操作时，常常需要确保缓存数据一致性问题，此时遵循了各处理器的缓存一致性协议，如 MSI、MESI、MOSI 等。

其中最重要的一点就是禁止指令重排序。一般情况下，为了提高性能，编译器和处理器会对指令进行重排序，但是在多线程环境下，这种重排序可能会导致线程安全问题。`volatile`关键字可以禁止指令重排序，保证了变量的有序性。我们用双重校验锁来实现单例模式时，就需要用到`volatile`关键字来保证线程安全。
