var CACHE_NAME = 'indexdb-sample-cache-v1';
var urlsToCache = [
    '/counter',
    '/counter/manifest.json',
    '/counter/css/style.css',
    '/counter/js/serviceworker.js',
    '/counter/js/count.js'
];

// インストール処理
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
