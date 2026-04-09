const CACHE_NAME = "portfolio-v2-precache-__CACHE_VERSION__";

// This will be populated by the build script
// const __PRECACHE_MANIFEST__ = [...];
// Fallback if not injected (dev mode)
const urlsToCache = (
  typeof __PRECACHE_MANIFEST__ !== "undefined" ? __PRECACHE_MANIFEST__ : []
).concat(["/", "/offline.html", "/manifest.json", "/icon.png"]);

self.addEventListener("install", (event) => {
  // skipWaiting to force new SW to take control immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(urlsToCache).catch(() => {})
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        }),
      );
    }),
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-http requests (like extensions) and non-GET requests
  if (!url.protocol.startsWith("http")) return;
  if (request.method !== "GET") return;

  // For navigation requests (HTML pages), Network First for freshness, fallback to Cache
  // Actually, for a static site, we might want Stale-While-Revalidate or Cache First?
  // User requested "no loading time extra taken faster loading" -> Cache First for everything is fastest.
  // BUT we need to be careful about updates.
  // Since we version CACHE_NAME in the build script (conceptually we should, but here I used a Date string which changes daily? No, better to use a hash or static string if we rely on SW update life cycle).
  // The build script doesn't update the CACHE_NAME variable in this source file.
  // However, since we replace the SW file content in `out`, browser detects byte difference => new version => install => skipWaiting => activate => delete old cache.
  // So Cache First is safe provided the SW file itself changes. The injection of manifest ENSURES sw.js changes on every build (if content changes).

  // Strategy: Cache First, Network Fallback for assets.
  // Network First for HTML? Or Cache First?
  // If we want "faster loading", Cache First is best. Check for updates in background?
  // Let's go with Cache First for everything consistent with the manifest.

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          // Dynamically cache new requests too?
          // Probably yes for things not in manifest (like external images)
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match("/offline.html");
        });
    }),
  );
});
