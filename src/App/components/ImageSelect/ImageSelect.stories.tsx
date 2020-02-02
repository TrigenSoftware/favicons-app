import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	select,
	text,
	boolean
} from '@storybook/addon-knobs/react';
import ImageSelectStories, {
	imageUrl,
	events
} from '@flexis/ui/components/ImageSelect/ImageSelect.stories';
import ImageSelect, {
	DisplayValues,
	PreviewModeValues
} from './';
import IconUploadPhoto from '~/icons/upload.svg';

storiesOf('Components|ImageSelect', module)
	.addParameters(ImageSelectStories.parameters)
	.add(
		'with default state',
		() => (
			<ImageSelect
				{...events}
				display={select('Display', DisplayValues, 'block')}
			/>
		)
	)
	.add(
		'with placeholder',
		() => (
			<ImageSelect
				{...events}
				display={select('Display', DisplayValues, 'block')}
				placeholder={<IconUploadPhoto/>}
			/>
		)
	)
	.add(
		'with value',
		() => (
			<ImageSelect
				{...events}
				display={select('Display', DisplayValues, 'block')}
				value={text('Value', imageUrl)}
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<ImageSelect
				{...events}
				display={select('Display', DisplayValues, 'block')}
				defaultValue={text('Default value', imageUrl)}
			/>
		)
	)
	.add(
		'with disabled state',
		() => (
			<ImageSelect
				{...events}
				defaultValue={text('Default value', imageUrl)}
				disabled={boolean('Disabled', true)}
			/>
		)
	)
	.add(
		'with readOnly state',
		() => (
			<ImageSelect
				{...events}
				defaultValue={text('Default value', imageUrl)}
				readOnly={boolean('Readonly', true)}
			/>
		)
	)
	.add(
		'with lg size',
		() => (
			<ImageSelect
				{...events}
				style={{
					width: '500px'
				}}
				size='lg'
				previewMode={select('previewMode', PreviewModeValues, PreviewModeValues[1])}
				value={text('Value', imageUrl)}
			/>
		)
	);
