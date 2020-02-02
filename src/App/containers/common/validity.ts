
type IValidator = (input: HTMLInputElement) => string|undefined;

export function createValidator(validators: IValidator[]) {
	return (input: HTMLInputElement) => {

		let message = '';

		for (const validator of validators) {

			message = validator(input);

			if (typeof message === 'string') {
				return message;
			}
		}

		return '';
	};
}

export function checkPattern(input: HTMLInputElement) {

	const {
		patternMismatch
	} = input.validity;

	if (patternMismatch) {
		return 'No around spaces.';
	}
}
