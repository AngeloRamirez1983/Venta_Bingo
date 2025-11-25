const CACHE_NAME = "semillitas-ventas-v2";

const URLS_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "img/semillitas.jpg",
  "img/empanada.jpg",
  "img/papas.jpg",
  "img/icon-192.png",
  "img/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Si quieres, aquí podrías devolver una página offline.
          return cachedResponse;
        })
      );
    })
  );
});
