
declare var self: ServiceWorkerGlobalScope;

export interface IConnectUpdaterHostOptions {
	clearCaches?: boolean|string[];
}

export default class UpdaterHost {

	static connect({
		clearCaches = false
	}: IConnectUpdaterHostOptions = {}) {

		self.addEventListener('message', (event) => {

			if (event.data.action === 'skipWaiting') {
				self.skipWaiting();
			}
		});

		if (clearCaches) {
			UpdaterHost.clearCachesOnInstall(
				Array.isArray(clearCaches)
					? clearCaches
					: undefined
			);
		}
	}

	static async clearCaches(keys?: string[]) {

		const cacheNames = keys || await caches.keys();

		cacheNames.forEach((cacheName) => {
			caches.delete(cacheName);
		});
	}

	static clearCachesOnInstall(keys?: string[]) {

		self.addEventListener('install', (event) => {
			event.waitUntil(
				UpdaterHost.clearCaches(keys)
			);
		});
	}
}
