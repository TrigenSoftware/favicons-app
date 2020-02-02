import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import GeneratorResult from './';

const stylableApi = `
Stylable API
---
`;

storiesOf('Components|GeneratorResult', module)
	.addParameters({
		info: stylableApi
	})
	.add(
		'with in progress state',
		() => (
			<GeneratorResult
				archive=''
				icons={[]}
				inProgress
			/>
		)
	)
	.add(
		'with download state',
		() => (
			<GeneratorResult
				archive='some.zip'
				icons={[]}
			/>
		)
	);
