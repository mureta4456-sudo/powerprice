// Service worker for PowerPrice PWA
// -----------------------------------
// Stratēģija ir veidota tā, lai katrs jauns deploy sasniegtu lietotājus
// UZREIZ pēc lapas atvēršanas:
//   - HTML / navigācijas pieprasījumi -> tikai tīkls (nekad nerādām vecu HTML)
//   - Vite "hashotie" statiskie aktīvi (JS / CSS / attēli) -> cache-first
//     (droši, jo Vite katram buildam ģenerē unikālus failu nosaukumus)
//   - /api/* pieprasījumi -> tikai tīkls (cenas un padomi vienmēr svaigi)
//   - Cross-origin pieprasījumi -> neaiztiekam
//
// SVARĪGI: katru reizi, kad maini stratēģiju, palielini CACHE versiju
// (piem. "powerprice-v3" -> "powerprice-v4"). Vecās kešas tiks dzēstas
// automātiski "activate" solī.

const CACHE = "powerprice-v4";

// Pre-cache tikai aktīvi, kuru URL nemainās starp buildiem
// (Vite tos NEhashed — jo tie atrodas /public/ mapē).
const STATIC_PRECACHE = [
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC_PRECACHE))
  );
  // Aktivizē jauno SW uzreiz, negaidot, kad lietotājs aizvērs visus tabus.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Izdzēšam visas vecās kešas (jebkuru, kuras nosaukums nav pašreizējais CACHE).
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
    );
    // Pārņemam kontroli pār visām atvērtām lapām bez "hard reload".
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Apstrādājam tikai GET pieprasījumus.
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Neaiztiekam cross-origin pieprasījumus (GoatCounter analytics, fonti utt.).
  if (url.origin !== self.location.origin) return;

  // API pieprasījumi vienmēr iet uz tīklu — cenas un AI padomi nedrīkst būt stale.
  if (url.pathname.startsWith("/api/")) return;

  // HTML / navigācijas pieprasījumi: VIENMĒR uz tīklu.
  // Šī ir galvenā izmaiņa — teksta izmaiņas no i18n.ts un blogPosts.ts
  // parādīsies uzreiz pēc katra deploy.
  const isNavigation =
    req.mode === "navigate" ||
    req.destination === "document" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNavigation) {
    event.respondWith(
      fetch(req).catch(async () => {
        // Offline fallback: ja tīkls nav pieejams, mēģinām serverēt kešoto app shell.
        const cached = await caches.match("/");
        return (
          cached ||
          new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          })
        );
      })
    );
    return;
  }

  // Statiskie aktīvi (JS, CSS, attēli, fonti): cache-first.
  // Tas ir droši, jo Vite produktē tos ar hash failu nosaukumiem
  // (piem. index-abc123.js), tāpēc vecie aktīvi vairs netiks pieprasīti
  // pēc tam, kad JS bundle ir mainījies.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // Kešojam tikai veiksmīgas, same-origin atbildes.
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
