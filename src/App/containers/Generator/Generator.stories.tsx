import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import Generator from './';

const stylableApi = `
Stylable API
---
`;

storiesOf('Containers|Generator', module)
	.addParameters({
		info: stylableApi
	})
	.addDecorator(story => (
		<div style={{ height: '100vh' }}>
			{story()}
		</div>
	))
	.add(
		'with empty form',
		() => (
			<Generator/>
		)
	);
