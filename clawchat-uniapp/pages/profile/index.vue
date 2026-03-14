<template>
  <view class="profile-container">
    <view class="profile-header">
      <view class="avatar-container">
        <view class="avatar">
          <text class="avatar-text">👤</text>
        </view>
        <button class="change-avatar-btn">换头像</button>
      </view>
      <text class="username">{{ userInfo.username }}</text>
    </view>
    
    <view class="profile-list">
      <view class="list-item" @click="goToEdit('nickname')">
        <view class="list-item-left">
          <text class="list-icon">✏️</text>
          <text class="list-label">昵称</text>
        </view>
        <view class="list-item-right">
          <text class="list-value">{{ userInfo.nickname }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
      
      <view class="list-item" @click="goToEdit('gender')">
        <view class="list-item-left">
          <text class="list-icon">👥</text>
          <text class="list-label">性别</text>
        </view>
        <view class="list-item-right">
          <text class="list-value">{{ userInfo.gender }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
      
      <view class="list-item" @click="goToEdit('birthday')">
        <view class="list-item-left">
          <text class="list-icon">🎂</text>
          <text class="list-label">生日</text>
        </view>
        <view class="list-item-right">
          <text class="list-value">{{ userInfo.birthday }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
      
      <view class="list-item" @click="goToEdit('signature')">
        <view class="list-item-left">
          <text class="list-icon">📝</text>
          <text class="list-label">签名</text>
        </view>
        <view class="list-item-right">
          <text class="list-value">{{ userInfo.signature || '点击设置签名' }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>
    
    <view class="logout-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: 'z ln',
        nickname: 'ZLN',
        gender: '保密',
        birthday: '未设置',
        signature: ''
      }
    }
  },
  methods: {
    goToEdit(field) {
      uni.showToast({
        title: field + '编辑功能开发中',
        icon: 'none'
      })
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.setStorageSync('clawchat_token', '')
            uni.setStorageSync('clawchat_userID', '')
            uni.redirectTo({
              url: '/pages/login/index'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.profile-container {
  padding: 24rpx;
  background: #f5f5f5;
}

.profile-header {
  background: white;
  padding: 40rpx;
  text-align: center;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.avatar-container {
  margin-bottom: 24rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16rpx;
}

.avatar-text {
  font-size: 60rpx;
}

.change-avatar-btn {
  background: #f0f0f0;
  color: #666;
  border-radius: 20rpx;
  padding: 8rpx 24rpx;
  font-size: 24rpx;
}

.username {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.profile-list {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.list-item-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.list-icon {
  margin-right: 16rpx;
  font-size: 28rpx;
}

.list-label {
  font-size: 28rpx;
  color: #333;
}

.list-item-right {
  display: flex;
  align-items: center;
}

.list-value {
  font-size: 28rpx;
  color: #666;
  margin-right: 12rpx;
}

.arrow {
  font-size: 32rpx;
  color: #c0c0c0;
}

.logout-section {
  margin-top: 24rpx;
  padding: 24rpx;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  background: #ff4d4f;
  color: white;
  border-radius: 16rpx;
  font-size: 32rpx;
}
</style>
