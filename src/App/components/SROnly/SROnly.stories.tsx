import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import SROnlyStories from '@flexis/ui/components/SROnly/SROnly.stories';
import SROnly from './';

storiesOf('Components|SROnly', module)
	.addParameters(SROnlyStories.parameters)
	.add(
		'with heading',
		() => (
			<SROnly>
				<h1>Very important but hidden title</h1>
			</SROnly>
		)
	)
	.add(
		'with focusable state',
		() => (
			<SROnly focusable>
				<button>Very important but hidden button</button>
			</SROnly>
		)
	);
