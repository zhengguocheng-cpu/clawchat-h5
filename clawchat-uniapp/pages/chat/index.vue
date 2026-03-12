// 聊天页面 - 使用 OpenIM SDK
import config from '../config/index.js';
import OpenIMSDK from '../sdk/OpenIMSDK.js';

export default {
  data() {
    return {
      inputValue: '',
      messages: [
        {
          content: '你好！我是 ClawChat 助手，有什么可以帮你的吗？',
          sender: 'bot',
          time: '10:30'
        }
      ],
      sdk: null
    }
  },
  onReady() {
    // 初始化 SDK
    this.sdk = new OpenIMSDK(config)
    this.sdk.onMessage(this.handleIncomingMessage)
  },
  methods: {
    async handleSend() {
      if (!this.inputValue.trim()) return
      
      // 添加用户消息
      const userMsg = {
        content: this.inputValue.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      
      this.messages.push(userMsg)
      const currentInput = this.inputValue
      this.inputValue = ''
      
      // 调用 OpenIM 发送消息
      try {
        await this.sdk.sendMessage('bot_001', currentInput.trim())
        console.log('消息发送成功')
      } catch (error) {
        console.error('消息发送失败:', error)
        uni.showToast({
          title: '发送失败',
          icon: 'none'
        })
      }
    },
    handleIncomingMessage(message) {
      console.log('收到新消息:', message)
      
      // 添加机器人回复
      const botMsg = {
        content: message.content || '收到！',
        sender: 'bot',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      
      this.messages.push(botMsg)
    }
  }
}
