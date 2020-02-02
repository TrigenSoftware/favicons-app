import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import FlexisImageSelect, {
	DisplayVariant,
	Display,
	IProps as IFlexisImageSelectProps,
	DisplayValues
} from '@flexis/ui/components/ImageSelect';
import {
	CombinePropsAndAttributes
} from '@flexis/ui/helpers';
import Button from '../Button';
import {
	style,
	classes
} from './ImageSelect.st.css';

export {
	DisplayVariant,
	Display,
	DisplayValues
};

export enum PreviewModeTypeVariant {
	Contain = 'contain',
	Cover = 'cover'
}

export type Size = 'lg';

export type PreviewModeType = 'contain' | 'cover';

interface ISelfProps {
	size?: Size;
	previewMode?: PreviewModeType;
}

export type IProps = CombinePropsAndAttributes<
	ISelfProps,
	IFlexisImageSelectProps
>;

export const PreviewModeValues: PreviewModeType[] = Object.values(PreviewModeTypeVariant);

const resetButton = (
	<Button
		type='button'
		color='danger'
	/>
);

export default class ImageSelect extends Component<IProps> {

	static propTypes = {
		...FlexisImageSelect.propTypes,
		size:        PropTypes.string,
		previewMode: PropTypes.oneOf(PreviewModeValues)
	};

	static defaultProps = {
		...FlexisImageSelect.defaultProps,
		previewMode: PreviewModeTypeVariant.Cover
	};

	render() {

		const {
			className,
			size,
			previewMode,
			children,
			...props
		} = this.props;

		return (
			<FlexisImageSelect
				{...props}
				className={style(classes.root, {
					[`${size}Size`]:        Boolean(size),
					[`${previewMode}Mode`]: Boolean(previewMode)
				}, className)}
				resetButton={resetButton}
			/>
		);
	}
}
