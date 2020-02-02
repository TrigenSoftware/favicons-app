import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import FlexisButton, {
	IProps as IFlexisButtonProps
} from '@flexis/ui/components/Button';
import unsetSize from '../common/unsetSize';
import {
	Color,
	ColorValues
} from '../types';
import {
	style,
	classes
} from './Button.st.css';

export enum VariantVariant {
	Flat = 'flat',
	Outline = 'outline'
}

export type Variant = 'flat'|'outline';

export interface IProps extends IFlexisButtonProps {
	color?: Color;
	variant?: Variant;
	pseudoActive?: boolean;
	pseudoFocus?: boolean;
}

export const VariantValues: Variant[] = Object.values(VariantVariant);

export default class Button extends Component<IProps> {

	static propTypes = {
		...FlexisButton.propTypes,
		color:        PropTypes.oneOf(ColorValues),
		variant:      PropTypes.oneOf(VariantValues),
		pseudoActive: PropTypes.bool,
		pseudoFocus:  PropTypes.bool
	};

	static defaultProps = FlexisButton.defaultProps;

	render() {

		const {
			className,
			color,
			variant,
			pseudoActive,
			pseudoFocus,
			icon,
			children,
			...props
		} = this.props;

		return(
			<FlexisButton
				{...props}
				className={style(classes.root, {
					[color]:   Boolean(color),
					[variant]: Boolean(variant),
					pseudoActive,
					pseudoFocus
				}, className)}
				icon={unsetSize(icon)}
			>
				{children}
			</FlexisButton>
		);
	}
}
