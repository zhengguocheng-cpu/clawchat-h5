/**
 * ClawChat 登录态管理模块
 * 封装用户信息和 token 的持久化
 */

// 直接使用 pstorage 全局变量（由 persistence.js 暴露）
const storage = window.pstorage;

// 保存用户信息
function saveUser(userInfo) {
  // userInfo: { username, nickname, avatar }
  return storage.set('user', userInfo);
}

// 获取用户信息
function getUser() {
  return storage.get('user', null);
}

// 保存 OpenIM token
function saveToken(token) {
  if (!token || typeof token !== 'string') {
    console.warn('[Auth] saveToken: token 无效');
    return false;
  }
  return storage.set('token', token);
}

// 获取 token
function getToken() {
  return storage.get('token', '');
}

// 清除登录态
function clearAuth() {
  storage.remove('user');
  storage.remove('token');
  return true;
}

// 判断是否已登录
function isLoggedIn() {
  const token = getToken();
  return !!token && token.length > 0;
}

// 暴露到全局（所有环境）
window.saveUser = saveUser;
window.getUser = getUser;
window.saveToken = saveToken;
window.getToken = getToken;
window.clearAuth = clearAuth;
window.isLoggedIn = isLoggedIn;

console.log('[Auth] 模块已加载，可在控制台使用: saveUser, getToken, getUser, clearAuth, isLoggedIn');
