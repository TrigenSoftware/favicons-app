import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	select
} from '@storybook/addon-knobs/react';
import {
	buildInfo
} from '@flexis/ui/helpers/stories';
import {
	ColorValues
} from '../types';
import SROnly from '../SROnly';
import Loading from './';

const stylableApi = `
Stylable API
---
${buildInfo([
	{
		values: ColorValues,
		prefix: ':'
	}
])}
`;

storiesOf('Components|Loading', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with color',
		() => (
			<Loading
				style={{ height: '50rem' }}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
			/>
		)
	)
	.add(
		'with children',
		() => (
			<Loading
				style={{ height: '50rem' }}
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
			>
				<SROnly>
					<span>Loading...</span>
				</SROnly>
			</Loading>
		)
	);
