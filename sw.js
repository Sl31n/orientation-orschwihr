// ═══════════════════════════════════════════
// SERVICE WORKER — EVG Orschwihr PWA
// ═══════════════════════════════════════════
var CACHE = 'orschwihr-v7';
var PRECACHE = ['./', './index.html', './data.js', './game.js', './logo.png', './manifest.json', './Carte.png', './badge.png', './emblem-grec.webp', './emblem-nordique.webp', './emblem-hindou.webp', './emblem-egyptien.webp', './splash-compass.webp', './victory-laurel.webp', './bg-parchment.webp', './cp-eglise.webp', './cp-fontaine.webp', './cp-mairie.webp', './cp-cave.webp', './cp-secret.webp', './bg-grec.webp', './bg-nordique.webp', './bg-hindou.webp', './bg-egyptien.webp'];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(PRECACHE); })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  if (url.indexOf('fonts.googleapis.com') > -1 || url.indexOf('fonts.gstatic.com') > -1) {
    e.respondWith(
      caches.open(CACHE).then(function(c) {
        return c.match(e.request).then(function(cached) {
          if (cached) return cached;
          return fetch(e.request).then(function(res) { c.put(e.request, res.clone()); return res; });
        });
      })
    );
    return;
  }
  e.respondWith(
    fetch(e.request).then(function(res) {
      var clone = res.clone();
      caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});

self.addEventListener('message', function(e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
