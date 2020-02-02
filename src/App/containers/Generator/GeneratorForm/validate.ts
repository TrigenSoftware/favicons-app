import {
	createValidator
} from '../../common';

function checkJson(input: HTMLInputElement) {

	const {
		value
	} = input;

	try {
		JSON.parse(value);
	} catch (err) {
		return 'Invalid JSON.';
	}
}

export default createValidator([
	checkJson
]);
