import { describe, expect, it } from 'vitest';

import { phoneNumberSchema } from '../phoneNumber.validations';

const symbolsIssue = expect.objectContaining({
	code: 'custom',
	params: {
		i18nKey: 'phoneNumberSymbolsValidator',
	},
});

describe('phoneNumberSchema', () => {
	it.each([
		'380000000000',
		'+380000000000',
		'sip',
		'SIP',
		'user_name',
		'1-800-FLOWERS',
		"a.b!c~d*e'f(g)",
		'+(044)123-45-67',
	])('accepts %j', (value) => {
		expect(phoneNumberSchema.safeParse(value).success).toBe(true);
	});

	it.each([
		'+',
		'++380',
		'380+',
		'38+0',
		'380 000',
		' 380',
		'380\n',
		'user@host',
		'#123',
		'1/2',
		'a,b',
		'номер',
	])('rejects %j with the symbols issue', (value) => {
		const result = phoneNumberSchema.safeParse(value);

		expect(result.success).toBe(false);
		expect(result.error?.issues).toEqual([
			symbolsIssue,
		]);
	});

	it('reports only required for an empty value', () => {
		const result = phoneNumberSchema.safeParse('');

		expect(result.success).toBe(false);
		expect(result.error?.issues).toHaveLength(1);
		expect(result.error?.issues[0].code).toBe('too_small');
	});
});
