import {
	cleanupOutdatedCaches,
	precacheAndRoute,
	getCacheKeyForURL
} from 'workbox-precaching';
import {
	registerNavigationRoute,
	registerRoute
} from 'workbox-routing';
import {
	StaleWhileRevalidate
} from 'workbox-strategies';
import UpdaterHost from './util/UpdaterHost';

declare var self: ServiceWorkerGlobalScope;

UpdaterHost.connect();
cleanupOutdatedCaches();

precacheAndRoute(
	self.__precacheManifest.filter(
		({ url }) => !/\/favicons\/.*\.png$/.test(url)
	)
);

registerNavigationRoute(
	getCacheKeyForURL('/index.html')
);

registerRoute(
	/\/favicons\//,
	new StaleWhileRevalidate()
);
