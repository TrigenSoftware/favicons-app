// tslint:disable space-in-parens
import * as Comlink from 'comlink';
import {
	IWorkerConfig,
	IFaviconsWorker,
	IResultFile
} from './FaviconsWorker';

export {
	IManifestConfig,
	IHeadersConfig
} from '@flexis/favicons/lib/core';

export {
	IWorkerConfig,
	IResultFile
};

export const isOffscreenSupported = typeof OffscreenCanvas !== 'undefined';

let isWebWorkerUsed = false;
let faviconsWorkerAccess = createFaviconsWorker(false);

async function createFaviconsWorker(shouldUseWebWorker?: boolean) {

	const params = new URLSearchParams(location.search);
	const useOffscreenParam = JSON.parse(
		params.get('offscreen')
	);
	const useWebWorkerParam = JSON.parse(
		params.get('webworker')
	);
	const useOffscreen = typeof useOffscreenParam === 'boolean'
		? useOffscreenParam
		: isOffscreenSupported;
	const useWebWorker = useOffscreen && (
		typeof useWebWorkerParam === 'boolean'
			? useWebWorkerParam
			: typeof shouldUseWebWorker === 'boolean'
				? shouldUseWebWorker
				: isOffscreenSupported
	);

	isWebWorkerUsed = useWebWorker;

	if (!useWebWorker) {

		const {
			default: FaviconsWorker
		} = await import(/* webpackChunkName: 'favicons.worker' */ './FaviconsWorker');
		const workerInstance = new FaviconsWorker(useOffscreen);

		return workerInstance;
	}

	const {
		default: FaviconsWorker
	} = await import(/* webpackChunkName: 'favicons.webworker' */ './Favicons.worker?tw');
	const FaviconsWorkerClass: any = Comlink.wrap(
		new FaviconsWorker()
	);
	const workerInstance: IFaviconsWorker = await new FaviconsWorkerClass(useOffscreen);

	return workerInstance;
}

export function setUseWebWorker(useWebWorker: boolean) {
	faviconsWorkerAccess = createFaviconsWorker(useWebWorker);
}

export function getUseWebWorker() {
	return isWebWorkerUsed;
}

export async function setFile(file: File) {

	const faviconsWorker = await faviconsWorkerAccess;

	await faviconsWorker.setFile(file);
}

export async function setConfig(config: IWorkerConfig) {

	const faviconsWorker = await faviconsWorkerAccess;

	await faviconsWorker.setConfig(config);
}

export async function generate() {

	const faviconsWorker = await faviconsWorkerAccess;

	await faviconsWorker.generate();
}

export async function createArchive() {

	const faviconsWorker = await faviconsWorkerAccess;

	await faviconsWorker.createArchive();
}

export async function onResult(listener: (file: IResultFile) => void) {

	const faviconsWorker = await faviconsWorkerAccess;

	faviconsWorker.onResult = Comlink.proxy(listener);

	return () => {
		faviconsWorker.onResult = null;
	};
}
