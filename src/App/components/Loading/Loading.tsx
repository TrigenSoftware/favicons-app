import React, {
	Component
} from 'react';
import Spinner, {
	IProps
} from '../Spinner';
import {
	style,
	classes
} from './Loading.st.css';

export default class Loading extends Component<IProps> {

	static propTypes = Spinner.propTypes;

	static defaultProps = {
		color: 'primary'
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
				className={style(classes.root, className)}
			>
				<Spinner
					className={classes.spinner}
					color={color}
				>
					{children}
				</Spinner>
			</div>
		);
	}
}
