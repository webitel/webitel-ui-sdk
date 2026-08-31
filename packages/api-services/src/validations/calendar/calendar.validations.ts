import type { EngineCalendar } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { i18nIssue } from '../_shared/i18nIssue';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const HOUR_RANGE_KEY = 'hourRange';
const TIMERANGE_START_LESS_THAN_END_KEY = 'timerangeStartLessThanEnd';
const TIMERANGE_NOT_INTERSECT_KEY = 'timerangeNotIntersect';

/** Legacy hourRange: value >= 0 && value < 1440 */
const dayMinuteSchema = z
	.number()
	.int()
	.refine((value) => value >= 0 && value < 24 * 60, i18nIssue(HOUR_RANGE_KEY));

type AcceptOfDayUi = {
	day: number;
	start: number;
	end: number;
};

const getIntersectingIndices = (items: AcceptOfDayUi[]) => {
	const indices = new Set<number>();
	const indicesByDay = new Map<number, number[]>();

	items.forEach((item, index) => {
		const dayIndices = indicesByDay.get(item.day) ?? [];
		dayIndices.push(index);
		indicesByDay.set(item.day, dayIndices);
	});

	indicesByDay.forEach((dayIndices) => {
		const ranges: Array<{
			start: number;
			end: number;
			index: number;
		}> = [];

		dayIndices.forEach((index) => {
			const current = items[index];

			ranges.forEach((range) => {
				if (
					(current.start >= range.start && current.end <= range.end) ||
					(current.start <= range.start && current.end >= range.start) ||
					(current.start <= range.end && current.end >= range.end)
				) {
					indices.add(index);
					indices.add(range.index);
				}
			});

			ranges.push({
				start: current.start,
				end: current.end,
				index,
			});
		});
	});

	return indices;
};

/** UI shape: minutes as `start`/`end` (API maps to startTimeOfDay/endTimeOfDay). */
const acceptOfDayUiSchema = z
	.object({
		day: z.number().int().min(0).max(6),
		disabled: z.boolean().default(false),
		start: dayMinuteSchema,
		end: dayMinuteSchema,
	})
	.superRefine((item, ctx) => {
		if (item.start >= item.end) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'start',
				],
				...i18nIssue(TIMERANGE_START_LESS_THAN_END_KEY),
			});
			ctx.addIssue({
				code: 'custom',
				path: [
					'end',
				],
				...i18nIssue(TIMERANGE_START_LESS_THAN_END_KEY),
			});
		}
	});

const acceptsOfDayUiArraySchema = z
	.array(acceptOfDayUiSchema)
	.superRefine((items, ctx) => {
		getIntersectingIndices(items).forEach((index) => {
			ctx.addIssue({
				code: 'custom',
				path: [
					index,
					'start',
				],
				...i18nIssue(TIMERANGE_NOT_INTERSECT_KEY),
			});
			ctx.addIssue({
				code: 'custom',
				path: [
					index,
					'end',
				],
				...i18nIssue(TIMERANGE_NOT_INTERSECT_KEY),
			});
		});
	});

export type CalendarDayRangeIssue = {
	index: number;
	prop: string;
	/** message key, resolve as `validation.<key>` */
	key: string;
};

/**
 * The same rules as the card schema, reported per row so a form can mark the
 * offending inputs while the user types.
 *
 * A regle field status cannot serve that: with a standard schema, cross-row
 * verdicts (overlapping ranges) are only re-derived by a full `$validate()`,
 * so a row the user has not touched keeps a message that is no longer true.
 */
export const getCalendarDayRangeIssues = (
	items: unknown,
): CalendarDayRangeIssue[] => {
	const result = acceptsOfDayUiArraySchema.safeParse(items);

	if (result.success) return [];

	return result.error.issues.flatMap((issue) => {
		const [index, prop] = issue.path;
		const key =
			issue.code === 'custom' && typeof issue.params?.i18nKey === 'string'
				? issue.params.i18nKey
				: undefined;

		if (typeof index !== 'number' || typeof prop !== 'string' || !key) {
			return [];
		}

		return [
			{
				index,
				prop,
				key,
			},
		];
	});
};

export const calendarExceptSchema = z.object({
	name: z.string().min(1),
	date: z
		.union([
			z.number(),
			z.string(),
		])
		.optional(),
	repeat: z.boolean().optional(),
	working: z.boolean().optional(),
	workStart: dayMinuteSchema.nullish(),
	workStop: dayMinuteSchema.nullish(),
});

const defaultAccepts = () =>
	Array.from(
		{
			length: 7,
		},
		(_, day) => ({
			day,
			disabled: false,
			start: 9 * 60,
			end: 20 * 60,
		}),
	);

const defaultSpecials = () =>
	Array.from(
		{
			length: 7,
		},
		(_, day) => ({
			day,
			disabled: true,
			start: 9 * 60,
			end: 20 * 60,
		}),
	);

export const calendarSchema = z.object<
	ZodShape<EngineCalendar> & {
		expires?: z.ZodType;
		accepts?: z.ZodType;
		specials?: z.ZodType;
	}
>({
	name: z.string().min(1),
	description: z.string().optional().default(''),
	timezone: requiredLookupSchema,
	startAt: z.any().optional(),
	endAt: z.any().optional(),
	expires: z.boolean().optional().default(false),
	accepts: acceptsOfDayUiArraySchema.default(defaultAccepts),
	specials: acceptsOfDayUiArraySchema.default(defaultSpecials),
	excepts: z.array(calendarExceptSchema).optional().default([]),
});
