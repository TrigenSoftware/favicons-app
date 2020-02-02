// tslint:disable: no-magic-numbers
import {
	IConfig,
	IRenderConfig,
	ISize,
	FaviconsGenerator as FaviconsGeneratorBase,
	isIco,
	isSvg
} from '@flexis/favicons/lib/core';
import {
	DOMParser
} from 'xmldom';
import Canvg, {
	presets
} from 'canvg';
import Vinyl from 'vinyl';
import createImageProcessor from '~/../ImageProcessor';
import {
	arrayBufferFromBlob,
	arrayBufferFromUrl
} from './util';

const offscreenPreset = presets.offscreen({
	DOMParser
});

export const imageProcessorAccess = createImageProcessor();

export default class FaviconsGenerator extends FaviconsGeneratorBase {

	constructor(
		config: IConfig,
		protected readonly useOffscreenCanvas = false
	) {
		super(config);
	}

	protected async attachMetadata(source: Vinyl) {

		if (typeof source.metadata === 'object') {
			return source;
		}

		if (isIco(source.basename)) {
			source.metadata = {
				format: 'ico',
				width:  16,
				height: 16
			};
		} else {

			const imageProcessor = await imageProcessorAccess;

			source.metadata = await imageProcessor.getImageInfo(source.contents as Buffer);
		}

		return source;
	}

	protected async renderIcon(
		[source]: Vinyl[],
		config: IRenderConfig
	) {

		const {
			width,
			height,
			offset
		} = config;
		const maximumSide = Math.max(width, height);
		const offsetPx = Math.round(maximumSide / 100 * offset) || 0;
		const spriteWidth = width - offsetPx * 2;
		const spriteHeight = height - offsetPx * 2;
		const suitableSource = await this.getSuitableSourceBuffer(source, spriteWidth, spriteHeight);
		const imageProcessor = await imageProcessorAccess;
		const result = await imageProcessor.renderIcon(suitableSource, config);

		return Buffer.from(result);
	}

	protected async getSuitableSourceBuffer(
		source: Vinyl,
		width: number,
		height: number
	) {

		if (isSvg(source.basename)) {

			await this.attachMetadata(source);

			const {
				useOffscreenCanvas
			} = this;
			const svg = (source.contents as Buffer).toString('utf8');
			const {
				width: desiredWidth,
				height: desiredHeight
			} = this.getContainSize({
				width,
				height
			}, source.metadata);
			const buffer = useOffscreenCanvas
				? await this.renderOnOffscreenCanvas(svg, desiredWidth, desiredHeight)
				: await this.renderOnCanvas(svg, desiredWidth, desiredHeight);

			return Buffer.from(buffer);
		}

		return source.contents as Buffer;
	}

	protected async renderOnCanvas(
		svg: string,
		desiredWidth: number,
		desiredHeight: number
	) {

		const c = document.createElement('canvas');
		const ctx = c.getContext('2d');
		const v = Canvg.fromString(ctx, svg);

		v.resize(desiredWidth, desiredHeight, 'xMidYMid meet');

		await v.render();

		const buffer = await arrayBufferFromUrl(c.toDataURL());

		return buffer;
	}

	protected async renderOnOffscreenCanvas(
		svg: string,
		desiredWidth: number,
		desiredHeight: number
	) {

		const c = offscreenPreset.createCanvas(0, 0);
		const ctx = c.getContext('2d');
		const v = Canvg.fromString(ctx, svg, offscreenPreset);

		v.resize(desiredWidth, desiredHeight, 'xMidYMid meet');

		await v.render();

		const blob = await c.convertToBlob(); // <-- works slow in webworker ¯\_(ツ)_/¯
		const buffer = await arrayBufferFromBlob(blob);

		return buffer;
	}

	protected getContainSize(
		{
			width: boxWidth,
			height: boxHeight
		}: ISize,
		{
			width: iconWidth,
			height: iconHeight
		}: ISize
	): ISize {

		const minBoxSide = Math.min(boxWidth, boxHeight);
		const isWidthMin = minBoxSide === boxWidth;

		return isWidthMin ? {
			width:  boxWidth,
			height: Math.round(iconHeight / iconWidth * boxWidth)
		} : {
			height: boxHeight,
			width:  Math.round(iconWidth / iconHeight * boxHeight)
		};
	}
}
