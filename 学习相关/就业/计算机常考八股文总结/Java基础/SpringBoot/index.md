**本模块适合 `Java后端研发（业务岗、架构岗）`的同学。**

## 讲讲 SpringBoot 的优点

SpringBoot 的优点主要有以下几点：

1. 简化开发：SpringBoot 提供了自动配置、快速启动、依赖管理等功能，简化了开发流程，提高了开发效率。
2. 零配置：SpringBoot 采用约定大于配置的方式，减少了配置文件，提高了代码的可读性、可维护性、可扩展性。
3. 内嵌服务器：SpringBoot 内置了 Tomcat、Jetty、Undertow 等服务器，方便部署和运行。
4. 微服务架构：SpringBoot 支持微服务架构，提供了 RESTful API、消息队列、服务注册、服务发现等功能，适合微服务架构。
5. 生态系统：SpringBoot 有庞大的生态系统，提供了大量的插件、工具、框架等，方便开发和部署。

## 为什么选择 SpringBoot，不选择 Nodejs？（简历写全栈的同学必定会被问到）

SpringBoot 是一种 Java 框架，主要用于开发企业级应用，支持事务管理、安全认证、数据访问等，适合大型项目。

Nodejs 是一种 JavaScript 框架，主要用于开发 Web 应用，支持异步 IO、事件驱动、非阻塞 IO 等，适合小型项目。

选择 SpringBoot 的主要原因有以下几点：

1. Java 生态系统：SpringBoot 是基于 Java 生态系统，有庞大的生态系统，提供了大量的插件、工具、框架等，方便开发和部署。
2. 企业级应用：SpringBoot 支持事务管理、安全认证、数据访问等，适合开发大型项目，提高代码的可读性、可维护性、可扩展性。
3. 性能稳定：SpringBoot 是基于 Java 虚拟机，性能稳定，适合高并发场景，提高系统的性能和可靠性。

因此，根据不同的需求选择合适的框架，SpringBoot 适合开发大型项目，Nodejs 适合开发小型项目。

## 讲讲 SpringBoot 的自动装配原理

SpringBoot 的自动装配原理主要有以下几个步骤：

1. SpringBoot 启动时，会扫描所有的类路径，查找`@SpringBootApplication`注解。
2. SpringBoot 会根据`@SpringBootApplication`注解的配置，自动装配`@Configuration`、`@ComponentScan`、`@EnableAutoConfiguration`等注解。
3. SpringBoot 会根据`@EnableAutoConfiguration`注解的配置，自动装配`spring-boot-autoconfigure`模块中的配置类。
4. SpringBoot 会根据`spring.factories`文件中的配置，自动装配`spring-boot-starter`模块中的依赖。

SpringBoot 的自动装配原理是为了简化开发流程，提高开发效率，减少配置文件，提高代码的可读性、可维护性、可扩展性。

## 什么叫 AOP，SpringBoot 底层如何实现的 AOP？

AOP（Aspect-Oriented Programming）是一种面向切面编程的方法，亦是代理模式的直接实现。

AOP 提供另一个角度来考虑程序的结构，主要是为了解耦业务逻辑和横切关注点，提高代码的可读性、可维护性、可扩展性。

使用 AOP 的好处包括：

1. 代码重用：将横切关注点抽象成切面，提高代码的可重用性。
2. 代码解耦：将业务逻辑和横切关注点解耦，提高代码的可维护性。
3. 代码扩展：将横切关注点动态织入业务逻辑，提高代码的可扩展性。

AOP 主要包含如下几个概念：

1. 切面（Aspect）：横切关注点，包括通知、切点、连接点等。
2. 通知（Advice）：在连接点上执行的动作，包括前置通知、后置通知、环绕通知、异常通知、最终通知等。
3. 切点（Pointcut）：连接点的集合，用于匹配连接点。
4. 连接点（Joinpoint）：程序执行的某个特定点，如方法调用、方法返回、方法异常等。
5. 织入（Weaving）：将切面应用到目标对象的过程，包括编译时织入、类加载时织入、运行时织入等。
6. 代理（Proxy）：代理对象，用于控制对目标对象的访问，包括静态代理、动态代理、CGLIB 代理等。
7. 目标对象（Target）：被代理的对象，包括业务逻辑、数据访问等。

