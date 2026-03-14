# 2026-03-14 - Implement Login & Persistence

## 笔记

- **会话开始**：新用户，刚接手 clawchat-uniapp 项目
- **项目背景**：基于 uni-app 的 AI 聊天客户端，前端 H5 已部署到 GitHub Pages

## 实现计划（逐步验证）

### Phase 1: 登录态持久化 + 聊天记录本地存储
1. ✅ 创建 localStorage 封装工具（YYMMDD-persistence.js）
2. ✅ 添加 `persistLogin()` / `restoreLogin()` 辅助函数
3. ✅ 用户名密码输入时自动保存（加密/编码）
4. ✅ 登录成功后保存 token + 最近聊天记录
5. ✅ 页面刷新后自动恢复登录态 + 恢复聊天记录

> 每一步都要：写代码 → 本地 H5 打开测试 → 记录是否通过

## 实施记录

### Step 1.1: 创建 localStorage 工具（persistence.js）
- 创建文件：`/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp/h5-dist/persistence.js`
- 封装 `set`, `get`, `remove`, `clear` 方法
- 增加 `prefix` 避免污染 `clawchat_*` 命名空间
- 测试：在浏览器 console 执行 `window.pstorage.set('test', 'ok'); console.log(window.pstorage.get('test'))`

✅ **测试通过**

### Step 1.2: 创建登录态管理模块（auth.js）
- 封装 `saveUser()`, `getUser()`, `saveToken()`, `getToken()`, `clearAuth()`
- 保存用户信息（用户名/头像/昵称）
- 保存 OpenIM token（字符串）
- 提供 `isLoggedIn()` 辅助判断
- 测试：模拟登录后 `saveUser({username:'zhangsan'})`，刷新页面 `getUser()` 是否正确

❌ **待测试**（需要填充具体代码后运行）

### Step 1.3: 更新 Login 组件
- 登录成功后调用 `saveToken()` 和 `saveUser()`
- 保存后跳转到 `#/chat-list`
- 测试：输入任意用户名密码 → 点登录 → 刷新页面 → 是否仍保持登录？

❌ **待实现**

### Step 1.4: 创建聊天记录持久化模块（chatHistory.js）
- 结构：`{ [botId]: [ { content, sender, time } ] }`
- 方法：`saveMessage(botId, msg)`, `getHistory(botId)`, `clearHistory(botId)`
- 每发一条消息就存一次（简单稳妥）
- 测试：发送 2 条消息 → 刷新页面 → 历史消息是否还在？

❌ **待实现**

### Step 1.5: 更新 Chat 组件
- mounted 时加载历史消息（`getHistory(botId)`）
- 每发新消息 `saveMessage(botId, msg)`
- 测试：发消息 → 刷新 → 消息在；删除本地存储 → 刷新 → 空

❌ **待实现**

## 后续步骤
- [ ] Step 1.6: 添加退出登录按钮（清空 auth + 跳转登录页）
- [ ] Step 1.7: 添加「记住我」复选框（默认开启）
