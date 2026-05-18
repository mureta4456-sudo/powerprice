// Minimal service worker — pietiekams, lai Chrome / Edge piedāvātu
// "Install App" un lapa darbotos no kešas, ja tīkls īslaicīgi pazūd.
const CACHE = "powerprice-v1";
const ASSETS = ["/", "/icon-192.png", "/icon-512.png", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // API calls always go to the network — we never want stale prices.
  if (req.url.includes("/api/")) return;
  // Same-origin GETs: network first, fallback to cache.
  if (req.method !== "GET") return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
