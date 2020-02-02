import React, {
	Component
} from 'react';
import FlexisSelect, {
	IProps
} from '@flexis/ui/components/Select';
import {
	style,
	classes
} from './Select.st.css';

export {
    IProps
};

export * from './SelectOption';

export default class Select extends Component<IProps> {

	static propTypes = FlexisSelect.propTypes;

	render() {

		const {
			className,
			children,
			...props
		} = this.props;

		return (
			<FlexisSelect
				{...props}
				className={style(classes.root, className)}
			>
				{children}
			</FlexisSelect>
		);
	}
}
