import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import LinkStories, {
	events
} from '@flexis/ui/components/Link/Link.stories';
import {
	extendInfo
} from '@flexis/ui/helpers/stories';
import {
	AlignSideValues,
	ColorValues
} from '../types';
import Link from './';

const {
	TestIcon
} = global as any;

export const parameters = extendInfo(
	LinkStories.parameters,
	[
		{
			values: ['disguised'],
			prefix: ':'
		},
		{
			values: ColorValues,
			prefix: ':'
		}
	]
);

storiesOf('Components|Link', module)
	.addParameters(parameters)
	.add(
		'with text',
		() => (
			<Link
				{...events}
				to='#'
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				disguised={boolean('Disguised', false)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with icon',
		() => (
			<Link
				{...events}
				to='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, AlignSideValues[0])}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				disguised={boolean('Disguised', false)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with right aligned icon',
		() => (
			<Link
				{...events}
				to='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'right')}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				disguised={boolean('Disguised', false)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	)
	.add(
		'with flex icon',
		() => (
			<Link
				{...events}
				style={{ width: '100px' }}
				to='#'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, AlignSideValues[0])}
				flexIcon={boolean('Flex icon', true)}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
				disguised={boolean('Disguised', false)}
			>
				{text('Label', 'Link')}
			</Link>
		)
	);
