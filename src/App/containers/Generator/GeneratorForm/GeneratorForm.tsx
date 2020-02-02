// tslint:disable: no-magic-numbers
import React, {
	FormHTMLAttributes,
	ChangeEvent,
	FormEvent,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	Bind,
	CombinePropsAndAttributes
} from '@flexis/ui/helpers';
import {
	IWorkerConfig
} from '~/services/favicons';
import FormGroup from '~/components/FormGroup';
import FileSelect from '~/components/FileSelect';
import Button from '~/components/Button';
import Textarea from '~/components/Textarea';
import validate from './validate';
import {
	style,
	classes
} from './GeneratorForm.st.css';

interface ISelfProps {
	defaultConfig?: IWorkerConfig;
	onSubmit(data: [IWorkerConfig, File]): void;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	FormHTMLAttributes<HTMLFormElement>
>;

export interface IState {
	config: string;
	icon: File;
}

export default class GeneratorForm extends Component<IProps, IState> {

	static propTypes = {
		onSubmit:      PropTypes.func.isRequired,
		defaultConfig: PropTypes.object
	};

	static defaultProps = {
		defaultConfig: {}
	};

	state = {
		config: this.stringify(this.props.defaultConfig),
		icon:   null
	};

	render() {

		const {
			className,
			onSubmit,
			defaultConfig,
			...props
		} = this.props;
		const {
			config,
			icon
		} = this.state;

		return (
			<form
				{...props}
				className={style(classes.root, className)}
				onSubmit={this.onSubmit}
			>
				<header
					className={classes.controls}
				>
					<FileSelect
						name='manifest'
						accept='application/json'
						onChange={this.onManifestChange}
					>
						<Button
							type='button'
							color='info'
						>
							Open manifest.json
						</Button>
					</FileSelect>
					<FileSelect
						name='icon'
						accept='image/png,image/svg+xml'
						required
						onChange={this.onIconChange}
					>
						<Button
							type='button'
							color='primary'
						>
							{icon
								? icon.name
								: 'Open source icon (*.png, *.svg)'
							}
						</Button>
					</FileSelect>
					<Button
						type='submit'
						color='success'
					>
						Generate
					</Button>
				</header>
				<FormGroup
					className={classes.configTextarea}
					label='Config:'
					flex
				>
					<Textarea
						name='config'
						required
						onChange={this.onConfigChange}
						value={config}
					/>
				</FormGroup>
			</form>
		);
	}

	@Bind()
	private async onManifestChange([file]: File[]) {

		try {

			const nextManifest = await new Response(file).json();

			this.setState(({
				config
			}) => {

				try {

					const prevConfig = JSON.parse(config);
					const nextConfig = {
						...prevConfig,
						manifest: {
							...prevConfig.manifest,
							...nextManifest
						}
					};

					Reflect.deleteProperty(nextConfig.manifest, 'icons');

					return {
						config: this.stringify(nextConfig)
					};

				} catch (err) {
					return {
						config
					};
				}
			});

		} catch (err) {
			/* Silent */
		}
	}

	@Bind()
	private onIconChange([file]: File[]) {
		this.setState(() => ({
			icon: file
		}));
	}

	@Bind()
	private onConfigChange(value: string, event: ChangeEvent<HTMLInputElement>) {

		const {
			target
		} = event;

		this.validate(target);

		this.setState(() => ({
			config: value
		}));
	}

	@Bind()
	private onSubmit(event: FormEvent<HTMLFormElement>) {

		event.preventDefault();

		const {
			onSubmit
		} = this.props;

		onSubmit(
			this.getFormData()
		);
	}

	private stringify(data: any) {
		return JSON.stringify(data, null, 2);
	}

	private validate(input: HTMLInputElement) {

		const validityMessage = validate(input);

		input.setCustomValidity(validityMessage);
	}

	private getFormData(): [IWorkerConfig, File] {

		const {
			config,
			icon
		} = this.state;

		try {
			return [JSON.parse(config), icon];
		} catch (err) {
			return [{}, icon];
		}
	}
}
