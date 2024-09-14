**本模块适合 `Java后端研发（业务岗、架构岗）`、`Java安卓原生研发`等 Java 相关岗位的同学。但线程安全相关内容非后端相关岗位的同学仅做了解即可**

## 讲讲 List 接口类常用 API

`List`接口是 Java 中的有序集合类，继承自`Collection`接口，提供了一些常用的方法 API，如下：

1. `public boolean add(E e)`：向列表中添加元素。
2. `public void add(int index, E element)`：在列表中指定位置添加元素。
3. `public boolean addAll(Collection<? extends E> c)`：向列表中添加集合。
4. `public boolean addAll(int index, Collection<? extends E> c)`：在列表中指定位置添加集合。
5. `public void clear()`：清空列表。
6. `public boolean contains(Object o)`：判断列表中是否包含指定元素。
7. `public boolean containsAll(Collection<?> c)`：判断列表中是否包含指定集合。
8. `public boolean equals(Object o)`：判断列表是否相等。
9. `public E get(int index)`：获取列表中指定位置的元素。
10. `public int hashCode()`：返回列表的哈希码值。
11. `public int indexOf(Object o)`：返回列表中指定元素的位置。
12. `public boolean isEmpty()`：判断列表是否为空。
13. `public Iterator<E> iterator()`：返回列表的迭代器。
14. `public int lastIndexOf(Object o)`：返回列表中指定元素的最后一个位置。
15. `public ListIterator<E> listIterator()`：返回列表的列表迭代器。
16. `public ListIterator<E> listIterator(int index)`：返回列表的列表迭代器。
17. `public E remove(int index)`：移除列表中指定位置的元素。
18. `public boolean remove(Object o)`：移除列表中指定元素。
19. `public boolean removeAll(Collection<?> c)`：移除列表中指定集合。
20. `public boolean retainAll(Collection<?> c)`：保留列表中指定集合。
21. `public E set(int index, E element)`：设置列表中指定位置的元素。

## 讲讲 Set 接口类常用 API

`Set`接口是 Java 中的无序集合类，继承自`Collection`接口，提供了一些常用的方法 API，如下：

1. `public boolean add(E e)`：向集合中添加元素。
2. `public boolean addAll(Collection<? extends E> c)`：向集合中添加集合。
3. `public void clear()`：清空集合。
4. `public boolean contains(Object o)`：判断集合中是否包含指定元素。
5. `public boolean containsAll(Collection<?> c)`：判断集合中是否包含指定集合。
6. `public boolean equals(Object o)`：判断集合是否相等。
7. `public int hashCode()`：返回集合的哈希码值。
8. `public boolean isEmpty()`：判断集合是否为空。
9. `public Iterator<E> iterator()`：返回集合的迭代器。
10. `public boolean remove(Object o)`：移除集合中指定元素。
11. `public boolean removeAll(Collection<?> c)`：移除集合中指定集合。
12. `public boolean retainAll(Collection<?> c)`：保留集合中指定集合。

## 讲讲 Map 接口类常用 API

`Map`接口是 Java 中的映射类，提供了一些常用的方法 API，如下：

1. `public void clear()`：清空映射。
2. `public boolean containsKey(Object key)`：判断映射中是否包含指定键。
3. `public boolean containsValue(Object value)`：判断映射中是否包含指定值。
4. `public Set<Map.Entry<K, V>> entrySet()`：返回映射的键值对集合。
5. `public boolean equals(Object o)`：判断映射是否相等。
6. `public V get(Object key)`：获取映射中指定键的值。
7. `public int hashCode()`：返回映射的哈希码值。
8. `public boolean isEmpty()`：判断映射是否为空。
9. `public Set<K> keySet()`：返回映射的键集合。
10. `public V put(K key, V value)`：向映射中添加键值对。
11. `public void putAll(Map<? extends K, ? extends V> m)`：向映射中添加映射。
12. `public V remove(Object key)`：移除映射中指定键的值。
13. `public int size()`：返回映射的大小。
14. `public Collection<V> values()`：返回映射的值集合。

## 讲讲`Deque`接口类常用 API

`Deque`接口是 Java 中的双端队列类，继承自`Queue`接口，提供了一些常用的方法 API，如下：

1. `public void addFirst(E e)`：向队列头部添加元素。
2. `public void addLast(E e)`：向队列尾部添加元素。
3. `public boolean offerFirst(E e)`：向队列头部添加元素。
4. `public boolean offerLast(E e)`：向队列尾部添加元素。
5. `public E removeFirst()`：移除队列头部的元素。
6. `public E removeLast()`：移除队列尾部的元素。
7. `public E pollFirst()`：移除队列头部的元素。
8. `public E pollLast()`：移除队列尾部的元素。
9. `public E getFirst()`：获取队列头部的元素。
10. `public E getLast()`：获取队列尾部的元素。
11. `public E peekFirst()`：获取队列头部的元素。
12. `public E peekLast()`：获取队列尾部的元素。

