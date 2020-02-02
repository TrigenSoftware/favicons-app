import React, {
	Component
} from 'react';
import FlexisTextarea, {
	IProps
} from '@flexis/ui/components/Textarea';
import {
	style,
	classes
} from './Textarea.st.css';

export {
    IProps
};

export default class Textarea extends Component<IProps> {

	static propTypes = FlexisTextarea.propTypes;

	render() {

		const {
			className,
			...props
		} = this.props;

		return (
			<FlexisTextarea
				{...props}
				className={style(classes.root, className)}
			/>
		);
	}
}
