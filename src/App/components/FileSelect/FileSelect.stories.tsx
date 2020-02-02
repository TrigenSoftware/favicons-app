import React from 'react';
import {
	storiesOf
} from '@storybook/react';
import {
	boolean
} from '@storybook/addon-knobs/react';
import FileSelectStories, {
	events
} from '@flexis/ui/components/FileSelect/FileSelect.stories';
import Button from '../Button';
import FileSelect from './';

storiesOf('Components|FileSelect', module)
	.addParameters(FileSelectStories.parameters)
	.add(
		'with button',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', false)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	)
	.add(
		'with disabled state',
		() => (
			<FileSelect
				{...events}
				disabled={boolean('Disabled', true)}
			>
				<Button>
					Select file
				</Button>
			</FileSelect>
		)
	);
