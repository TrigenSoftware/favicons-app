import {
	ReactElement,
	cloneElement
} from 'react';

export const noSize = {
	width:  null,
	height: null
};

export default function unsetSize(element: ReactElement) {
	return element && cloneElement(element, noSize);
}
