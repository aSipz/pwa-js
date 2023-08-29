const assets = [
    '/',
    'styles.css',
    'app.js',
    'sw-register.js',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open('assets')
        .then(cache => {
            cache.addAll(assets);
        })
    );
});

// Stale while revalidate strategy
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(cachedResponse => {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                const fetchPromise = fetch(e.request)
                    .then(networkResponse => {
                        caches.open('assets').then(cache => {
                            cache.put(e.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                // We use the currently cached version if it's there
                return cachedResponse || fetchPromise; // cached or a network fetch
            })
    );
});

// cache first
// self.addEventListener('fetch', e => {
//     e.respondWith(
//         caches.match(e.request)
//             .then(cachedResponse => {
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 } else {
//                     return fetch(e.request);
//                 }
//             })
//     );
// });

// Network first strategy
// self.addEventListener('fetch', e => {
//     e.respondWith(
//         fetch(e.request) // I go to the network ALWAYS
//             .catch(error => {  // if the network is down, I go to the cache
//                 return caches.open("assets")
//                     .then(cache => {
//                         return cache.match(e.request);
//                     });
//             })
//     );
// });