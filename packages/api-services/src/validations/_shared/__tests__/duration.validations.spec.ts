import { describe, expect, it } from 'vitest';

import { requiredDurationSchema } from '../duration.validations';

const tooSmallIssue = expect.objectContaining({
	code: 'too_small',
	minimum: 1,
});

describe('requiredDurationSchema', () => {
	it.each([
		1,
		60,
		'1',
		'3600',
	])('accepts %j', (value) => {
		expect(requiredDurationSchema().safeParse(value).success).toBe(true);
	});

	it.each([
		0,
		'0',
		'',
		'abc',
	])('rejects %j as too small', (value) => {
		const result = requiredDurationSchema().safeParse(value);

		expect(result.success).toBe(false);
		expect(result.error?.issues).toEqual([
			tooSmallIssue,
		]);
	});

	it.each([
		undefined,
		null,
	])('rejects missing %j', (value) => {
		expect(requiredDurationSchema().safeParse(value).success).toBe(false);
	});

	it('respects custom min', () => {
		expect(requiredDurationSchema(60).safeParse('59').success).toBe(false);
		expect(requiredDurationSchema(60).safeParse(60).success).toBe(true);
	});
});
