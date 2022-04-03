self.addEventListener("install", function (event) {
    //console.log("[Service Worker Installed] ...", event);
    // caches.open is an async operation, if we dont use waitUntil then it might happen that installation ends and cache hasnt got created yet and service worker's fetch is trying to access the cache and it might cause some issue.
    event.waitUntil(caches.open("precache").then(function (cache) { // precache is the name given to the cache
        console.log(cache);
        cache.addAll(["/","/index.html","/src/js/app.js","/src/js/feed.js","/src/js/material.min.js","/src/css/app.css","/src/css/feed.css","/src/images/main-image.jpg"])
    }))
})

self.addEventListener("activate", function (event) {
    //console.log("[Service Worker Activated] ...", event);
    return self.clients.claim();
})

self.addEventListener("fetch", function (event) {
    //console.log("[Service Worker Fetching] ...", event);
    // below will not render any content on the screen and you will get the site cant be reached
    // event.respondWith(null)
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            else {
                return fetch(event.request);
            }
        })
    );
})