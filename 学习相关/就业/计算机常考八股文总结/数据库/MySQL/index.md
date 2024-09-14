**本模块是公共类课程，适合`后端开发`、`嵌入式开发`、`移动端原生开发（SQLite、Realm）`等需要使用数据库进行数据持久化的岗位。**

## 讲讲 MyISAM 和 InnoDB 的区别

MyISAM 和 InnoDB 是 MySQL 中的两种存储引擎，主要区别如下：

1. 存储结构：MyISAM 存储引擎是表级锁，InnoDB 存储引擎是行级锁。
2. 事务支持：MyISAM 存储引擎不支持事务，InnoDB 存储引擎支持事务。
3. 外键支持：MyISAM 存储引擎不支持外键，InnoDB 存储引擎支持外键。
4. 全文索引：MyISAM 存储引擎支持全文索引，InnoDB 存储引擎不支持全文索引。
5. 表空间：MyISAM 存储引擎不支持表空间，InnoDB 存储引擎支持表空间。
6. 性能：MyISAM 存储引擎读取速度快，写入速度慢，适合读多写少的场景；InnoDB 存储引擎读取速度慢，写入速度快，适合读写频繁的场景。

MyISAM 和 InnoDB 的主要区别是存储结构、事务支持、外键支持、全文索引、表空间和性能，根据不同的需求选择合适的存储引擎。

## 讲讲 MySQL 和 MongoDB 的区别是什么？指出最大的区别

MySQL 和 MongoDB 是两种不同类型的数据库，主要区别如下：

1. 数据库类型：MySQL 是关系型数据库，MongoDB 是非关系型数据库。
2. 数据结构：MySQL 是表结构，MongoDB 是文档结构。
3. 数据模型：MySQL 是静态模式，MongoDB 是动态模式。
4. 查询语言：MySQL 是 SQL 语言，MongoDB 是 JSON 语言。
5. 事务支持：MySQL 支持事务，隔离级别为可重复读，MongoDB 在 4.0 版本后支持事务，隔离级别为读提交。
6. 复杂查询：MySQL 支持复杂查询，MongoDB 不支持复杂查询。
7. 数据库引擎：MySQL 支持多种存储引擎，MongoDB 只支持一种存储引擎。
8. 数据库性能：MySQL 读取速度快，写入速度慢，MongoDB 读取速度慢，写入速度快。

MySQL 和 MongoDB 的最大区别是数据库类型，MySQL 是关系型数据库，MongoDB 是非关系型数据库。