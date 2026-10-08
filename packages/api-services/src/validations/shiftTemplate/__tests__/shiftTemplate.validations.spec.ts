import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import {
	getDefaultShiftTemplateTime,
	getShiftTemplateTimeRangeErrors,
	shiftTemplateSchema,
} from '../shiftTemplate.validations';

const valid = {
	name: 'Day',
	times: [
		{
			start: 540,
			end: 1200,
		},
	],
};

describe('shiftTemplateSchema', () => {
	it('accepts a template with a name and a time range', () => {
		expect(shiftTemplateSchema.safeParse(valid).success).toBe(true);
	});

	it('fills a new template with one 9:00–18:00 row', () => {
		expect(getDefaultShiftTemplateTime()).toEqual({
			start: 540,
			end: 1080,
		});
		expect(getDefaultsFromZodSchema(shiftTemplateSchema, {})).toEqual(
			expect.objectContaining({
				times: [
					getDefaultShiftTemplateTime(),
				],
			}),
		);
	});

	it('accepts a new template once the name is filled', () => {
		const defaults = getDefaultsFromZodSchema(
			shiftTemplateSchema,
			{},
		) as object;

		expect(
			shiftTemplateSchema.safeParse({
				...defaults,
				name: 'Day',
			}).success,
		).toBe(true);
	});

	it('requires a name', () => {
		expect(
			shiftTemplateSchema.safeParse({
				...valid,
				name: '',
			}).success,
		).toBe(false);
	});

	it('rejects a name longer than 250 symbols', () => {
		expect(
			shiftTemplateSchema.safeParse({
				...valid,
				name: 'a'.repeat(251),
			}).success,
		).toBe(false);
	});

	it('requires at least one time range', () => {
		expect(
			shiftTemplateSchema.safeParse({
				...valid,
				times: [],
			}).success,
		).toBe(false);
	});

	it.each([
		[
			'end before start',
			{
				start: 600,
				end: 540,
			},
		],
		[
			'zero duration',
			{
				start: 600,
				end: 600,
			},
		],
		[
			'end out of the day',
			{
				start: 600,
				end: 1440,
			},
		],
		[
			'empty start',
			{
				end: 600,
			},
		],
	])('rejects a row with %s', (_, time) => {
		expect(
			shiftTemplateSchema.safeParse({
				...valid,
				times: [
					time,
				],
			}).success,
		).toBe(false);
	});
});

describe('getShiftTemplateTimeRangeErrors', () => {
	it('marks both ends of a row whose start is not before its end', () => {
		expect(
			getShiftTemplateTimeRangeErrors([
				{
					start: 540,
					end: 1200,
				},
				{
					start: 600,
					end: 540,
				},
			]),
		).toEqual([
			{
				index: 1,
				prop: 'start',
				key: 'timerangeStartLessThanEnd',
			},
			{
				index: 1,
				prop: 'end',
				key: 'timerangeStartLessThanEnd',
			},
		]);
	});
});
