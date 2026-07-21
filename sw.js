// service worker do música de hoje — push dos favoritos (v1) e alma
// de PWA (sem cache offline por ora: o mapa é vivo por natureza)
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  e.waitUntil(self.registration.showNotification(
    d.title || 'música de hoje',
    {
      body: d.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: d.url || '/' },
    }
  ));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.openWindow(e.notification.data && e.notification.data.url || '/'));
});
