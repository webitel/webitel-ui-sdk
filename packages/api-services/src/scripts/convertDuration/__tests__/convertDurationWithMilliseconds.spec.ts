import { describe, expect, it } from 'vitest';

import convertDurationWithMilliseconds from '../convertDurationWithMilliseconds';

describe('convertDurationWithMilliseconds', () => {
	it('formats hours, minutes, seconds and milliseconds', () => {
		expect(convertDurationWithMilliseconds(3_723_456)).toBe('01:02:03.456');
	});

	it('pads milliseconds to three digits', () => {
		expect(convertDurationWithMilliseconds(1_005)).toBe('00:00:01.005');
	});

	it('shows zero for a missing or invalid duration', () => {
		expect(convertDurationWithMilliseconds()).toBe('00:00:00.000');
		expect(convertDurationWithMilliseconds(Number.NaN)).toBe('00:00:00.000');
		expect(convertDurationWithMilliseconds(-10)).toBe('00:00:00.000');
	});
});
