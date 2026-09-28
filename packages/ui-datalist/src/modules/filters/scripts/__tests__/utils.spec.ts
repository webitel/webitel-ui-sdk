import { describe, expect, it } from 'vitest';

import { isEmptyFilterValue } from '../utils';

describe('isEmptyFilterValue', () => {
	it.each([
		true,
		false,
	])('treats boolean %s as a non-empty value', (value) => {
		expect(isEmptyFilterValue(value)).toBe(false);
	});

	it.each([
		null,
		undefined,
		'',
		[],
		{},
		{
			from: null,
			to: undefined,
		},
	])('treats %j as an empty value', (value) => {
		expect(isEmptyFilterValue(value)).toBe(true);
	});

	it.each([
		'value',
		1,
		[
			1,
		],
		{
			from: 1,
			to: null,
		},
	])('treats %j as a non-empty value', (value) => {
		expect(isEmptyFilterValue(value)).toBe(false);
	});
});
