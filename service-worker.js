const CACHE_NAME = "semillitas-ventas-v1";

const URLS_TO_CACHE = [
  "index.html",
  "manifest.json",
  "img/semillitas.jpg",
  "img/empanada.jpg",
  "img/papas.jpg",
  "img/icon-192.png",
  "img/icon-512.png"
];

// Instalar: cachea archivos básicos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Activar: limpiar caches viejos si se cambia la versión
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch: responde desde cache primero, luego red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return (
        resp ||
        fetch(event.request).catch(() => {
          // Aquí podrías devolver algo por defecto si lo deseas
        })
      );
    })
  );
});
