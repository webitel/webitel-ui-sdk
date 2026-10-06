import { describe, expect, it } from 'vitest';

import { minToSec, secToMin } from '../convertTimeUnits';

describe('convertTimeUnits', () => {
	it('converts minutes to seconds', () => {
		expect(minToSec(0)).toBe(0);
		expect(minToSec(540)).toBe(32400);
	});

	it('converts seconds to minutes', () => {
		expect(secToMin(0)).toBe(0);
		expect(secToMin(32400)).toBe(540);
	});

	it('round-trips a time of day', () => {
		expect(secToMin(minToSec(1439))).toBe(1439);
	});
});
