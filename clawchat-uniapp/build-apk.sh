#!/bin/bash
# 生成 ClawChat APK 的脚本（PWA WebView 方式）

set -e

PROJECT_DIR="/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp"
OUTPUT_DIR="/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp/dist/apk"
TEMP_DIR="/tmp/clawchat-apk-build"

mkdir -p "$OUTPUT_DIR"
mkdir -p "$TEMP_DIR"

echo "🚀 开始构建 ClawChat APK..."

# 复制 H5 内容到临时目录
cp -r "$PROJECT_DIR/h5-dist/"* "$TEMP_DIR/"

# 创建 AndroidManifest.xml
cat > "$TEMP_DIR/AndroidManifest.xml" << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.clawchat.app"
    android:versionName="1.0.0"
    android:versionCode="100">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <supports-screens
        android:smallScreens="true"
        android:normalScreens="true"
        android:largeScreens="true"
        android:xlargeScreens="true" />

    <application
        android:label="ClawChat"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">
        
        <activity
            android:name="io.cordova.html5plus.MainActivity"
            android:label="ClawChat"
            android:theme="@style/AppTheme"
            android:configChanges="orientation|keyboardHidden|screenSize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# 创建 build.gradle
cat > "$TEMP_DIR/build.gradle" << 'EOF'
plugins {
    id 'com.android.application'
}

android {
    namespace 'com.clawchat.app'
    compileSdk 34
    
    defaultConfig {
        applicationId "com.clawchat.app"
        minSdk 21
        targetSdk 34
        versionCode 100
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'org.apache.cordova:cordova-android:12.0.0'
}
EOF

# 创建项目结构
mkdir -p "$TEMP_DIR/app/src/main/java/com/clawchat/app"
mkdir -p "$TEMP_DIR/app/src/main/res/layout"
mkdir -p "$TEMP_DIR/app/src/main/res/mipmap"
mkdir -p "$TEMP_DIR/app/src/main/assets"

# 创建 MainActivity.java
cat > "$TEMP_DIR/app/src/main/java/com/clawchat/app/MainActivity.java" << 'EOF'
package com.clawchat.app;

import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
EOF

# 复制 H5 内容到 assets
cp -r "$TEMP_DIR/"* "$TEMP_DIR/app/src/main/assets/www/" 2>/dev/null || true
cp "$TEMP_DIR/index.html" "$TEMP_DIR/app/src/main/assets/www/" 2>/dev/null || true

# 创建 strings.xml
cat > "$TEMP_DIR/app/src/main/res/values/strings.xml" << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">ClawChat</string>
    <string name="title_activity_main">ClawChat</string>
</resources>
EOF

# 创建 styles.xml
cat > "$TEMP_DIR/app/src/main/res/values/styles.xml" << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
        <item name="colorPrimary">#667eea</item>
        <item name="colorPrimaryDark">#434ba2</item>
        <item name="colorAccent">#1890ff</item>
    </style>
</resources>
EOF

# 创建 gradle.properties
cat > "$TEMP_DIR/gradle.properties" << 'EOF'
android.useAndroidX=true
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.nonTransitiveRClass=true
android.enableJetifier=true
EOF

# 创建 logo 占位
echo '<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect width="192" height="192" fill="#667eea"/><text x="96" y="120" font-size="80" text-anchor="middle" fill="white" font-family="Arial">🤖</text></svg>' > "$TEMP_DIR/app/src/main/res/mipmap/ic_launcher.xml"

# 打包 APK（需要 Gradle）
echo "📦 正在打包 APK..."

cd "$TEMP_DIR"
./gradlew assembleDebug 2>/dev/null || {
    echo "⚠️ Gradle not found. Creating a simple APK using python..."
    
    # 简单 APK 打包（使用 python）- 生成一个 WebView APK
    pip3 install apkbuilder 2>/dev/null || pip install apkbuilder 2>/dev/null || true
    
    # 如果没成功，创建一个提示文档
    cat > "$OUTPUT_DIR/README.md" << 'EOF'
# 📱 ClawChat APK 手动构建说明

由于缺少 CLI 工具，本目录缺少正式 APK。

## 方式一：使用 HBuilderX（推荐）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 打开 `/home/zgc/.openclaw/workspace-xiaozhi/clawchat-uniapp`
3. 发行 → App 云端打包 → Android
4. 等待生成 APK

## 方式二：导入 Android Studio

1. 用 HBuilderX 导出原生 Android 项目
2. 用 Android Studio 打开
3. Build → Build APK

## 方式三：直接使用 H5（快速测试）

访问：https://zhengguocheng-cpu.github.io/clawchat-h5/

或下载 index.html 在本地打开。

---

**当前状态：待 HBuilderX 打包**
EOF

    echo "📁 APK构建文件已生成在: $TEMP_DIR"
    echo "📝 请参考 README.md 了解如何完成打包"
}

# 移动 APK 到输出目录
if [ -f "$TEMP_DIR/app/build/outputs/apk/debug/app-debug.apk" ]; then
    cp "$TEMP_DIR/app/build/outputs/apk/debug/app-debug.apk" "$OUTPUT_DIR/clawchat-1.0.0.apk"
    echo "✅ APK 打包完成: $OUTPUT_DIR/clawchat-1.0.0.apk"
else
    echo "⚠️ APK 打包未完成，临时文件位于: $TEMP_DIR"
fi

# 清理
rm -rf "$TEMP_DIR"

echo "🚀 构建完成！"
