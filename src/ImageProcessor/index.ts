import './wasm_exec';
import Vinyl from 'vinyl';
// @ts-ignore
import imageProcessorUrl from './main.wasm';

declare const Go: any;

export interface IImageProcessorRenderOptions {
	width: number;
	height: number;
	offset: number;
	background: string;
}

export interface IImageProcessorInfo {
	width: number;
	height: number;
	format: string;
}

export interface IImageProcessor {
	getImageInfo(
		source: ArrayBuffer | Uint8Array | Buffer
	): Promise<IImageProcessorInfo>;
	renderIcon(
		source: ArrayBuffer | Uint8Array | Buffer,
		options: IImageProcessorRenderOptions
	): Promise<Uint8Array>;
	createArchive(
		files: Vinyl[]
	): Promise<Uint8Array>;
}

export default async function createImageProcessor() {

	const go = new Go();
	const fetchTask = fetch(imageProcessorUrl);
	let result: WebAssembly.WebAssemblyInstantiatedSource = null;

	if (WebAssembly.instantiateStreaming && process.env.BDSL_ENV !== 'defaults') {
		result = await WebAssembly.instantiateStreaming(
			fetchTask,
			go.importObject
		);
	} else {

		const response = await fetchTask;
		const program = await response.arrayBuffer();

		result = await WebAssembly.instantiate(program, go.importObject);
	}

	go.run(result.instance);

	return (global as any).ImageProcessor as IImageProcessor;
}
