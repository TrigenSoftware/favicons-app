
import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	text,
	boolean
} from '@storybook/addon-knobs/react';
import TextareaStories, {
	events
} from '@flexis/ui/components/Textarea/Textarea.stories';
import Textarea from './';

storiesOf('Components|Textarea', module)
	.addParameters(TextareaStories.parameters)
	.add(
		'with default state',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue=''
			/>
		)
	)
	.add(
		'with default value',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				defaultValue='Default value'
			/>
		)
	)
	.add(
		'with value',
		() => (
			<Textarea
				{...events}
				placeholder={text('Placeholder', '')}
				disabled={boolean('Disabled', false)}
				value={text('Value', 'Value')}
			/>
		)
	);
