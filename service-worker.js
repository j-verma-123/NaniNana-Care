const CACHE_NAME = "hackthon-pwa-v1";
const urlsToCache = [
  "./",
  "./style.css",
  "./app.js",
  "./verify.html",
  "./profile.html",
  "./reminder.html",
  "./schedule.html",
  "./reports.html",
  "./upload.html",
  "./alerts.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
