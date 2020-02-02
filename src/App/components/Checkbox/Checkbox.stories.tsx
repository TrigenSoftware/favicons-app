import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	boolean
} from '@storybook/addon-knobs/react';
import CheckboxStories, {
	events
} from '@flexis/ui/components/Checkbox/Checkbox.stories';
import Checkbox from './';

storiesOf('Components|Checkbox', module)
	.addParameters(CheckboxStories.parameters)
	.add(
		'with default state',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				defaultChecked={false}
			/>
		)
	)
	.add(
		'with default checked',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				defaultChecked
			/>
		)
	)
	.add(
		'with unchecked state',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', false)}
			/>
		)
	)
	.add(
		'with checked state',
		() => (
			<Checkbox
				{...events}
				disabled={boolean('Disabled', false)}
				checked={boolean('Checked', true)}
			/>
		)
	)
	.add(
		'with text',
		() => (
			<>
				<Checkbox
					{...events}
					disabled={boolean('Disabled', false)}
					checked={boolean('Checked', true)}
				/>
				{' '}Text
			</>
		)
	);
