# 文化遗产交流平台（Heritage Exchange）

这是一个面向“文化遗产图文交流平台”场景的 Spring Boot 项目。当前版本已经从基础后端，增量演进为包含**文章审核流、管理员后台、用户角色管理、贡献者申请流**的可联调版本。

## 技术栈

- Java 21
- Spring Boot 3.5.13
- Spring Web
- Spring Data JPA
- H2 / MySQL
- Maven Wrapper
- 静态前端页面（`src/main/resources/static`）

## 当前已实现能力

### 1. 基础内容能力

- 用户注册
- 用户登录
- 分类管理
- 图片上传到本地 `uploads`
- Public 文章列表与详情
- 评论发布

### 2. 文章草稿与审核流

文章状态机已经升级为：

- `DRAFT`
- `PENDING_REVIEW`
- `PUBLISHED`
- `ARCHIVED`
- `REJECTED`

当前规则：

- 新建文章默认保存为 `DRAFT`
- 用户可编辑自己的 `DRAFT / REJECTED`
- 用户可将 `DRAFT / REJECTED` 提交为 `PENDING_REVIEW`
- 管理员可将 `PENDING_REVIEW` 审核为 `PUBLISHED / REJECTED`
- 管理员可将 `PUBLISHED` 归档为 `ARCHIVED`
- 管理员可将 `ARCHIVED` 恢复为 `PUBLISHED`
- Public 端仅 `PUBLISHED` 可见
- 评论仅允许对 `PUBLISHED` 文章发布

文章审核相关字段已补充：

- `submittedAt`
- `reviewedAt`
- `reviewedBy`
- `rejectReason`

### 3. 用户侧内容工作台

已实现用户自己的文章工作流：

- 创建草稿
- 更新草稿 / 驳回稿
- 提交审核
- 查看我的文章列表
- 查看我的文章详情（覆盖所有状态）
- 从真实接口重新打开旧草稿继续编辑

### 4. 管理员后台：文章管理

管理员侧已实现：

- 查看所有文章
- 按状态筛选文章
- 按标题关键词搜索文章
- 按更新时间 / 提交时间 / 审核时间排序
- 查看文章详情
- 审核通过 / 驳回
- 归档 / 恢复发布

### 5. 管理员后台：Pending Review Queue

已实现独立待审核队列：

- 只显示 `PENDING_REVIEW` 文章
- 按 `submittedAt` 倒序展示
- 显示待审核数量
- 支持快速通过（Quick approve）
- 可跳转到文章详情进行完整审核

### 6. 管理员后台：用户管理

已实现真实 User Management：

- 查看用户列表
- 按用户名搜索
- 按角色筛选
- 查看用户角色、活跃状态、贡献数
- 管理 `USER <-> CONTRIBUTOR`
- 阻止将任何用户改成 `ADMIN`
- 阻止修改现有 `ADMIN` 的角色

其中 contributionCount 当前按“已发布文章数”计算。

### 7. 贡献者申请流

已实现最小可用闭环：

- `USER` 可提交成为 `CONTRIBUTOR` 的申请
- 用户可查看自己的申请记录
- 同一用户不能存在多个并行 `PENDING` 申请
- `CONTRIBUTOR / ADMIN` 不能再次申请
- 管理员可查看申请列表并按状态筛选
- 管理员可 approve / reject 申请
- approve 后自动将用户角色提升为 `CONTRIBUTOR`

申请状态包括：

- `PENDING`
- `APPROVED`
- `REJECTED`

## 当前鉴权方案

使用 **JWT 鉴权方案**：

- **JWT 认证**：使用 `Authorization: Bearer <token>` 请求头进行认证
- **权限控制**：`AuthContextService` 统一处理用户权限校验
- **安全配置**：使用 Spring Security 进行权限管理

## 本轮开发完成的 PBI 记录

### P0：文章审核主链路与稳定性

- 完成文章审核状态机升级
- 完成管理员审核、归档、恢复发布接口
- 完成用户草稿 / 驳回稿编辑与送审接口
- 增加接口级测试 `PostReviewFlowApiTests`
- 新增“我的文章详情”接口，支持真实重开旧草稿
- 前端改为优先通过真实接口回填草稿
- 修复本地 H2 历史枚举约束导致 `PENDING_REVIEW` 无法写入的问题

### P1：管理员文章管理增强

- 管理员文章标题搜索
- 状态筛选与标题搜索叠加
- Pending Review Queue 独立数据流
- 修复文章管理与待审队列搜索状态串扰问题
- 支持排序：
  - `UPDATED_DESC`
  - `SUBMITTED_DESC`
  - `REVIEWED_DESC`
- 增加结果数量、筛选摘要、排序摘要反馈

### P3：管理员用户与权限管理

- User Management 接真实后端
- 支持用户名搜索、角色筛选、角色调整
- 完成贡献者申请流最小闭环
- 用户侧申请区和管理员审批区都已接真实接口

## 主要接口（当前版本）

