import React, {
	Component
} from 'react';
import FlexisFormGroup, {
	IProps
} from '@flexis/ui/components/FormGroup';
import unsetSize from '../common/unsetSize';
import {
	style,
	classes
} from './FormGroup.st.css';

export {
	IProps
};

export default class FormGroup extends Component<IProps> {

	static propTypes = FlexisFormGroup.propTypes;
	static defaultProps = FlexisFormGroup.defaultProps;

	render() {

		const {
			className,
			icon,
			children,
			...props
		} = this.props;

		return (
			<FlexisFormGroup
				{...props}
				className={style(classes.root, className)}
				icon={unsetSize(icon)}
			>
				{children}
			</FlexisFormGroup>
		);
	}
}
