const CACHE_NAME = "portfolio-v2";
const urlsToCache = ["/", "/offline.html", "/manifest.json", "/icon.png"];

self.addEventListener("install", (event: any) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event: any) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", (event: any) => {
    const request = event.request;

    // For navigation requests (HTML pages), use Network First
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((response) => {
                        return response || caches.match("/offline.html");
                    });
                })
        );
        return;
    }

    // For other requests, use Stale-While-Revalidate
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, networkResponse.clone());
                });
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        })
    );
});
