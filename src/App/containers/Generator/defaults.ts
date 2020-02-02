import {
	IManifestConfig,
	IWorkerConfig
} from '~/services/favicons';

export const manifest: IManifestConfig = {
	'name': 'AppName',
	'short_name': 'App',
	'description': 'Description.',
	'dir': 'auto',
	'lang': 'en-US',
	'display': 'standalone',
	'orientation': 'portrait',
	'scope': '/',
	'start_url': '/?homescreen=1',
	'background_color': 'white',
	'theme_color': 'white'
};

export const config: IWorkerConfig = {
	manifest,
	path: '/',
	icons: {
		favicon: true,
		android: true,
		apple: {
			offset: 15
		},
		appleStartup: {
			offset: 15
		}
	},
	headers: true
};