实现 AOP 主要包含 JDK 动态代理和 CGLIB 动态代理两种方式：

1. JDK 动态代理：基于接口的代理，通过`java.lang.reflect.Proxy`类实现，要求目标对象必须实现接口。
2. CGLIB 动态代理：基于类的代理，通过`net.sf.cglib.proxy.Enhancer`类实现，不要求目标对象必须实现接口。

其原理很简单，调用`Method.invoke()`方法时，会先调用`MethodInterceptor.intercept()`方法，最后将参数传递给目标对象。

## 什么是 IOC 和 DI？

IOC（Inversion of Control）是一种控制反转的思想，主要是将对象的创建和管理交给容器，提高代码的可读性、可维护性、可扩展性。

DI（Dependency Injection）是一种依赖注入的方式，主要是将对象的依赖关系交给容器，提高代码的可读性、可维护性、可扩展性。

SpringBoot 的 IOC 和 DI 主要有以下几个概念：

1. Bean：SpringBoot 的核心对象，由容器管理，包括配置类、组件类、代理类等。
2. Configuration：SpringBoot 的配置类，用于配置 Bean 的创建和管理，包括`@Configuration`、`@ComponentScan`、`@EnableAutoConfiguration`等。
3. Component：SpringBoot 的组件类，用于定义 Bean 的依赖关系，包括`@Component`、`@Service`、`@Repository`、`@Controller`等。
4. Autowired：SpringBoot 的依赖注入，用于注入 Bean 的依赖关系，包括`@Autowired`、`@Qualifier`、`@Resource`、`@Inject`等。
5. BeanFactory：SpringBoot 的容器类，用于管理 Bean 的创建和管理，包括`BeanFactory`、`ApplicationContext`、`AnnotationConfigApplicationContext`等。

SpringBoot 的 IOC 和 DI 主要是为了解耦对象的创建和使用，提高代码的可读性、可维护性、可扩展性，根据不同的需求选择合适的配置类、组件类、代理类等。

## 讲讲 SpringBoot 的启动流程

SpringBoot 的启动流程主要有以下几个步骤：

1. 加载配置：SpringBoot 会加载`application.properties`、`application.yml`等配置文件，读取配置信息，初始化配置类。
2. 扫描注解：SpringBoot 会扫描`@SpringBootApplication`、`@Configuration`、`@ComponentScan`、`@EnableAutoConfiguration`等注解，初始化配置类。
3. 自动装配：SpringBoot 会根据`@EnableAutoConfiguration`注解的配置，自动装配`spring-boot-autoconfigure`模块中的配置类，初始化 Bean 对象。
4. 启动容器：SpringBoot 会启动`Tomcat`、`Jetty`、`Undertow`等服务器，监听端口，接收请求，处理响应。
5. 处理请求：SpringBoot 会根据`@Controller`、`@RestController`、`@RequestMapping`等注解，处理请求，返回响应。

SpringBoot 的启动流程是为了简化开发流程，提高开发效率，减少配置文件，提高代码的可读性、可维护性、可扩展性。

## 什么是 Starter？

Starter 是 SpringBoot 的一个插件，本质是对依赖的集合，主要是为了简化依赖管理，提高代码的可读性、可维护性、可扩展性。

Starter 主要包含如下几个概念：

1. Starter：SpringBoot 的插件，用于管理依赖关系，提供一组依赖的集合，方便开发和部署。
2. Autoconfigure：SpringBoot 的自动配置，用于自动装配依赖关系，提供一组配置的集合，方便开发和部署。
3. Starter Parent：SpringBoot 的父项目，用于管理依赖关系，提供一组依赖的集合，方便开发和部署。
4. Starter Test：SpringBoot 的测试插件，用于测试依赖关系，提供一组测试的集合，方便开发和部署。

