import Vinyl from 'vinyl';
import {
	IConfig,
	IHeadersConfig,
	getHtmlHeadersMarkup
} from '@flexis/favicons/lib/core';
import {
	vinylFromFile,
	urlFromBuffer
} from './util';
import FaviconsGenerator, {
	imageProcessorAccess
} from './FaviconsGenerator';

export interface IWorkerConfig extends IConfig {
	/**
	 * Background color for icons and startup images.
	 */
	background?: string;
	/**
	 * Create html-file with headers for icons.
	 */
	headers?: boolean|IHeadersConfig;
}

export interface IResultFile {
	url: string;
	name: string;
	contents?: string;
}

export default class FaviconsWorker {

	onResult: (file: IResultFile) => void;
	private config: IWorkerConfig = null;
	private file: Vinyl = null;
	private readonly output: Vinyl[] = [];

	constructor(
		readonly useOffscreenCanvas = typeof OffscreenCanvas !== 'undefined'
	) {}

	async setFile(file: File) {
		this.file = await vinylFromFile(file);
	}

	async setConfig(config: IWorkerConfig) {
		this.config = config;
	}

	async generate() {

		const {
			useOffscreenCanvas,
			config,
			file,
			output
		} = this;
		const {
			headers,
			manifest
		} = config;
		const favicons = new FaviconsGenerator(
			config,
			useOffscreenCanvas
		);
		const icons = favicons.generateIcons(file);

		output.length = 0;

		for await (const icon of icons) {
			this.pushOutput(icon);
		}

		if (headers) {

			const htmlHeaders = favicons.generateHtmlHeaders(
				headers === true
					? {}
					: headers
			);
			const contents = `${getHtmlHeadersMarkup(htmlHeaders)}\n`;
			const file = new Vinyl({
				contents: Buffer.from(contents),
				path:    'favicons.html'
			});

			this.pushOutput(file, contents);
		}

		if (manifest) {

			const manifest = favicons.generateManifset();
			const contents = `${JSON.stringify(manifest, null, '  ')}\n`;
			const file = new Vinyl({
				contents: Buffer.from(contents),
				path:     'manifest.json'
			});

			this.pushOutput(file, contents);
		}
	}

	private pushOutput(file: Vinyl, contents?: string) {

		const {
			onResult,
			output
		} = this;
		const url = urlFromBuffer(file.contents as Buffer);

		output.push(file);

		if (typeof onResult === 'function') {
			onResult({
				url,
				name: file.path,
				contents
			});
		}
	}

	async createArchive() {

		const {
			onResult,
			output
		} = this;
		const imageProcessor = await imageProcessorAccess;
		const archive = await imageProcessor.createArchive(output);
		const url = urlFromBuffer(archive);

		if (typeof onResult === 'function') {
			onResult({
				url,
				name: 'icons.zip'
			});
		}
	}
}

export interface IFaviconsWorker extends FaviconsWorker {}
