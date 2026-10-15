import { describe, expect, it } from 'vitest';

import { getEndOfDay, getStartOfDay } from '../getDefaultFilterDate';

describe('getStartOfDay / getEndOfDay', () => {
	const noon = new Date(2026, 9, 15, 12, 30).getTime();

	it('returns the bounds of the passed day', () => {
		expect(getStartOfDay(noon)).toBe(
			new Date(2026, 9, 15, 0, 0, 0, 0).getTime(),
		);
		expect(getEndOfDay(noon)).toBe(
			new Date(2026, 9, 15, 23, 59, 59, 999).getTime(),
		);
	});

	it('defaults to today', () => {
		expect(getStartOfDay()).toBe(new Date().setHours(0, 0, 0, 0));
		expect(getEndOfDay()).toBe(new Date().setHours(23, 59, 59, 999));
	});
});
