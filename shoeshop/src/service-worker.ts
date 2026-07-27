/// <reference types="@sveltejs/kit" />

import { build, files, version } from '$service-worker';

const CACHE = `shoeshop-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
			);
		})
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cached) => {
			const fetched = fetch(event.request).then((response) => {
				if (response.ok) {
					const clone = response.clone();
					caches.open(CACHE).then((cache) => cache.put(event.request, clone));
				}
				return response;
			});
			return cached || fetched;
		})
	);
});
