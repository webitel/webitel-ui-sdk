import { describe, expect, it } from 'vitest';

import {
	getTimeRangeDuration,
	setTimeRangeDuration,
	type TimeRange,
} from '../timeRange.validations';

describe('getTimeRangeDuration', () => {
	it.each([
		[
			{
				start: 540,
				end: 1080,
			},
			540,
		],
		[
			{
				start: 600,
				end: 600,
			},
			0,
		],
		[
			{
				start: 700,
				end: 600,
			},
			0,
		],
		[
			{
				end: 60,
			},
			60,
		],
		[
			{},
			0,
		],
	])('%j → %i', (range: Partial<TimeRange>, duration) => {
		expect(getTimeRangeDuration(range)).toBe(duration);
	});
});

describe('setTimeRangeDuration', () => {
	it('moves end, keeps start', () => {
		const range = {
			start: 540,
			end: 600,
		};

		setTimeRangeDuration(range, 120);

		expect(range).toEqual({
			start: 540,
			end: 660,
		});
	});

	it('counts from 0 when start is unset', () => {
		const range: Partial<TimeRange> = {};

		setTimeRangeDuration(range, 30);

		expect(range.end).toBe(30);
	});
});
