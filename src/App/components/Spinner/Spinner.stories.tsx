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
import Spinner from './';
import SROnly from '../SROnly';

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

storiesOf('Components|Spinner', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with color',
		() => (
			<Spinner
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
			/>
		)
	)
	.add(
		'with children',
		() => (
			<Spinner
				color={select('Color', [null, ...ColorValues], ColorValues[0])}
			>
				<SROnly>
					<span>Spinner...</span>
				</SROnly>
			</Spinner>
		)
	);