### 公共接口

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/categories`
- `GET /api/posts`
- `GET /api/posts/{id}`
- `POST /api/posts/{id}/comments`
- `POST /api/uploads/images`

### 用户侧接口

- `POST /api/posts` 创建草稿
- `PUT /api/posts/{id}` 更新草稿 / 驳回稿
- `POST /api/posts/{id}/submit-review`
- `GET /api/my/posts`
- `GET /api/my/posts/{id}`
- `GET /api/my/contributor-applications`
- `POST /api/my/contributor-applications`

### 管理员接口

- `GET /api/admin/posts`
- `GET /api/admin/posts/{id}`
- `POST /api/admin/posts/{id}/review`
- `POST /api/admin/posts/{id}/archive`
- `POST /api/admin/posts/{id}/restore`
- `GET /api/admin/users`
- `POST /api/admin/users/{id}/role`
- `GET /api/admin/contributor-applications`
- `POST /api/admin/contributor-applications/{id}/approve`
- `POST /api/admin/contributor-applications/{id}/reject`

## 运行方式

### 1. IntelliJ IDEA 直接运行

运行主类：

`com.heritage.platform.HeritagePlatformApplication`

默认使用 H2 文件数据库。当前项目已补充 `schema-h2.sql`，用于修正旧本地 H2 库在文章状态枚举升级后的兼容问题。

### 2. 命令行运行

```bash
./mvnw spring-boot:run
```

Windows：

```bash
.\mvnw.cmd spring-boot:run
```

### 3. 测试

```bash
./mvnw test
```

Windows：

```bash
.\mvnw.cmd test
```

## 当前已知限制

- 管理员文章管理尚未做分页
- 权限申请流暂未增加驳回原因与更完整的统计反馈
- 远程数据库配置不纳入默认仓库提交

## 版本修改说明

当前版本（JWT 鉴权版）相比初始版本进行了以下修改：

### 1. 权限控制功能
- **管理页面权限**：仅管理员可访问管理页面
- **发布功能权限**：发布页面和发布按钮只对投稿用户（CONTRIBUTOR）和管理员可见
- **游客权限**：未登录游客只能查看已发布文章，无法进行点赞、评论、收藏、转发等操作
- **前端权限控制**：修改了前端导航和 UI，根据用户角色动态显示/隐藏功能

### 2. JWT 鉴权机制
- **添加 JWT 依赖**：集成了 jjwt 库
- **JWT 工具类**：实现了 token 生成和验证功能
- **认证服务优化**：修改 AuthService，添加 token 生成功能
- **响应结构更新**：修改 AuthResponse，添加 token 字段
- **JWT 过滤器**：实现了 token 验证和用户信息提取
- **安全配置**：配置了 Spring Security，添加 JWT 过滤器和权限控制
- **认证上下文**：支持从 JWT 过滤器获取用户信息
- **前端集成**：修改前端 app.js，使用 `Authorization: Bearer <token>` 头传递 JWT

### 3. 技术实现
- **密码加密**：使用 BCrypt 加密存储密码
- **权限检查**：在服务层添加权限检查方法
- **前端认证**：修改前端认证逻辑，支持 JWT

### 4. 功能增强
- **用户角色管理**：明确了三种角色（USER、CONTRIBUTOR、ADMIN）的权限
- **投稿申请流程**：普通用户可以申请成为投稿用户
- **文章状态管理**：文章有草稿、待审核、已发布、已拒绝、已归档等状态
- **文件上传权限**：只有投稿用户和管理员可以上传图片

## 最近更新（2026-04-20）

### PDF附件改为可选

**问题描述**：
将PDF附件改为可选后，用户无法提交申请，点击提交申请按钮没有反应。

**根本原因**：
1. 后端控制器使用 `@RequestPart` 注解处理 multipart 请求时，即使设置 `required = false`，当请求不包含该部分时仍会导致Spring框架处理异常
2. 使用 Jackson ObjectMapper 直接解析 JSON 字符串可以更好地处理这种情况

**解决方案**：
1. **修改 `MyContributorApplicationController.java`**：
   - 将 `@RequestPart("request") CreateContributorApplicationRequest request` 改为 `@RequestParam("request") String requestJson`
   - 使用 `ObjectMapper` 手动解析 JSON 字符串
   - 保持 `@RequestParam(value = "attachment", required = false) MultipartFile attachment` 使附件为可选

2. **增强异常处理**：
   - 在 `GlobalExceptionHandler.java` 中添加详细的日志记录
   - 在 `AuthContextService.java` 中添加用户身份解析的日志

3. **优化文件处理**：
   - 创建 `FaviconController.java` 处理 favicon.ico 请求，避免500错误
   - 在 `SecurityConfig.java` 中添加 `/favicon.ico` 到公开路径列表

**技术细节**：
- 前端使用 `FormData` 对象构建 multipart 请求
- 当没有附件时，仅发送 `request` 部分
- 后端使用 `ObjectMapper.readValue()` 解析 JSON 字符串
- 添加详细的日志记录便于调试

**修改的文件**：
- `MyContributorApplicationController.java` - 修改请求处理方式
- `GlobalExceptionHandler.java` - 增强异常日志
- `AuthContextService.java` - 添加调试日志
- `FaviconController.java` - 新增文件
- `SecurityConfig.java` - 添加公开路径

## 建议下一步

- 为管理员文章管理增加分页
- 增强权限申请流反馈（如驳回原因、审批结果展示）
- 继续补充接口级测试与联调说明
