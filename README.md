# 文化遗产交流平台基础后端

这是一个适合 IntelliJ IDEA 直接打开的基础版后端项目，面向“文化遗产图文交流平台”场景，先实现文章、图片、分类、评论和用户注册登录。

## 技术栈

- Java 21
- Spring Boot 3.5.13
- Spring Web
- Spring Data JPA
- H2 / MySQL
- Maven Wrapper

## 已有功能

- 用户注册
- 用户登录
- 分类管理
- 文章发布
- 文章列表与详情
- 评论发布
- 图片上传到本地 `uploads`

## 运行方式

### 1. IntelliJ IDEA 直接运行

打开项目后运行 `com.heritage.platform.HeritagePlatformApplication`。

默认使用 H2 文件数据库，第一次运行会自动建表并写入初始数据：

- 管理员账号：`admin`
- 管理员密码：`admin123`

### 2. 命令行运行

```bash
./mvnw spring-boot:run
```

### 3. 切换到 MySQL

先创建数据库：

```sql
CREATE DATABASE heritage_platform DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然后在 IntelliJ 的运行配置里添加：

```text
--spring.profiles.active=mysql
```

并根据你本地 MySQL 修改 `src/main/resources/application-mysql.properties` 里的用户名和密码。

## 主要接口

- `POST /api/auth/register` 注册
- `POST /api/auth/login` 登录
- `GET /api/categories` 查询分类
- `POST /api/categories` 新增分类
- `GET /api/posts` 查询文章列表
- `GET /api/posts/{id}` 查询文章详情
- `POST /api/posts` 发布文章
- `POST /api/posts/{id}/comments` 发布评论
- `POST /api/uploads/images` 上传图片

## 建议下一步

- 增加 JWT 登录鉴权
- 增加点赞、收藏、审核表
- 增加标签与搜索
- 增加前端 Vue 页面
