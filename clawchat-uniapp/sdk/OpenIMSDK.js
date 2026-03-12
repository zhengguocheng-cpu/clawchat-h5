// OpenIM SDK 封装
class OpenIMSDK {
  constructor(config) {
    this.config = config;
    this.ws = null;
    this.token = '';
    this.userID = '';
    this.messageCallbacks = {};
    this.isConnected = false;
    this.reconnectTimer = null;
  }

  // 初始化 SDK
  init() {
    console.log('OpenIMSDK 初始化');
  }

  // 登录
  async login(userID, token) {
    this.userID = userID;
    this.token = token;
    
    // 连接 WebSocket
    await this.connectWebSocket();
    
    return { success: true, userID, token };
  }

  // 连接 WebSocket
  async connectWebSocket() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.openIM.wsUrl);
        
        this.ws.onopen = () => {
          console.log('WebSocket 连接成功');
          this.isConnected = true;
          this.startHeartbeat();
          resolve({ success: true });
        };
        
        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };
        
        this.ws.onerror = (error) => {
          console.error('WebSocket 错误:', error);
          this.reconnect();
        };
        
        this.ws.onclose = () => {
          console.log('WebSocket 连接关闭');
          this.isConnected = false;
          this.reconnect();
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  // 处理消息
  handleMessage(data) {
    try {
      const message = JSON.parse(data);
      console.log('收到消息:', message);
      
      // 处理不同类型的消息
      if (message.apiName === 'SingleChat') {
        this.triggerMessage(message.data);
      }
      
      // 通知回调
      if (this.messageCallbacks[message.opCode]) {
        this.messageCallbacks[message.opCode](message);
      }
    } catch (err) {
      console.error('消息解析错误:', err);
    }
  }

  // 触发消息回调
  triggerMessage(data) {
    if (this.onMessage) {
      this.onMessage(data);
    }
  }

  // 心跳保活
  startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.sendPing();
      }
    }, this.config.websocket.heartbeatInterval);
  }

  // 发送心跳
  sendPing() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        apiName: 'WebSocketHeartbeat',
        opCode: 10001,
        data: { time: Date.now() }
      }));
    }
  }

  // 重连
  reconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    
    this.reconnectTimer = setTimeout(() => {
      console.log('尝试重连...');
      this.connectWebSocket();
    }, this.config.websocket.reconnectInterval);
  }

  // 发送单聊消息
  sendMessage(toUserID, content) {
    return new Promise((resolve, reject) => {
      if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('未连接到服务器'));
        return;
      }

      const message = {
        apiName: 'SendMessage',
        opCode: 20001,
        data: {
          toUserID: toUserID,
            contentType: 1, // 文本消息
          content: content,
          sendTime: Date.now(),
          nickname: 'current_user'
        }
      };

      this.ws.send(JSON.stringify(message));
      
      // 模拟成功回调
      resolve({
        success: true,
        messageID: 'msg_' + Date.now(),
        sendTime: Date.now()
      });
    });
  }

  // 关闭连接
  close() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      this.ws.close();
    }
  }

  // 监听消息
  onMessage(callback) {
    this.onMessage = callback;
  }
}

export default OpenIMSDK;
