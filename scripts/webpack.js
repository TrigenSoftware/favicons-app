import {
	BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer';
import {
	StylableImportOrderPlugin
} from '@trigen/scripts-preset-react-app/webpack/StylableImportOrderPlugin';
import update from 'immutability-helper';

const wasmFileLoader = {
	type:    'javascript/auto',
	test:    /\.wasm(\.gz)?$/,
	loader:  'file-loader',
	options: {
		name: 'wasm/[folder]-[name].[ext]'
	}
};
const workerLoader = {
	test:    /(\/|\.)worker\.(js|ts)$/,
	exclude: /node_modules/,
	loader:  'worker-loader'
};

export function dev(config) {
	return update(config, {
		node: {
			$set: {
				fs: 'empty'
			}
		},
		module: {
			rules: {
				$unshift: [
					wasmFileLoader,
					workerLoader
				]
			}
		},
		plugins: {
			$push: [
				process.env.BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
				new StylableImportOrderPlugin({
					fullControl: true
				})
			].filter(Boolean)
		}
	});
}

export function build(config) {
	return update(config, {
		node: {
			$set: {
				fs: 'empty'
			}
		},
		module: {
			rules: {
				$unshift: [
					wasmFileLoader,
					workerLoader
				]
			}
		},
		// optimization: {
		// 	minimize: {
		// 		$set: false
		// 	}
		// },
		plugins: {
			$push: [
				new StylableImportOrderPlugin({
					fullControl: true
				})
			]
		}
	});
}
