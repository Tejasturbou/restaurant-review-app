self.addEventListener('install', function(evt){
	evt.waitUntil(
		caches.open('restaurant-review').then(function(cache){
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/css/responsive.css',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg',
			]);
		})
	);
});


//
self.addEventListener('fetch', function(evt){
	evt.respondWith(
		caches.match(evt.request).then(function(response){
			return response ? response : fetch(evt.request).then(function(respond){
				if (respond.status === 404) {
					return;
				}
				return caches.open('restaurant-review').then(function(cache){
					cache.put(evt.request.url, respond.clone());
					return respond;
				})
			}).catch(function(){
				return new Response('Your device is Offline, connect to internet');
			});
		})
	);
});

