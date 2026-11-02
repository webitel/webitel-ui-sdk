import { describe, expect, it } from 'vitest';

import { textToSpeechSchema } from '../textToSpeech.validations';

const filled = {
	name: 'greeting',
	profile: {
		id: '1',
		name: 'Google',
	},
	text: 'Hello',
};

const failedPaths = (value: unknown) =>
	textToSpeechSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.'));

describe('textToSpeechSchema', () => {
	it('accepts a filled draft', () => {
		expect(textToSpeechSchema.safeParse(filled).success).toBe(true);
	});

	it('requires a name and a text', () => {
		expect(
			failedPaths({
				...filled,
				name: '',
				text: '',
			}),
		).toEqual([
			'name',
			'text',
		]);
	});

	it('reports an empty profile on its id', () => {
		expect(
			failedPaths({
				...filled,
				profile: {},
			}),
		).toEqual([
			'profile.id',
		]);
	});
});
