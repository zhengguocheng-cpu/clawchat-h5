# ClawChat 前端配置
const config = {
  // OpenIM 服务器配置
  openIM: {
    apiUrl: 'https://www.clawchat.com.cn/api',
    wsUrl: 'wss://www.clawchat.com.cn/ws',
    // 临时测试账户（可替换）
    testUser: {
      userID: 'test_user_' + Date.now(),
      token: ''
    }
  },
  
  // WebSocket 配置
  websocket: {
    reconnectInterval: 3000,
    heartbeatInterval: 30000
  },
  
  // 其他配置
  app: {
    name: 'ClawChat',
    version: '1.0.0'
  }
}

export default config
