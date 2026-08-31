import { describe, expect, it } from 'vitest';
import type { z } from 'zod';
import {
	calendarSchema,
	getCalendarDayRangeIssues,
} from '../calendar.validations';

/** custom rules carry their message key in params, see `i18nIssue` */
const issueKey = (issue: z.core.$ZodIssue) =>
	issue.code === 'custom' ? issue.params?.i18nKey : undefined;

const validTimezone = {
	id: 'tz-1',
	name: 'UTC',
};

const minimalValidInput = {
	name: 'Support hours',
	timezone: validTimezone,
};

describe('calendarSchema', () => {
	describe('defaults', () => {
		it('fills in description, expires, and excepts when omitted', () => {
			const result = calendarSchema.parse(minimalValidInput);

			expect(result.description).toBe('');
			expect(result.expires).toBe(false);
			expect(result.excepts).toEqual([]);
		});

		it('generates 7 default accepts entries (9:00-20:00, enabled) when omitted', () => {
			const result = calendarSchema.parse(minimalValidInput);

			expect(result.accepts).toHaveLength(7);
			result.accepts.forEach((accept, day) => {
				expect(accept).toEqual({
					day,
					disabled: false,
					start: 9 * 60,
					end: 20 * 60,
				});
			});
		});

		it('generates 7 default specials entries (9:00-20:00, disabled) when omitted', () => {
			const result = calendarSchema.parse(minimalValidInput);

			expect(result.specials).toHaveLength(7);
			result.specials.forEach((special, day) => {
				expect(special).toEqual({
					day,
					disabled: true,
					start: 9 * 60,
					end: 20 * 60,
				});
			});
		});

		it('preserves an explicitly provided description instead of defaulting', () => {
			const result = calendarSchema.parse({
				...minimalValidInput,
				description: 'custom description',
			});

			expect(result.description).toBe('custom description');
		});

		it('preserves an explicitly provided expires flag', () => {
			const result = calendarSchema.parse({
				...minimalValidInput,
				expires: true,
			});

			expect(result.expires).toBe(true);
		});

		it('produces fresh default accepts/specials across independent parses', () => {
			const first = calendarSchema.parse(minimalValidInput);
			const second = calendarSchema.parse(minimalValidInput);

			expect(first.accepts).toEqual(second.accepts);
			expect(first.specials).toEqual(second.specials);
			expect(first.accepts).not.toBe(second.accepts);
			expect(first.accepts?.[0]).not.toBe(second.accepts?.[0]);
			expect(first.specials).not.toBe(second.specials);
			expect(first.specials?.[0]).not.toBe(second.specials?.[0]);
		});
	});

	describe('name', () => {
		it('rejects a missing name', () => {
			const result = calendarSchema.safeParse({
				timezone: validTimezone,
			});

			expect(result.success).toBe(false);
		});

		it('rejects an empty name', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				name: '',
			});

			expect(result.success).toBe(false);
		});

		it('accepts a non-empty name', () => {
			const result = calendarSchema.safeParse(minimalValidInput);

			expect(result.success).toBe(true);
		});
	});

	describe('timezone', () => {
		it('rejects a missing timezone', () => {
			const result = calendarSchema.safeParse({
				name: 'Support hours',
			});

			expect(result.success).toBe(false);
		});

		it('rejects a timezone with an empty id', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				timezone: {
					id: '',
				},
			});

			expect(result.success).toBe(false);
		});

		it('rejects a timezone without id', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				timezone: {
					name: 'UTC',
				},
			});

			expect(result.success).toBe(false);
		});

		it('accepts a timezone with just a valid id', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				timezone: {
					id: 'tz-2',
				},
			});

			expect(result.success).toBe(true);
		});
	});

	describe('accepts / specials override', () => {
		it('accepts a custom accepts array and defaults missing `disabled` to false', () => {
			const result = calendarSchema.parse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						start: 0,
						end: 100,
					},
				],
			});

			expect(result.accepts).toEqual([
				{
					day: 0,
					disabled: false,
					start: 0,
					end: 100,
				},
			]);
		});

		it('accepts a custom specials array with explicit disabled values', () => {
			const result = calendarSchema.parse({
				...minimalValidInput,
				specials: [
					{
						day: 3,
						disabled: false,
						start: 60,
						end: 120,
					},
				],
			});

			expect(result.specials).toEqual([
				{
					day: 3,
					disabled: false,
					start: 60,
					end: 120,
				},
			]);
		});

		it('rejects an accept entry with a non-numeric day', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 'monday',
						start: 0,
						end: 100,
					},
				],
			});

			expect(result.success).toBe(false);
		});

		it('rejects an accept entry missing required start/end', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
					},
				],
			});

			expect(result.success).toBe(false);
		});

		it('rejects an accept entry with day outside 0-6', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 7,
						start: 0,
						end: 100,
					},
				],
			});

			expect(result.success).toBe(false);
		});

		it('rejects an accept entry with start equal to end', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						disabled: false,
						start: 600,
						end: 600,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(
					result.error.issues.some(
						(issue) =>
							issueKey(issue) === 'timerangeStartLessThanEnd' &&
							issue.path.join('.') === 'accepts.0.start',
					),
				).toBe(true);
				expect(
					result.error.issues.some(
						(issue) =>
							issueKey(issue) === 'timerangeStartLessThanEnd' &&
							issue.path.join('.') === 'accepts.0.end',
					),
				).toBe(true);
			}
		});

		it('rejects an accept entry with start greater than end', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						disabled: false,
						start: 600,
						end: 540,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(
					result.error.issues.some(
						(issue) =>
							issueKey(issue) === 'timerangeStartLessThanEnd' &&
							issue.path.join('.') === 'accepts.0.start',
					),
				).toBe(true);
			}
		});

		it('rejects overlapping accept intervals on the same day', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 720,
					},
					{
						day: 1,
						disabled: false,
						start: 600,
						end: 780,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				const intersectIssues = result.error.issues.filter(
					(issue) => issueKey(issue) === 'timerangeNotIntersect',
				);
				expect(intersectIssues.length).toBeGreaterThan(0);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'accepts.0.start',
					),
				).toBe(true);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'accepts.0.end',
					),
				).toBe(true);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'accepts.1.start',
					),
				).toBe(true);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'accepts.1.end',
					),
				).toBe(true);
			}
		});

		it('rejects overlapping accept intervals on the same day regardless of array order', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						disabled: false,
						start: 540,
						end: 600,
					},
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 600,
					},
					{
						day: 0,
						disabled: false,
						start: 550,
						end: 650,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(
					result.error.issues.some(
						(issue) => issueKey(issue) === 'timerangeNotIntersect',
					),
				).toBe(true);
			}
		});

		it('accepts non-overlapping accept intervals on the same day', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 600,
					},
					{
						day: 1,
						disabled: false,
						start: 660,
						end: 720,
					},
				],
			});

			expect(result.success).toBe(true);
		});

		it('does not treat accept intervals on different days as overlapping', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						disabled: false,
						start: 540,
						end: 720,
					},
					{
						day: 2,
						disabled: false,
						start: 540,
						end: 720,
					},
				],
			});

			expect(result.success).toBe(true);
		});

		it('rejects accept start/end minutes outside 0-1439', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				accepts: [
					{
						day: 0,
						disabled: false,
						start: 0,
						end: 24 * 60,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(
					result.error.issues.some(
						(issue) =>
							issueKey(issue) === 'hourRange' &&
							issue.path.join('.') === 'accepts.0.end',
					),
				).toBe(true);
			}
		});

		it('rejects overlapping special intervals on the same day', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				specials: [
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 720,
					},
					{
						day: 1,
						disabled: false,
						start: 600,
						end: 780,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				const intersectIssues = result.error.issues.filter(
					(issue) => issueKey(issue) === 'timerangeNotIntersect',
				);
				expect(intersectIssues.length).toBeGreaterThan(0);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'specials.0.start',
					),
				).toBe(true);
				expect(
					intersectIssues.some(
						(issue) => issue.path.join('.') === 'specials.1.end',
					),
				).toBe(true);
			}
		});

		it('accepts non-overlapping special intervals on the same day', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				specials: [
					{
						day: 1,
						disabled: false,
						start: 540,
						end: 600,
					},
					{
						day: 1,
						disabled: false,
						start: 660,
						end: 720,
					},
				],
			});

			expect(result.success).toBe(true);
		});

		it('rejects a special entry with start greater than end', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				specials: [
					{
						day: 0,
						disabled: false,
						start: 720,
						end: 600,
					},
				],
			});

			expect(result.success).toBe(false);
			if (!result.success) {
				expect(
					result.error.issues.some(
						(issue) =>
							issueKey(issue) === 'timerangeStartLessThanEnd' &&
							issue.path.join('.') === 'specials.0.start',
					),
				).toBe(true);
			}
		});
	});

	describe('excepts', () => {
		it('rejects an except with an empty name', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				excepts: [
					{
						name: '',
					},
				],
			});

			expect(result.success).toBe(false);
		});

		it('accepts valid except objects', () => {
			const excepts = [
				{
					name: 'holiday',
					date: 123,
					working: true,
					workStart: 0,
					workStop: 9 * 60,
				},
			];

			const result = calendarSchema.parse({
				...minimalValidInput,
				excepts,
			});

			expect(result.excepts).toEqual(excepts);
		});

		it('rejects invalid except array entries', () => {
			const result = calendarSchema.safeParse({
				...minimalValidInput,
				excepts: [
					null,
				],
			});

			expect(result.success).toBe(false);
		});
	});

	describe('startAt / endAt', () => {
		it('is optional and accepts any value type', () => {
			const result = calendarSchema.parse({
				...minimalValidInput,
				startAt: 1234567890,
				endAt: '2024-01-01',
			});

			expect(result.startAt).toBe(1234567890);
			expect(result.endAt).toBe('2024-01-01');
		});

		it('does not throw when omitted', () => {
			const result = calendarSchema.safeParse(minimalValidInput);

			expect(result.success).toBe(true);
		});
	});

	describe('negative cases', () => {
		it('collects issues for multiple missing required fields at once', () => {
			const result = calendarSchema.safeParse({});

			expect(result.success).toBe(false);
			if (!result.success) {
				const paths = result.error.issues.map((issue) => issue.path[0]);
				expect(paths).toEqual(
					expect.arrayContaining([
						'name',
						'timezone',
					]),
				);
			}
		});
	});
});

