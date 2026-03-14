/**
 * ClawChat 持久化存储工具
 * 所有 key 都加前缀 clawchat_ 避免污染
 */

const STORAGE_PREFIX = 'clawchat_';

// 简单加密（非安全级别，仅防止明文查看）
function encode(data) {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return '';
  }
}

function decode(str) {
  try {
    return JSON.parse(atob(str));
  } catch {
    return null;
  }
}

const storage = {
  // 设置
  set(key, value) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, encode(value));
      return true;
    } catch (e) {
      console.error('[Storage] set error:', e);
      return false;
    }
  },

  // 获取
  get(key, defaultValue = null) {
    try {
      const val = window.localStorage.getItem(STORAGE_PREFIX + key);
      if (val == null) return defaultValue;
      const decoded = decode(val);
      return decoded === null ? defaultValue : decoded;
    } catch {
      return defaultValue;
    }
  },

  // 删除
  remove(key) {
    try {
      window.localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },

  // 清空 ClawChat 相关
  clear() {
    try {
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keys.push(k);
        }
      }
      keys.forEach(k => window.localStorage.removeItem(k));
      return true;
    } catch {
      return false;
    }
  },

  // 获取所有 ClawChat key（仅测试用）
  _getAllKeys() {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keys.push(k.replace(STORAGE_PREFIX, ''));
      }
    }
    return keys;
  }
};

// 暴露到全局，方便测试
window.pstorage = storage;

export default storage;
