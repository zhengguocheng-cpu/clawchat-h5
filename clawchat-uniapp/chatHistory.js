/**
 * ClawChat 聊天记录持久化模块
 * 结构：{ [botId]: [ { content, sender, time } ] }
 */

// 直接使用 pstorage 全局变量（由 persistence.js 暴露）
const storage = window.pstorage;

// 保存单条消息
function saveMessage(botId, msg) {
  if (!botId || !msg || !msg.content) {
    console.warn('[ChatHistory] saveMessage 参数无效');
    return false;
  }

  const history = getHistory(botId) || [];
  history.push({
    content: msg.content,
    sender: msg.sender || 'user',
    time: msg.time || new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  });

  return storage.set('chat_' + botId, history);
}

// 获取聊天记录
function getHistory(botId) {
  if (!botId) return null;
  return storage.get('chat_' + botId, []);
}

// 清空某个机器人的聊天记录
function clearHistory(botId) {
  if (!botId) return false;
  return storage.remove('chat_' + botId);
}

// 获取所有机器人的历史记录概览
function getAllHistorySummaries() {
  const all = [];
  // 遍历所有存储项，找出以 'chat_' 开头的
  for (let i = 0; i < window.pstorage._getAllKeys().length; i++) {
    const key = window.pstorage._getAllKeys()[i];
    if (key.startsWith('chat_')) {
      const botId = key.replace('chat_', '');
      const msgs = getHistory(botId) || [];
      if (msgs.length > 0) {
        all.push({
          botId,
          lastMessage: msgs[msgs.length - 1],
          count: msgs.length
        });
      }
    }
  }
  return all;
}

// 暴露到全局
window.saveMessage = saveMessage;
window.getHistory = getHistory;
window.clearHistory = clearHistory;
window.getAllHistorySummaries = getAllHistorySummaries;

console.log('[ChatHistory] 模块已加载，可在控制台使用: saveMessage, getHistory, clearHistory');
