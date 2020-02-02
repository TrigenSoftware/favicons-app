import React, {
	Component
} from 'react';
import FlexisInput, {
	IProps
} from '@flexis/ui/components/Input';
import {
	style,
	classes
} from './Input.st.css';

export {
	IProps
};

export default class Input extends Component<IProps> {

	static propTypes = FlexisInput.propTypes;
	static defaultProps = FlexisInput.defaultProps;

	render() {

		const {
			className,
			...props
		} = this.props;

		return (
			<FlexisInput
				{...props}
				className={style(classes.root, className)}
			/>
		);
	}
}
