
export default class UpdaterClient {

	onUpdateAvailable: () => void = null;
	onUpdate: () => boolean|Promise<boolean> = null;
	private registration: ServiceWorkerRegistration = null;
	private nextServiceWorker: ServiceWorker = null;

	constructor() {
		this.onUpdateFound = this.onUpdateFound.bind(this);
		this.onStateChange = this.onStateChange.bind(this);
	}

	async start(
		registrationTask: Promise<ServiceWorkerRegistration>
	) {

		if (!('serviceWorker' in navigator)) {
			return;
		}

		this.registration = await registrationTask;
		this.listenUpdate();
		this.listenController();
	}

	update() {

		const {
			nextServiceWorker
		} = this;

		nextServiceWorker.postMessage({
			action: 'skipWaiting'
		});
	}

	private async listenUpdate() {

		const {
			registration
		} = this;

		registration.addEventListener('updatefound', this.onUpdateFound);
	}

	private async onUpdateFound() {

		const {
			registration
		} = this;
		const nextServiceWorker = registration.installing;

		this.nextServiceWorker = nextServiceWorker;

		nextServiceWorker.addEventListener('statechange', this.onStateChange);
	}

	private onStateChange() {

		const {
			nextServiceWorker,
			onUpdateAvailable
		} = this;

		switch (nextServiceWorker.state) {

			case 'installed':

				if (navigator.serviceWorker.controller
					&& typeof onUpdateAvailable === 'function'
				) {
					onUpdateAvailable();
				}

				break;

			default:
		}
	}

	private listenController() {

		const {
			onUpdate
		} = this;
		let refreshing = false;

		navigator.serviceWorker.addEventListener('controllerchange', async () => {

			if (refreshing
				|| typeof onUpdate !== 'function'
			) {
				return;
			}

			refreshing = await onUpdate();
		});
	}
}
