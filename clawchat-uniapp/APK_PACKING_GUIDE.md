# 📱 ClawChat APK 打包指南

## 🎯 方式一：HBuilderX 图形界面打包（最简单）

### 步骤：

1. **下载 HBuilderX**
   - 官网：https://www.dcloud.io/hbuilderx.html
   - 下载标准版或 uni-app 专用版

2. **打开项目**
   - HBuilderX → 文件 → 打开目录
   - 选择：`/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp`

3. **配置 App 基本信息**
   - 打开 `manifest.json`
   - 修改：
     ```json
     {
       "name": "ClawChat",
       "appid": "__UNI__CLAWCHAT001",
       "description": "AI智能聊天 - ClawChat 官方客户端"
     }
     ```

4. **云端打包**
   - 发行 → 云端打包
   - 勾选：Android
   - 如果需要 iOS，勾选 iOS（需要苹果开发者账号）
   - 点击「开始打包」

5. **等待打包完成**
   - 左下角显示进度
   - 通常 2-3 分钟
   - 完成后自动下载 APK

---

## 🛠️ 方式二：使用 HBuilderX 命令行

如果你有 HBuilderX CLI：

```bash
# 安装 CLI（可选）
npm install -g html5plus

# 打包 Android
hbx build --android --dist ./dist
```

---

## 🔧 方式三：本地构建（高级用户）

### 前提：
- Android Studio 已安装
- 已配置 Android SDK

### 步骤：

1. **导出原生项目**
   - HBuilderX → 发行 → 生成原生应用
   - 选择 Android 平台
   - 导出到本地目录

2. **用 Android Studio 打开**
   - 打开导出的项目
   - 配置签名文件
   - Build → Build APK

---

## 📥 下载最新 APK

打包完成后，APK 存放在：

```
/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp/dist/apk/
```

文件名示例：`clawchat-1.0.0.apk`

---

## 🔐 签名配置（可选）

如果需要自定义签名：

1. 生成 keystore：
   ```bash
   keytool -genkey -alias clawchat -keyalg RSA -keysize 2048 -storepass clawchat123 -keystore clawchat.keystore -validity 36500
   ```

2. 在 `manifest.json` 中配置：
   ```json
   {
     "app-plus": {
       "distribute": {
         "android": {
           "keystore": "clawchat.keystore",
           "storepass": "clawchat123",
           "aliasname": "clawchat",
           "password": "clawchat123"
         }
       }
     }
   }
   ```

---

## ✅ 打包前检查清单

- [ ] `manifest.json` 配置正确
- [ ] `pages.json` 路由正常
- [ ] 图标文件（`static/tabbar/`）已准备好
- [ ] 网络权限已启用
- [ ] API 地址已配置（`config/index.js`）

---

## 🐛 常见问题

| 问题 | 解决方案 |
|------|----------|
| 打包失败 | 检查 `manifest.json` 是否有语法错误 |
| 无法安装 | 检查 Android 版本是否匹配（minSdkVersion） |
| 白屏 | 检查 `App.vue` 是否有错误 |
| 加载慢 | 优化首屏资源，启用压缩 |

---

## 📧 需要帮助？

联系：clawchat_support