## 讲讲一个元素存储进`HashMap`时经历了哪些步骤？

一个元素存储进`HashMap`时经历了以下步骤：

1. 计算键的哈希码值：调用键的`hashCode`方法计算键的哈希码值。如果用户没有重写`hashCode`方法，则默认返回对象的内存地址。
2. 计算哈希值：为了减少哈希冲突，调用扰动函数对哈希码值进行扰动，然后计算哈希值。具体是返回`(key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)`。
3. 计算索引：通过哈希值和数组长度计算索引，具体是返回`hash & (length - 1)`。
4. 存储元素：将键值对存储到索引位置，如果索引位置已经有元素，则存储为链表，当链表长度大于 8 时，链表转换为红黑树，当红黑树节点小于 6 时，红黑树转换为链表。

## 讲讲`Collection`和`Map`的区别

`Collection`和`Map`是 Java 中的容器类，它们之间的区别如下：

1. `Collection`：`Collection`是集合类，用来存储一组对象，是一个接口，继承自`Iterable`接口，包括`List`、`Set`和`Queue`等子接口。
2. `Map`：`Map`是映射类，用来存储键值对，是一个接口，包括`HashMap`、`TreeMap`和`LinkedHashMap`等实现类。

`Collection`和`Map`的区别是`Collection`是用来存储一组对象的，`Map`是用来存储键值对的。

## 讲讲`List`和`Set`的区别

`List`和`Set`是 Java 中的集合类，它们之间的区别如下：

1. `List`：`List`是有序的集合类，可以存储重复的元素，可以通过索引访问元素，包括`ArrayList`、`LinkedList`和`Vector`等实现类。
2. `Set`：`Set`是无序的集合类，不可以存储重复的元素，不可以通过索引访问元素，包括`HashSet`、`TreeSet`和`LinkedHashSet`等实现类。

`List`和`Set`的区别是`List`是有序的，可以存储重复的元素，可以通过索引访问元素，`Set`是无序的，不可以存储重复的元素，不可以通过索引访问元素。

## 讲讲`ArrayList`和`LinkedList`的区别

`ArrayList`和`LinkedList`是 Java 中的集合类，它们之间的区别如下：

1. `ArrayList`：`ArrayList`是基于数组实现的集合类，支持随机访问，插入和删除元素效率较低，适合查询操作。创建时初始化一个长度为 10 的数组，当数组容量不足时会进行扩容，通常是将容量翻倍。（要和其他的集合类区分开，很多默认长度是 2 的幂次方，这样可以通过位运算来代替取模运算，提高效率）
2. `LinkedList`：`LinkedList`是基于链表实现的集合类，支持插入和删除元素效率较高，适合增删操作。

可以说，一般情况下，`ArrayList`从头插入和删除元素效率较低，因为需要移动大量元素。

但从中间位置开始，由于`LinkedList`需要遍历到中间位置，所以`ArrayList`效率较高。

对于结尾位置，`ArrayList`和`LinkedList`效率都很高。

具体用表格来表示：

| 操作     | `ArrayList` | `LinkedList` |
| -------- | ----------- | ------------ |
| 头插入   | 极慢        | 极快         |
| 中间插入 | 较慢        | 极慢         |
| 尾插入   | 极快        | 极快         |
| 头删除   | 极慢        | 极快         |
| 中间删除 | 较慢        | 极慢         |
| 尾删除   | 极快        | 极快         |
| 查询     | 快          | 慢           |

## 讲讲为什么栈推荐用`Deque`而不是`Stack`

`Stack`是 Java 中的栈类，继承自`Vector`类，但是`Stack`是线程安全的，效率较低，不推荐使用。

`Deque`是 Java 中的双端队列类，继承自`Queue`接口，可以实现栈的功能，是线程不安全的，效率较高，推荐使用。

`Deque`是一个双端队列，可以实现栈的功能，包括`ArrayDeque`和`LinkedList`等实现类。

## 讲讲`HashMap`和`Hashtable`的区别

`HashMap`和`Hashtable`是 Java 中的映射类，它们之间的区别如下：

1. `HashMap`：`HashMap`是非线程安全的映射类，可以存储`null`键和`null`值，效率较高，是`Hashtable`的替代品。
2. `Hashtable`：`Hashtable`是线程安全的映射类，不可以存储`null`键和`null`值，效率较低，不推荐使用。

