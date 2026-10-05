import { mount } from '@vue/test-utils';
import {
	getCalendarDayRangeErrors,
	getResourceGroupTimeRangeErrors,
} from '@webitel/api-services/validations';
import { describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';

import { useTimeRangesValidation } from '../useTimeRangesValidation';

type CalendarDay = {
	day: number;
	disabled: boolean;
	start: number;
	end: number;
};

const row = (day: number, start: number, end: number): CalendarDay => ({
	day,
	disabled: false,
	start,
	end,
});

const setup = (rows: CalendarDay[]) => {
	const dataList = ref(rows);

	const Comp = defineComponent({
		setup: () => useTimeRangesValidation(dataList, getCalendarDayRangeErrors),
		template: '<div />',
	});

	return {
		dataList,
		...(mount(Comp).vm as unknown as ReturnType<
			typeof useTimeRangesValidation
		>),
	};
};

describe('useTimeRangesValidation with calendar days', () => {
	it('marks nothing for rows that do not overlap', () => {
		const { getRangeValidation } = setup([
			row(0, 540, 541),
			row(0, 600, 660),
		]);

		expect(getRangeValidation(0, 'start')).toBeUndefined();
		expect(getRangeValidation(1, 'end')).toBeUndefined();
	});

	it('marks both ends of a row that starts after it ends', () => {
		const { getRangeValidation } = setup([
			row(0, 600, 540),
		]);

		expect(getRangeValidation(0, 'start')).toEqual({
			$error: true,
			$errors: [
				'Time From cannot be greater than To',
			],
		});
		expect(getRangeValidation(0, 'end')?.$error).toBe(true);
	});

	it('marks every row of an overlap, and clears once it is resolved', () => {
		const { dataList, getRangeValidation } = setup([
			row(0, 540, 720),
			row(0, 600, 780),
		]);

		expect(getRangeValidation(0, 'start')?.$errors).toEqual([
			'Time intervals on the same day cannot overlap',
		]);
		expect(getRangeValidation(1, 'start')?.$error).toBe(true);

		dataList.value[1].start = 900;
		dataList.value[1].end = 960;

		expect(getRangeValidation(0, 'start')).toBeUndefined();
		expect(getRangeValidation(1, 'start')).toBeUndefined();
	});

	it('marks a time outside the day', () => {
		const { getRangeValidation } = setup([
			row(0, 0, 24 * 60),
		]);

		expect(getRangeValidation(0, 'end')?.$errors).toEqual([
			'Hours must be from 00 to 23',
		]);
	});
});

describe('useTimeRangesValidation with resource group ranges', () => {
	const setupRanges = (
		rows: {
			start: number;
			end: number;
		}[],
	) => {
		const ranges = ref(rows);

		const Comp = defineComponent({
			setup: () =>
				useTimeRangesValidation(ranges, getResourceGroupTimeRangeErrors),
			template: '<div />',
		});

		return {
			ranges,
			...(mount(Comp).vm as unknown as ReturnType<
				typeof useTimeRangesValidation
			>),
		};
	};

	it('marks both ends of a reversed range', () => {
		const { getRangeValidation } = setupRanges([
			{
				start: 600,
				end: 540,
			},
		]);

		expect(getRangeValidation(0, 'start')?.$error).toBe(true);
		expect(getRangeValidation(0, 'end')?.$error).toBe(true);
	});

	it('marks intersecting ranges regardless of day', () => {
		const { ranges, getRangeValidation } = setupRanges([
			{
				start: 540,
				end: 720,
			},
			{
				start: 600,
				end: 780,
			},
		]);

		expect(getRangeValidation(1, 'end')?.$error).toBe(true);

		ranges.value[1].start = 900;
		ranges.value[1].end = 960;

		expect(getRangeValidation(0, 'start')).toBeUndefined();
	});
});
