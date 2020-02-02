import React, {
	Component
} from 'react';
import FlexisCheckbox, {
	IProps
} from '@flexis/ui/components/Checkbox';
import {
	style,
	classes
} from './Checkbox.st.css';

export {
    IProps
};

export default class Checkbox extends Component<IProps> {

	static propTypes = FlexisCheckbox.propTypes;

	render() {

		const {
			className,
			...props
		} = this.props;

		return (
			<FlexisCheckbox
				{...props}
				className={style(classes.root, className)}
			/>
		);
	}
}