`HashMap`和`Hashtable`的区别是`HashMap`是非线程安全的，可以存储`null`键和`null`值，效率较高，`Hashtable`是线程安全的，不可以存储`null`键和`null`值，效率较低。

## 为什么`HashMap`线程不安全？

`HashMap`是非线程安全的，因为`HashMap`的`put`方法不是原子操作，当多个线程同时调用`put`方法时，可能会导致数据丢失或覆盖。

`HashMap`的`put`方法是通过计算键的哈希码值和散列函数来确定键值对的位置，如果两个键的哈希码值相同，会发生哈希冲突，导致数据丢失或覆盖。

此外，在 JDK 7 当中，`HashMap`的`get`操作可能因为`resize`操作采用的是头插法而导致链表逆序，从而导致死循环。

为了解决`HashMap`的线程安全问题，可以使用`ConcurrentHashMap`类，它是线程安全的映射类，通过分段锁和 CAS 操作来保证线程安全。

## 讲讲 JDK 7 和 8 中`HashMap`底层实现的区别

在 JDK 7 中，`HashMap`的底层实现是数组 + 链表（链地址法），初始化时创建一个长度为 16 的数组。

插入元素时，`HashMap`会根据键的哈希值计算出数组索引，如果该索引位置已经有元素，则将新元素插入到链表的头部。

当`HashMap`中的元素数量超过阈值（容量 * 负载因子，负载因子默认是 0.75）时，会进行扩容，通常是将容量翻倍。扩容时需要重新计算所有元素的哈希值并重新分配到新的数组中。扩容算法采用的是头插法，多线程情况下可能会导致链表逆序，造成死循环。

在 JDK 8 中，`HashMap`默认仍然使用数组 + 链表的方式，但是当链表长度超过 8 时，会将链表转换为红黑树，以提高查询效率。初始化与 JDK 7 一致。

插入元素时，`HashMap`会根据键的哈希值计算出数组索引。如果该索引位置已经有元素且链表长度超过阈值，则将链表转换为红黑树。

扩容条件与 JDK 7 一致，但是在扩容时，红黑树结构不会变化，只会重新计算哈希值并重新分配到新的数组中。算法采用的是尾插法，不会造成链表逆序。（本质是红黑树带来的优化）

## 详细讲讲为什么头插法在多线程状态下会造成死循环

假设现在有线程 1 和线程 2，目前桶数为 2 的哈希表中，索引为 1 的位置有一个链表，其中元素 A。

现在线程 1 插入 B 元素，紧接在 A 元素后面，此时触发扩容机制，`resize`方法调用了`transfer`方法，其中有`Entry[] src`变量接收了原哈希表。在循环遍历中，此时用了一个`Entry<K, V> e`指针指向了`src[1]`也就是索引 1 的位置，但时间片已经用完，线程 1 挂起，注意这里并没有把`src[1]`引用释放掉。

此时，线程 2 插入 C 元素，紧接在 B 元素后面，继续触发扩容机制，这里线程 2 就直接把扩容流程做完了。因为是头插法，所以会导致逆序。

我们假设 A 和 B 经过哈希计算后会需要放到新索引 3 的位置，C 还是在新索引 1 的位置。此时新哈希表状态如下：

```markdown
新索引 0: null
新索引 1: C
新索引 2: null
新索引 3: B -> A
```

此时，线程 1 被唤醒，继续执行扩容操作，此时操作的新表是线程 2 刚刚扩容好的哈希表。接下来重点关注这几个步骤，这几个步骤是反复执行的：

```java
// 1. 将当前节点的 next 指向头节点，然后将当前节点设置为头节点
Entry<K,V> next = e.next;

// 2. 将当前节点指针指向下一个节点
int i = indexFor(e.hash, newCapacity);

// 3. 将当前节点的 next 指向头节点，然后将当前节点设置为头节点
e.next = newTable[i];
newTable[i] = e;

// 4. 将当前节点指针指向下一个节点
e = next;
```

A 线程中，原本的 e 指针指向 A，但在线程 2 扩容之后，A 位于尾节点。

在执行`e.next = newTable[i];`时，A 的 next 指向了 B，这时候就形成了一个环。执行完这串代码后哈希表状态如下：

```markdown
新索引 3: A -> B -> A -> ...
```

这样就形成了一个环，导致了死循环。

## 详细讲讲`ConcurrentHashMap`的实现原理，为什么它是线程安全的？再讲讲 JDK 8 中的实现比 JDK 7 中的实现好在哪里？

`ConcurrentHashMap`是一个线程安全的映射类，通过分段锁和 CAS 操作来保证线程安全。

在 JDK 7 中，其底层实现利用了分段原理。`ConcurrentHashMap`底层结构是一个`Segment`数组，而不是`Object`数组。

