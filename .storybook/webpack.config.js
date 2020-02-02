const configureStorybook = require('@trigen/scripts-preset-react-app/storybook/webpack.config');

module.exports = function configure(input) {

	const config = configureStorybook(input);

	config.node = {
		fs: 'empty'
	};

	return config;
};
