import Vinyl from 'vinyl';

export async function arrayBufferFromBlob(blob: Blob) {

	const arrayBuffer = await new Response(blob).arrayBuffer();

	return arrayBuffer;
}

export async function vinylFromFile(file: File) {
	return new Vinyl({
		path:     file.name,
		contents: Buffer.from(
			await arrayBufferFromBlob(file)
		)
	});
}

export async function arrayBufferFromUrl(url: string) {

	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	return buffer;
}

export function urlFromBuffer(buffer: BlobPart) {

	const blob = new Blob([buffer]);
	const url = URL.createObjectURL(blob);

	return url;
}
