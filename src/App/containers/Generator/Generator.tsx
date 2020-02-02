import React, {
	Component
} from 'react';
import {
	Bind
} from '@flexis/ui/helpers';
import {
	IWorkerConfig,
	IResultFile
} from '~/services/favicons';
// tslint:disable-next-line: no-duplicate-imports
import * as favicons from '~/services/favicons';
import Switch from '~/components/Switch';
import GeneratorForm from './GeneratorForm';
import GeneratorResult from './GeneratorResult';
import {
	config
} from './defaults';
import {
	IProps,
	IState
} from './types';
import {
	classes
} from './Generator.st.css';

export default class GeneratorContainer extends Component<IProps, IState> {

	state = {
		archive:      '',
		icons:        [],
		inProgress:   false,
		useWebWorker: favicons.getUseWebWorker()
	};

	render() {

		const {
			archive,
			icons,
			inProgress,
			useWebWorker
		} = this.state;

		return (
			<>
				<main
					className={classes.root}
				>
					<GeneratorForm
						onSubmit={this.onSubmit}
						defaultConfig={config}
					/>
					<GeneratorResult
						archive={archive}
						icons={icons}
						inProgress={inProgress}
					/>
				</main>
				{favicons.isOffscreenSupported && (
					<label
						className={classes.workerSwitch}
					>
						Browser{' '}
						<Switch
							type='checkbox'
							name='useWebWorker'
							onChange={this.onUseWebWorkerChange}
							checked={useWebWorker}
						/>
						{' '}WebWorker
					</label>
				)}
			</>
		);
	}

	@Bind()
	private onUseWebWorkerChange(value: boolean) {

		favicons.setUseWebWorker(value);

		this.setState(() => ({
			useWebWorker: value
		}));
	}

	@Bind()
	private async onSubmit([config, file]: [IWorkerConfig, File]) {

		this.setState(() => ({
			archive:    '',
			icons:      [],
			inProgress: true
		}));

		const offResult = await favicons.onResult(this.onResult);

		console.time('Favicons');

		await favicons.setFile(file);
		await favicons.setConfig(config);
		await favicons.generate();
		await favicons.createArchive();

		console.timeEnd('Favicons');

		offResult();

		this.setState(() => ({
			inProgress: false
		}));
	}

	@Bind()
	private onResult(file: IResultFile) {

		const {
			name,
			url
		} = file;

		console.log(file);

		switch (true) {

			case /\.(png|ico)$/.test(name):
				this.setState(({
					icons
				}) => ({
					icons: [
						...icons,
						file
					]
				}));
				break;

			case /\.zip$/.test(name):
				this.setState(() => ({
					archive: url
				}));
				break;

			default:
		}
	}
}
