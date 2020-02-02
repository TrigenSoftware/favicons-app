import faker from 'faker';
import {
	configure
} from '@trigen/scripts-preset-react-app/storybook/config';
import '@flexis/ui/reboot.st.css';
import '../src/App/App.st.css';

if (process.env.SEED) {
	faker.seed(parseInt(process.env.SEED));
}

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

configure(module, stories);
