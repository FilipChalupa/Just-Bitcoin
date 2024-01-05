const VERSION = 'v2'

const tickerEndpoints = [
	'https://api.gemini.com/v2/ticker/btcusd',
	'https://api.gemini.com/v2/ticker/btceur',
	'https://api.gemini.com/v2/ticker/btcgbp',
]

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.open(VERSION).then(function (cache) {
			return cache.match(event.request).then(function (cacheResponse) {
				const fetchPromise = fetch(event.request).then(function (
					networkResponse,
				) {
					cache.put(event.request, networkResponse.clone())
					return networkResponse
				})
				return cacheResponse || fetchPromise
			})
		}),
	)
})

self.addEventListener('periodicsync', (event) => {
	event.waitUntil(async () => {
		if (event.tag == 'get-latest-price') {
			const cache = await caches.open(VERSION)
			for (const endpoint of tickerEndpoints) {
				await cache.add(endpoint)
			}
		}
	})
})
