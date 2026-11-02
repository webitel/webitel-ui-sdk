import { describe, expect, it } from 'vitest';

import { blacklistNumberSchema } from '../blacklistNumber.validations';

const issuePaths = (value: Record<string, unknown>) =>
	blacklistNumberSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('blacklistNumberSchema', () => {
	it('requires a number', () => {
		expect(
			issuePaths({
				number: '',
			}),
		).toContain('number');
	});

	it('defaults expireAt to 0 (permanent number)', () => {
		expect(
			blacklistNumberSchema.parse({
				number: '+380441234567',
			}).expireAt,
		).toBe(0);
	});

	it('accepts expireAt as a backend string or a datepicker number', () => {
		expect(
			blacklistNumberSchema.safeParse({
				number: '123',
				expireAt: '1760000000000',
			}).success,
		).toBe(true);
		expect(
			blacklistNumberSchema.safeParse({
				number: '123',
				expireAt: 1760000000000,
			}).success,
		).toBe(true);
	});
});
