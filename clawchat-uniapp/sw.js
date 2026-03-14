// Service Worker for ClawChat
const CACHE_NAME = 'clawchat-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/static/tabbar/chat.png',
  '/static/tabbar/chat-active.png',
  '/static/tabbar/bot.png',
  '/static/tabbar/bot-active.png',
  '/static/tabbar/user.png',
  '/static/tabbar/user-active.png'
];

// Install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Push notification
self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/static/icons/icon-192x192.png'
  });
});
