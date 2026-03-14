<template>
  <view class="register-container">
    <view class="logo-area">
      <text class="logo-text">🤖</text>
      <text class="app-name">ClawChat</text>
      <text class="app-desc">注册账号</text>
    </view>
    
    <view class="form-area">
      <view class="form-item">
        <input 
          class="input" 
          type="text" 
          placeholder="用户名（3-20位）"
          v-model="username"
        />
      </view>
      
      <view class="form-item">
        <input 
          class="input" 
          type="email" 
          placeholder="邮箱"
          v-model="email"
        />
      </view>
      
      <view class="form-item">
        <input 
          class="input" 
          type="password" 
          placeholder="密码（6-20位）"
          v-model="password"
        />
      </view>
      
      <view class="form-item">
        <input 
          class="input" 
          type="password" 
          placeholder="确认密码"
          v-model="confirmPassword"
        />
      </view>
      
      <button class="btn-register" @click="handleRegister">
        注册
      </button>
      
      <view class="login-link">
        已有账号？<text class="link" @click="goToLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleRegister() {
      // 表单验证
      if (!this.username || this.username.length < 3) {
        uni.showToast({
          title: '用户名至少3位',
          icon: 'none'
        })
        return
      }
      
      if (!this.email || !this.email.includes('@')) {
        uni.showToast({
          title: '请输入有效邮箱',
          icon: 'none'
        })
        return
      }
      
      if (!this.password || this.password.length < 6) {
        uni.showToast({
          title: '密码至少6位',
          icon: 'none'
        })
        return
      }
      
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return
      }
      
      // TODO: 调用后端注册API
      console.log('注册:', {
        username: this.username,
        email: this.email
      })
      
      uni.showToast({
        title: '注册成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/login/index'
        })
      }, 1500)
    },
    goToLogin() {
      uni.redirectTo({
        url: '/pages/login/index'
      })
    }
  }
}
</script>

<style>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logo-area {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo-text {
  font-size: 60rpx;
}

.app-name {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: white;
  margin-bottom: 12rpx;
}

.app-desc {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.form-area {
  width: 100%;
  max-width: 500rpx;
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
}

.form-item {
  margin-bottom: 24rpx;
}

.input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 16rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}

.btn-register {
  width: 100%;
  height: 80rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16rpx;
  font-size: 32rpx;
  margin-top: 24rpx;
}

.login-link {
  text-align: center;
  margin-top: 32rpx;
  font-size: 28rpx;
  color: #999;
}

.link {
  color: #667eea;
  margin-left: 8rpx;
}
</style>
