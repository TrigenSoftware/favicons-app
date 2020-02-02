import React, {
	Component
} from 'react';
import FlexisSwitch, {
	IProps
} from '@flexis/ui/components/Switch';
import {
	style,
	classes
} from './Switch.st.css';

export {
    IProps
};

export default class Switch extends Component<IProps> {

	static propTypes = FlexisSwitch.propTypes;

	render() {

		const {
			className,
			...props
		} = this.props;

		return (
			<FlexisSwitch
				{...props}
				className={style(classes.root, className)}
			/>
		);
	}
}
