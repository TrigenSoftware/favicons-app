import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	boolean
} from '@storybook/addon-knobs/react';
import SwitchStories, {
	events
} from '@flexis/ui/components/Switch/Switch.stories';
import Switch from './';

storiesOf('Components|Switch', module)
	.addParameters(SwitchStories.parameters)
	.add(
		'with default state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				defaultChecked
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Switch
				{...events}
				type='checkbox'
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
			/>
		)
	);
