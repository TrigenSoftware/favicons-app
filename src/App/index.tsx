import React from 'react';
import {
	render
} from 'react-dom';
import registerServiceWorker from './serviceWorker?tsw';
import App from './App';

function main() {

	if (process.env.NODE_ENV !== 'development') {
		registerServiceWorker({ scope: '/' });
	}

	const root = document.querySelector('#view');

	if (root !== null) {
		render(
			<App/>,
			root
		);
	}
}

main();
