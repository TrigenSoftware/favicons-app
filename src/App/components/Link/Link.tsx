import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import FlexisLink, {
	IProps as IFlexisLinkProps
} from '@flexis/ui/components/Link';
import unsetSize from '../common/unsetSize';
import {
	Color,
	ColorValues
} from '../types';
import {
	style,
	classes
} from './Link.st.css';

export interface IProps extends IFlexisLinkProps {
	color?: Color;
	disguised?: boolean;
	to?: string;
}

function isExternalLink(to: string) {
	return /^http/.test(to);
}

export default class Link extends Component<IProps> {

	static propTypes = {
		...FlexisLink.propTypes,
		color:     PropTypes.oneOf(ColorValues),
		disguised: PropTypes.bool,
		to:        PropTypes.string
	};

	static defaultProps = {
		...FlexisLink.defaultProps,
		linkElement: null
	};

	render() {

		const {
			className,
			linkElement: linkElementProp,
			linkElementCustomProps: linkElementCustomPropsProp,
			tabIndex: tabIndexProp,
			color,
			disguised,
			to,
			href,
			icon,
			children,
			...props
		} = this.props;
		const useAnchor = typeof href === 'string' || isExternalLink(to);
		const linkElement = useAnchor
			? undefined
			: linkElementProp;
		const linkElementCustomProps = useAnchor
			? { href: to || href }
			: {
				...linkElementCustomPropsProp,
				to
			};
		const tabIndex = typeof tabIndexProp !== 'undefined'
			? tabIndexProp
			: disguised
				? -1
				: undefined;

		return (
			<FlexisLink
				{...props}
				className={style(classes.root, {
					[color]:   Boolean(color),
					disguised: Boolean(disguised)
				}, className)}
				linkElement={linkElement}
				linkElementCustomProps={linkElementCustomProps}
				icon={unsetSize(icon)}
				tabIndex={tabIndex}
			>
				{children}
			</FlexisLink>
		);
	}
}
