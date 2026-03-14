<template>
  <view class="about-container">
    <view class="app-info">
      <view class="app-icon">🤖</view>
      <text class="app-name">ClawChat</text>
      <text class="app-version">v{{ version }}</text>
      <text class="app-desc">AI智能聊天客户端</text>
    </view>
    
    <view class="update-section" @click="checkUpdate">
      <view class="update-item">
        <text class="item-icon">🔔</text>
        <text class="item-label">检查更新</text>
        <text class="item-desc">当前版本: {{ version }}</text>
      </view>
    </view>
    
    <view class="about-section">
      <view class="about-item" @click="goToTerms">
        <text class="item-icon">📄</text>
        <text class="item-label">服务条款</text>
      </view>
      <view class="about-item" @click="goToPrivacy">
        <text class="item-icon">🔒</text>
        <text class="item-label">隐私政策</text>
      </view>
      <view class="about-item" @click="goToHelp">
        <text class="item-icon">❓</text>
        <text class="item-label">帮助中心</text>
      </view>
    </view>
    
    <view class="contact-section">
      <text class="contact-label">联系客服</text>
      <view class="contact-item" @click="copyWeChat">
        <text class="item-icon">💬</text>
        <text class="item-label">微信客服</text>
        <text class="item-value">clawchat_support</text>
      </view>
    </view>
    
    <view class="version-section">
      <text class="version-label">Build: {{ build }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      version: '1.0.0',
      build: '20260312'
    }
  },
  methods: {
    checkUpdate() {
      uni.showToast({
        title: '已是最新版本',
        icon: 'success'
      })
    },
    goToTerms() {
      uni.showToast({
        title: '服务条款开发中',
        icon: 'none'
      })
    },
    goToPrivacy() {
      uni.showToast({
        title: '隐私政策开发中',
        icon: 'none'
      })
    },
    goToHelp() {
      uni.showToast({
        title: '帮助中心开发中',
        icon: 'none'
      })
    },
    copyWeChat() {
      uni.setClipboardData({
        data: 'clawchat_support',
        success: () => {
          uni.showToast({
            title: '已复制微信号',
            icon: 'success'
          })
        }
      })
    }
  }
}
</script>

<style>
.about-container {
  padding: 24rpx;
  background: #f5f5f5;
}

.app-info {
  background: white;
  padding: 40rpx;
  text-align: center;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.app-icon {
  font-size: 80rpx;
  margin-bottom: 24rpx;
}

.app-name {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.app-version {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.app-desc {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.update-section {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.update-item {
  padding: 24rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f0f0f0;
}

.item-icon {
  margin-right: 16rpx;
  font-size: 32rpx;
}

.item-label {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.item-desc {
  font-size: 24rpx;
  color: #999;
}

.about-section {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.about-item {
  padding: 24rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f0f0f0;
}

.contact-section {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.contact-label {
  display: block;
  padding: 24rpx 24rpx 0;
  font-size: 24rpx;
  color: #999;
}

.contact-item {
  padding: 24rpx;
  display: flex;
  align-items: center;
}

.item-value {
  margin-left: auto;
  font-size: 28rpx;
  color: #1890ff;
}

.version-section {
  padding: 24rpx;
  text-align: center;
}

.version-label {
  font-size: 24rpx;
  color: #999;
}
</style>
