const VERSION = 'v1'

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.open(VERSION).then(function (cache) {
			return cache.match(event.request).then(function (response) {
				var fetchPromise = fetch(event.request).then(function (
					networkResponse,
				) {
					cache.put(event.request, networkResponse.clone())
					return networkResponse
				})
				return response || fetchPromise
			})
		}),
	)
})

self.addEventListener('periodicsync', (event) => {
	event.waitUntil(async () => {
		if (event.tag == 'get-latest-price') {
			const cache = await caches.open(VERSION)
			await cache.add('https://api.coindesk.com/v1/bpi/currentprice.json')
		}
	})
})
