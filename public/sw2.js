const cacheName = 'v2'

self.addEventListener('install', e => {
  console.log('Service Worker Installed')
})

self.addEventListener('activate', e => {
  console.log('Service Worker Activated')
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worked Clearing Old Cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', e => {
  console.log('Service Worker Fetching')
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make clone of response
        const resClone = res.clone()
        // Open Cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone)
        })
        return res
      })
      .catch(err => {
        caches.match(e.request).then(res => res)
        console.error(err)
      })
  )
})
