const CACHE_NAME = "firstpwa-v2";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/push.js",
  "/detail.html",
  "/pages/team.html",
  "/pages/league.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/manifest.json",
  "/package-lock.json",
  "/js/nav.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/script.js",
  "/img/bola.png",
  "/img/img512.png",
  "/img/logo192.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://api.football-data.org/v2/teams";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
