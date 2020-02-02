/* tslint:disable: no-magic-numbers */
import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	boolean,
	number
} from '@storybook/addon-knobs/react';
import SelectStories, {
	events
} from '@flexis/ui/components/Select/Select.stories';
import Select, {
	SelectOption
} from './';

storiesOf('Components|Select', module)
	.addParameters(SelectStories.parameters)
	.add(
		'with basic state',
		() => (
			<Select
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with disabled state',
		() => (
			<Select
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with default value',
		() => (
			<Select
				{...events}
				name='select'
				defaultValue={1}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with value',
		() => (
			<Select
				{...events}
				name='select'
				value={number('Value', 1)}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption value={0}>
					Option #1
				</SelectOption>
				<SelectOption value={1}>
					Option #2
				</SelectOption>
				<SelectOption value={2}>
					Option #3
				</SelectOption>
			</Select>
		)
	)
	.add(
		'with text around',
		() => {

			const select = (
				<Select>
					<SelectOption value={0}>
						Option #1
					</SelectOption>
					<SelectOption value={1}>
						Option #2
					</SelectOption>
					<SelectOption value={2}>
						Option #3
					</SelectOption>
				</Select>
			);

			return (
				<div>
					Text {select} text
				</div>
			);
		}
	)
	.add(
		'without values',
		() => (
			<Select
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<SelectOption>
					Option #1
				</SelectOption>
				<SelectOption>
					Option #2
				</SelectOption>
				<SelectOption>
					Option #3
				</SelectOption>
			</Select>
		)
	);
