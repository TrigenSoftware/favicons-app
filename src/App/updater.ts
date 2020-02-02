import UpdaterClient from './util/UpdaterClient';

export default function initUpdater(registration: Promise<ServiceWorkerRegistration>) {

	const updater = new UpdaterClient();

	updater.onUpdateAvailable = () => {

		if (confirm('A new version is available. Refresh?')) {
			updater.update();
		}
	};

	updater.onUpdate = () => {
		location.reload();
		return true;
	};

	updater.start(registration);
}
