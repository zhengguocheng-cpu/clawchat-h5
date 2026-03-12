// 同步 H5 页面到最新配置
const config = {
  openIM: {
    apiUrl: 'http://127.0.0.1:10001/api',
    wsUrl: 'ws://127.0.0.1:10001/ws'
  },
  app: {
    name: 'ClawChat',
    version: '1.0.0'
  }
};

// OpenIM SDK 类
class OpenIMSDK {
  constructor(config) {
    this.config = config;
    this.ws = null;
    this.token = '';
    this.userID = '';
    this.isConnected = false;
    this.reconnectTimer = null;
  }

  async init() { console.log('OpenIMSDK 初始化'); }

  async login(userID, password) {
    try {
      const loginResponse = await fetch(this.config.openIM.apiUrl + '/base/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, password, platformID: 2, operationID: Date.now() + '' })
      }).then(r => r.json());

      if (loginResponse.errCode !== 0) throw new Error(loginResponse.errMsg || '登录失败');

      this.userID = loginResponse.data.userID;
      this.token = loginResponse.data.token;

      localStorage.setItem('clawchat_token', this.token);
      localStorage.setItem('clawchat_userID', this.userID);

      await this.connectWebSocket();
      return { success: true, userID: this.userID, token: this.token };
    } catch (e) { console.error('登录失败:', e); throw e; }
  }

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
        this.ws.onmessage = (e) => this.handleMessage(e.data);
        this.ws.onerror = () => this.reconnect();
        this.ws.onclose = () => { this.isConnected = false; this.reconnect(); };
      } catch (e) { reject(e); }
    });
  }

  handleMessage(data) {
    try {
      const msg = JSON.parse(data);
      console.log('收到消息:', msg);
      if (this.messageCallbacks && this.messageCallbacks['SingleChat']) {
        this.messageCallbacks['SingleChat'](msg.data);
      }
    } catch (e) { console.error('解析错误:', e); }
  }

  startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ apiName: 'WebSocketHeartbeat', opCode: 10001, data: { time: Date.now() } }));
      }
    }, 30000);
  }

  reconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      console.log('重连中...');
      this.connectWebSocket();
    }, 3000);
  }

  async sendMessage(toUserID, content) {
    if (!this.isConnected || !this.ws) throw new Error('未连接');
    this.ws.send(JSON.stringify({
      apiName: 'SendMessage',
      opCode: 20001,
      data: { toUserID, contentType: 1, content, sendTime: Date.now(), nickname: this.userID, token: this.token }
    }));
    return { success: true, messageID: 'msg_' + Date.now() };
  }

  onMessage(callback) { this.messageCallbacks = this.messageCallbacks || {}; this.messageCallbacks['SingleChat'] = callback; }

  close() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) this.ws.close();
  }
}

export { OpenIMSDK, config };
