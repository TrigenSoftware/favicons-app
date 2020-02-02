import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	text,
	boolean,
	select
} from '@storybook/addon-knobs/react';
import FormGroupStories, {
	events
} from '@flexis/ui/components/FormGroup/FormGroup.stories';
import {
	imageUrl
} from '@flexis/ui/components/ImageSelect/ImageSelect.stories';
import {
	AlignSideValues
} from '../types';
import Input from '../Input';
import Textarea from '../Textarea';
import Select, {
	SelectOption
} from '../Select';
import Checkbox from '../Checkbox';
import ImageSelect from '../ImageSelect';
import FormGroup from './';

const {
	TestIcon
} = global as any;

storiesOf('Components|FormGroup', module)
	.addParameters(FormGroupStories.parameters)
	.add(
		'with label',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with description',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				description={text('Description', 'Text description')}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with required state',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				description={text('Description', 'Text description')}
			>
				<Input
					{...events}
					required={boolean('Required', true)}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with custom label',
		() => (
			<FormGroup
				id='input-id'
				label={(
					<b>
						{text('Label', 'Custom label')}
					</b>
				)}
			>
				<Input
					{...events}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with textarea',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
			>
				<Textarea
					{...events}
				/>
			</FormGroup>
		)
	)
	.add(
		'with select',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
			>
				<Select
					{...events}
				>
					<SelectOption
						value='test'
					>
						test
					</SelectOption>
					<SelectOption
						value='test2'
					>
						test2
					</SelectOption>
				</Select>
			</FormGroup>
		)
	)
	.add(
		'with checkbox',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				flex={false}
			>
				<Checkbox
					{...events}
				/>
			</FormGroup>
		)
	)
	.add(
		'with image select',
		() => (
			<FormGroup
				id='input-id'
				label={text('Label', 'Text label')}
				flex={false}
			>
				<ImageSelect
					{...events}
					size='lg'
					value={text('Value', imageUrl)}
				/>
			</FormGroup>
		)
	)
	.add(
		'with icon',
		() => (
			<FormGroup
				id='input-id'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
				label={text('Label', 'Text label')}
				description={text('Description', 'Text description')}
			>
				<Input
					{...events}
					required={boolean('Required', true)}
					defaultValue=''
				/>
			</FormGroup>
		)
	)
	.add(
		'with disabled state',
		() => (
			<FormGroup
				id='input-id'
				icon={<TestIcon/>}
				alignIcon={select('Align icon', AlignSideValues, 'left')}
				label={text('Label', 'Text label')}
				description={text('Description', 'Text description')}
			>
				<Input
					{...events}
					disabled={boolean('Disabled', true)}
					defaultValue=''
				/>
			</FormGroup>
		)
	);
