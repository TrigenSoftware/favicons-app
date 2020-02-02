import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import ButtonStories, {
	events
} from '@flexis/ui/components/Button/Button.stories';
import {
	extendInfo
} from '@flexis/ui/helpers/stories';
import {
	AlignSideValues,
	ColorValues
} from '../types';
import Button, {
	VariantValues
} from './';

const {
	TestIcon
} = global as any;

export const parameters = extendInfo(
	ButtonStories.parameters,
	[
		{
			values: ColorValues,
			prefix: ':'
		},
		{
			values: VariantValues,
			prefix: ':'
		}
	]
);

storiesOf('Components|Button', module)
	.addParameters(parameters)
	.add(
		'with text',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				variant={select('Variant', [null, ...VariantValues], null)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with icon',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, AlignSideValues[0])}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				variant={select('Variant', [null, ...VariantValues], null)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with icon only',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, AlignSideValues[0])}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				variant={select('Variant', [null, ...VariantValues], null)}
			/>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Button
				{...events}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'right')}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				variant={select('Variant', [null, ...VariantValues], null)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Button
				{...events}
				style={{ width: '100px' }}
				disabled={boolean('Disabled', false)}
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, AlignSideValues[0])}
				flexIcon={boolean('Flex icon', true)}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				variant={select('Variant', [null, ...VariantValues], null)}
			>
				{text('Label', 'Button')}
			</Button>
		)
	);
