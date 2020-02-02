import React, {
	HTMLAttributes,
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	CombinePropsAndAttributes
} from '@flexis/ui/helpers';
import {
	Color,
	ColorValues
} from '../types';
import {
	style,
	classes
} from './Spinner.st.css';

interface ISelfProps {
	color?: Color;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	HTMLAttributes<HTMLDivElement>
>;

export default class Spinner extends Component<IProps> {

	static propTypes = {
		color: PropTypes.oneOf(ColorValues)
	};

	render() {

		const {
			className,
			color,
			children,
			...props
		} = this.props;

		return (
			<div
				{...props}
				className={style(classes.root, {
					[color]: Boolean(color)
				}, className)}
			>
				{children}
			</div>
		);
	}
}