`Segment`继承了`ReentrantLock`，每个`Segment`就是一个小的`HashMap`。其中有一个`volatile`修饰的`HashEntry`数组，`HashEntry`是`ConcurrentHashMap`的内部类，用来存储键值对。此外，还维护了一个`volatile`修饰的`count`变量，用来记录`Segment`中的元素个数。

通过这种设计，就可以在需要进行并发写操作时（读操作不上锁），只锁定对应的`Segment`，而不是整个`ConcurrentHashMap`，从而提高了并发性能。但扩容时需要锁定所有的`Segment`，会导致长时间的全表锁定，降低了并发性能。

在 JDK 8 中，`ConcurrentHashMap`的底层实现采用了`CAS`操作和`synchronized`关键字来保证线程安全。

`ConcurrentHashMap`底层此时不再使用`Segment`数组，而是使用了`Node`数组，每个`Node`是一个链表节点，用来存储键值对，当链表长度超过 8 时，会将链表转换为红黑树。

在读操作时，采用`volatile`修饰的`Node`数组来保证可见性，再使用`CAS`操作来保证原子性，不需要加锁。写操作则在`CAS`操作基础上使用`synchronized`关键字来保证线程安全。

在扩容时，使用分段迁移避免长时间的全表锁定，提高了并发性能。

总的来说，JDK 8 通过细化锁的粒度，更换数据结构并修改扩容机制，提高了并发性能。

## 讲讲你还认识哪些线程安全的集合类

Java 中的线程安全的集合类有`Vector`、`HashTable`、`Collections.synchronizedList`、`Collections.synchronizedSet`、`Collections.synchronizedMap`、`ConcurrentHashMap`、`CopyOnWriteArrayList`、`CopyOnWriteArraySet`等。

1. `Vector`：`Vector`是线程安全的动态数组类，是`ArrayList`的线程安全版本。
2. `HashTable`：`HashTable`是线程安全的映射类，是`HashMap`的线程安全版本。
3. `Collections.synchronizedList`：`Collections.synchronizedList`是线程安全的列表类，是`ArrayList`的线程安全版本。
4. `Collections.synchronizedSet`：`Collections.synchronizedSet`是线程安全的集合类，是`HashSet`的线程安全版本。
5. `Collections.synchronizedMap`：`Collections.synchronizedMap`是线程安全的映射类，是`HashMap`的线程安全版本。
6. `ConcurrentHashMap`：`ConcurrentHashMap`是线程安全的映射类，通过分段锁和`CAS`操作来保证线程安全。
7. `CopyOnWriteArrayList`：`CopyOnWriteArrayList`是线程安全的动态数组类，通过写时复制机制来保证线程安全。
8. `CopyOnWriteArraySet`：`CopyOnWriteArraySet`是线程安全的集合类，通过写时复制机制来保证线程安全。
9. `ConcurrentLinkedQueue`：`ConcurrentLinkedQueue`是线程安全的队列类，通过`CAS`操作来保证线程安全。
10. `ConcurrentLinkedDeque`：`ConcurrentLinkedDeque`是线程安全的双端队列类，通过`CAS`操作来保证线程安全。

其中大部分的线程安全集合类都位于`java.util.concurrent`包中，通过分段锁、`CAS`操作、写时复制机制等技术来保证线程安全。

## Java 提供了这么多线程安全集合类，为什么平时做 SpringBoot 项目中却很难用上？

Spring 框架本身提供了许多线程安全的机制和工具，例如依赖注入、事务管理等，开发者通常不需要直接处理线程安全问题。Spring 的各种组件（如@Service、@Repository 等）默认是单例的，Spring 会确保它们的线程安全。

在 Spring Boot 项目中，业务逻辑通常被分离到不同的服务层和数据访问层中，减少了共享状态的使用。通过合理的设计，避免了多个线程同时访问和修改同一个数据结构的情况。

Spring Boot 项目通常使用数据库来持久化数据，数据库本身提供了事务管理和并发控制。通过使用 Spring 的事务管理（@Transactional），可以确保数据的一致性和隔离性，减少了对线程安全集合类的需求。

Spring Boot 项目通常采用无状态设计，特别是在 Web 应用中，每个请求都是独立的，不会共享状态。无状态设计减少了并发访问共享数据的需求，从而减少了对线程安全集合类的使用。

在需要高并发访问的场景下，Spring Boot 项目通常会使用缓存（如 Redis）和消息队列（如 RabbitMQ、Kafka）来处理。这些工具本身提供了线程安全和高并发支持，开发者不需要自己实现线程安全的集合类。

Java 提供了许多并发工具类（如 ExecutorService、CountDownLatch、Semaphore 等），这些工具类可以帮助管理并发任务，而不需要直接使用线程安全的集合类。