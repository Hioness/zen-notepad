/* Zen Notepad service worker — offline shell + cache-first assets.
 * Precaches only the app shell and the two critical font faces.
 * Everything else (other weights, DOMPurify CDN) is runtime-cached
 * on first use so install stays small and fast. */
const CACHE = 'zen-notepad-v1';

const CORE = [
  './',
  'index.html',
  'site.webmanifest',
  'assets/favicon.svg',
  'assets/fonts/inter-400-latin.woff2',
  'assets/fonts/jetbrainsmono-400-latin.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cacheFirst(request) {
  return caches.match(request, { ignoreSearch: false }).then((hit) => {
    if (hit) return hit;
    return fetch(request).then((res) => {
      if (res && (res.status === 200 || res.status === 0)) {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return res;
    });
  });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Navigations: network first so note-taking HTML updates flow,
  // fall back to cache offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('index.html', copy));
          return res;
        })
        .catch(() => caches.match('index.html').then((hit) => hit || caches.match('./')))
    );
    return;
  }

  // Same-origin static assets (fonts, icons, manifest): cache first.
  if (url.origin === self.location.origin) {
    if (url.pathname.includes('/assets/') || url.pathname.endsWith('.webmanifest')) {
      event.respondWith(cacheFirst(request));
    }
    return;
  }

  // DOMPurify CDN: cache first with network fill (stale-while-revalidate).
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(cacheFirst(request));
  }
});
