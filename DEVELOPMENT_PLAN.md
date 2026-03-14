# ClawChat 后续开发计划 - 小步迭代

## 当前状态
- ✅ GitHub Pages 已推送测试页（等待 1-2 分钟生效）
- 🔄 等待 GitHub Pages 部署完成

---

## Phase 3: 机器人库功能（按功能分类）

### Step 3.1: 机器人库页面优化（前端）
**文件**: `pages/bots/index.vue`

#### 功能列表：
1. ✅ 分类筛选（全部/聊天/写作/编程/其他）
2. ✅ 搜索框（按名字/描述/标签）
3. ✅ 机器人卡片
   - 头像 + 名字 + 描述
   - 标签（tags）
   - 评分（⭐ 5 星，灰色显示）
   - "开始聊天"按钮
4. ✅ 收藏/常用机器人（固定在顶部）
5. ✅ 排序（评分/热度/时间）

#### 测试：
- 全分类切换正常
- 搜索关键词匹配正常
- 评分显示正常

---

### Step 3.2: ChatList 左侧列表适配
**文件**: `clawchat-h5/index.html` 的 ChatList 组件

#### 功能：
1. 显示已开始的聊天（机器人）
2. 无消息时显示"选择机器人开始聊天"
3. 点击机器人 → 进入聊天页
4. 右侧显示最后一条消息 + 时间

#### 测试：
- 切换机器人聊天正常
- 历史消息显示正常

---

### Step 3.3: 登录后跳转调整
**文件**: `clawchat-h5/index.html` 的 Login 组件

#### 功能：
1. 登录成功 → 跳转到 `/bots` (机器人库)
2. 选择机器人 → 跳转到 `/chat`

#### 测试：
- 登录流程完整
- 跳转正确

---

### Step 3.4: 评分系统
**文件**: `clawchat-h5/index.html` + `chatHistory.js`

#### 功能：
1. 每个机器人有评分（1-5 星）
2. 聊天页底部添加"评分"按钮
3. 点击评分 → 弹出评分选择（1-5 星）
4. 评分保存到 localStorage
5. 星级用颜色区分（红星/full，灰星/empty）

#### 测试：
- 评分保存正常
- 刷新页面后评分仍在

---

### Step 3.5: 机器人数据集成
**文件**: `clawchat-h5/index.html` 的数据

#### 数据结构：
```javascript
const bots = [
  {
    id: 'bot_001',
    name: 'AI小爪',
    avatar: '🤖',
    description: 'ClawChat 官方 AI 助手',
    tags: ['官方', '全能', '热门'],
    rating: 4.8,
    category: 'all',
    isOfficial: true
  },
  {
    id: 'bot_002',
    name: '写作大师',
    avatar: '✍️',
    description: '专业写作助手',
    tags: ['写作', '创意'],
    rating: 4.5,
    category: 'writing',
    isOfficial: true
  }
]
```

#### 测试：
- 机器人数据正确显示
- 分类筛选正常

---

## Phase 4: 详细测试

### Step 4.1: 持久化测试
- 登录态保存
- 聊天记录保存
- 刷新页面后数据不丢失

### Step 4.2: 移动端测试
- TabBar 显示正常
- 左侧列表隐藏
- 输入框适配

### Step 4.3: 登录/登出测试
- 登录成功 → 机器人库
- 退出登录 → 清空数据
- 重新登录 → 恢复数据

---

## 当前任务

1. **等待 GitHub Pages 部署**（1-2 分钟）
   - 访问 `https://zhengguocheng-cpu.github.io/clawchat-h5/test-pages.html`
   - 检查是否显示绿色检查通过

2. **如果 GitHub Pages 未启用**，需要：
   - GitHub → Settings → Pages
   - Source → main branch / root (/)
   - Save

3. **部署完成后**，开始 Step 3.1: 机器人库页面优化

---

## Git 记录
```
commit dcb3bde - test: GitHub Pages 检查
commit e0642ee - refactor: 高仿 Telegram UI - Login + ChatList + Chat 组件
```
