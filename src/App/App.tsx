import React, {
	Component
} from 'react';
import {
	hot
} from 'react-hot-loader';
import '@flexis/ui/reboot.st.css';
import GeneratorContainer from '~/containers/Generator/loadable';
import './App.st.css';

@hot(module)
export default class App extends Component {

	render() {
		return (
			<GeneratorContainer/>
		);
	}
}