Starter 是为了简化依赖管理，提高代码的可读性、可维护性、可扩展性，根据不同的需求选择合适的 Starter。

值得注意的是，如果是官方的 Starter，一般是以`spring-boot-starter-`开头，如`spring-boot-starter-web`、`spring-boot-starter-data-jpa`等，如果是三方的 Starter，一般是以`xxx-spring-boot-starter`开头，如`mybatis-spring-boot-starter`、`dubbo-spring-boot-starter`等。

## SpringBoot 在注入时如何解决循环依赖？（不常考，但如果说自己读过源码，必问）

循环依赖是一个非常棘手的问题，SpringBoot 是通过三级缓存解决的，具体来说，有如下三级缓存：

1. singletonObjects：存放完全实例化好的 Bean，可以直接使用。类型是`ConcurrentHashMap<String, Object>`。
2. earlySingletonObjects：存放早期暴露出来的 Bean，还没有完成属性注入和初始化的 Bean，但是可以提前暴露出来给其他 Bean 使用。类型是`ConcurrentHashMap<String, Object>`。
3. singletonFactories：存放未完成属性注入和初始化的 Bean 的工厂，用于解决循环依赖问题。类型是`ConcurrentHashMap<String, ObjectFactory<?>>`。
   
在注册和依赖注入过程中，SpringBoot 首先会调用构造函数创建 Bean 的实例。创建完之后，会先将 Bean 的名称作为 Key，一个获得提前暴露的半成品 Bean 的工厂方法作为 value 放入三级框架中。注册完成后，进入属性注入阶段。

正常情况下，属性注入会先从一级缓存中获取 Bean，如果没有，再从二级缓存中获取 Bean，如果还没有，一般就出现了循环依赖问题，直接从三级缓存中获取工厂方法，得到半成品，移入二级缓存，删除三级缓存当中对应的方法，再进行属性注入。这个过程中，如果对象允许被创建代理，那么放入二级缓存的是代理对象。

完成注入后，再将 Bean 移入一级缓存，删除二级和三级缓存中对应的内容，这就是总体的注册和依赖注入过程。

## SpringBoot 底层是如何解决基于里氏替换原则实现类型注入的？（不常考，但如果说自己读过源码，必问）

先说说里氏替换原则，里氏替换原则是面向对象设计的一个重要原则，主要是为了保证子类可以替换父类，提高代码的可读性、可维护性、可扩展性。

简单可以理解为，如果 A 是 B 的子类，那么在任何使用 B 的地方，都可以替换成 A，而不影响程序的正确性，即大装小，如：`List<Number> list = new ArrayList<Integer>();`。

既然要实现基于里氏替换原则的类型注入，就意味着，我们必须从 Bean 对应类型的实现链和继承链中找到对应的类型，然后再进行注入。

但这样会导致每次类型注入都要遍历整个所有 Bean 的实现链和继承链，如果有 m 个字段，n 个 Bean，那么复杂度就是 O(mn)，这种设计是不可取的。

SpringBoot 为了定位 Bean 对应的类型的父类和接口，维护了`allBeanNamesByType`和`singletonBeanNamesByType`两个 Map，类型是`ConcurrentHashMap<String, String[]>`，key 是 Bean 的类型，包括接口和父类，value 是 Bean 的名称数组。在 Bean 刚刚实例化的时候，会将 Bean 的类型和名称，以及整个继承链和实现链上的类型和名称都放入这两个 Map 中。

在依赖注入阶段，如果三级缓存都拿不到对应的 Bean，就意味着这个注入是基于类型的，那么就会从这两个 Map 中找到对应的 Bean 名称数组，然后又从一级缓存中找到对应的 Bean，进行注入。

这样就实现了基于里氏替换原则的类型注入，时间复杂度从 O(mn) 降低到了近乎 O(1)（因为哈希表会出现哈希冲突导致在链表或红黑树上查找，所以不是完全的 O(1)）。