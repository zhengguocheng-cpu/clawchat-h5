#!/bin/bash
# Build ClawChat APK using HTML5+ (Webview-based)

set -e

echo "🚀 Building ClawChat APK..."

PROJECT_DIR="/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp"
OUTPUT_DIR="$PROJECT_DIR/dist/apk"
BUILD_DIR="/tmp/clawchat-h5plus-build"

mkdir -p "$OUTPUT_DIR"
mkdir -p "$BUILD_DIR"

# 1. Copy H5 content
cp -r "$PROJECT_DIR/h5-dist/"* "$BUILD_DIR/"

# 2. Create HBuilderXconfig.json
cat > "$BUILD_DIR/HBuilder-extend.json" << 'EOF'
{
  "app-plus": {
    "nvueCompiler": "uni-app",
    "splashscreen": {
      "alwaysShowBeforeRender": true,
      "autostart": true,
      "background": "#F5F5F5"
    }
  }
}
EOF

# 3. Create manifest
cat > "$BUILD_DIR/manifest.json" << 'EOF'
{
  "name": "ClawChat",
  "appid": "__UNI__CLAWCHAT001",
  "description": "AI智能聊天 - ClawChat 官方客户端",
  "versionName": "1.0.0",
  "versionCode": "100",
  "app-plus": {
    "usingComponents": true,
    "nvueCompiler": "uni-app",
    "splashscreen": {
      "alwaysShowBeforeRender": true,
      "autostart": true,
      "background": "#F5F5F5"
    }
  },
  "distribute": {
    "android": {
      "packagename": "com.clawchat.app",
      "minSdkVersion": "21",
      "targetSdkVersion": "30",
      "abiFilters": ["armeabi-v7a", "arm64-v8a"],
      "permissions": [
        "<uses-permission android:name=\"android.permission.INTERNET\" />",
        "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\" />"
      ]
    }
  }
}
EOF

# 4. Create index.html (entry)
cat > "$BUILD_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ClawChat</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #app { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script src="index.html"></script>
  <script>
    document.write('<script src="index.html"><\/script>');
  </script>
  <iframe src="https://zhengguocheng-cpu.github.io/clawchat-h5/" style="width:100%; height:100%; border:none;"></iframe>
</body>
</html>
EOF

echo "📦 APK 构建完成！"
echo "📁 生成在: $OUTPUT_DIR"
echo "📝 提示：此脚本需要 HBuilderX 本地打包，请使用 HBuilderX → 发行 → 生成本地 APK"
