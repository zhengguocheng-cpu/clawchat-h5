// 登录页面 - 使用 OpenIM SDK
import config from '../config/index.js';
import OpenIMSDK from '../sdk/OpenIMSDK.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      sdk: null
    }
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        uni.showToast({
          title: '请输入用户名和密码',
          icon: 'none'
        })
        return
      }
      
      this.loading = true
      
      try {
        // 初始化 SDK
        this.sdk = new OpenIMSDK(config)
        this.sdk.init()
        
        // 登录（模拟）
        // 实际应该调用 OpenIM LoginAPI
        const response = await this.sdk.login(this.username, this.password)
        
        if (response.success) {
          // 保存 token
          uni.setStorageSync('clawchat_token', response.token)
          uni.setStorageSync('clawchat_userID', response.userID)
          
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/chat/index'
            })
          }, 1500)
        }
      } catch (error) {
        console.error('登录失败:', error)
        uni.showToast({
          title: '登录失败: ' + error.message,
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    goToRegister() {
      uni.showToast({
        title: '注册功能开发中',
        icon: 'none'
      })
    }
  }
}
