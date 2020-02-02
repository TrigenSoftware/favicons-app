import React, {
	HTMLAttributes,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '@flexis/ui/helpers';
import {
	IResultFile
} from '~/services/favicons';
import Link from '~/components/Link';
import Button from '~/components/Button';
import Spinner from '~/components/Spinner';
import {
	style,
	classes
} from './GeneratorResult.st.css';

interface ISelfProps {
	inProgress?: boolean;
	archive: string;
	icons: IResultFile[];
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export default class GeneratorResult extends Component<IProps> {

	static propTypes = {
		archive: PropTypes.string.isRequired,
		icons:   PropTypes.arrayOf(PropTypes.object).isRequired
	};

	render() {

		const {
			className,
			inProgress,
			archive,
			icons,
			...props
		} = this.props;

		return (
			<div
				{...props}
				className={style(classes.root, className)}
			>
				<header
					className={classes.header}
				>
					{!archive && inProgress && (
						<Spinner
							className={classes.spinner}
							color='warning'
						/>
					)}
					{archive && (
						<Link
							download='icons.zip'
							href={archive}
						>
							<Button
								type='button'
								color='success'
							>
								Download archive
							</Button>
						</Link>
					)}
				</header>
				<div
					className={classes.icons}
				>
					{icons.map((
						{
							name,
							url
						},
						i
					) => (
						<figure key={i}>
							<Link
								download={name}
								href={url}
								disguised
							>
								<img
									src={url}
									title={name}
									alt={name}
								/>
								<figcaption>
									{name}
								</figcaption>
							</Link>
						</figure>
					))}
				</div>
			</div>
		);
	}
}