describe('validations barrel export', () => {
	it('re-exports calendarSchema from the validations index', async () => {
		const index = await import('../../index');

		expect(index.calendarSchema).toBe(calendarSchema);
		expect(typeof index.calendarSchema.parse).toBe('function');
	});
});

describe('getCalendarDayRangeIssues', () => {
	const row = (day: number, start: number, end: number) => ({
		day,
		disabled: false,
		start,
		end,
	});

	it('reports nothing for valid rows', () => {
		expect(
			getCalendarDayRangeIssues([
				row(0, 540, 541),
				row(0, 600, 660),
				row(1, 540, 1200),
			]),
		).toEqual([]);
	});

	it('reports both ends of a row whose start is not before its end', () => {
		expect(
			getCalendarDayRangeIssues([
				row(0, 600, 540),
			]),
		).toEqual([
			{
				index: 0,
				prop: 'start',
				key: 'timerangeStartLessThanEnd',
			},
			{
				index: 0,
				prop: 'end',
				key: 'timerangeStartLessThanEnd',
			},
		]);
	});

	it('reports every row of an overlap on the same day', () => {
		const issues = getCalendarDayRangeIssues([
			row(0, 540, 720),
			row(0, 600, 780),
		]);

		expect(issues.every(({ key }) => key === 'timerangeNotIntersect')).toBe(
			true,
		);
		expect(issues.map(({ index, prop }) => `${index}.${prop}`).sort()).toEqual([
			'0.end',
			'0.start',
			'1.end',
			'1.start',
		]);
	});

	it('does not treat the same hours on different days as an overlap', () => {
		expect(
			getCalendarDayRangeIssues([
				row(0, 540, 720),
				row(2, 540, 720),
			]),
		).toEqual([]);
	});

	it('reports a minute outside the day', () => {
		expect(
			getCalendarDayRangeIssues([
				row(0, 0, 24 * 60),
			]),
		).toEqual([
			{
				index: 0,
				prop: 'end',
				key: 'hourRange',
			},
		]);
	});
});
