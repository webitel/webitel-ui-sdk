import type { EngineCalendar } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { i18nIssue } from '../_shared/i18nIssue';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import {
	dayMinuteSchema,
	getTimeRangeIssues,
	refineTimeRangesNotIntersect,
} from '../_shared/timeRange.validations';
import type { ZodShape } from '../types';

const TIMERANGE_START_LESS_THAN_END_KEY = 'timerangeStartLessThanEnd';

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
	.superRefine(refineTimeRangesNotIntersect((item) => item.day));

/**
 * The same rules as the card schema, reported per row so a form can mark the
 * offending inputs while the user types.
 *
 * A regle field status cannot serve that: with a standard schema, cross-row
 * verdicts (overlapping ranges) are only re-derived by a full `$validate()`,
 * so a row the user has not touched keeps a message that is no longer true.
 */
export const getCalendarDayRangeIssues = (items: unknown) =>
	getTimeRangeIssues(acceptsOfDayUiArraySchema, items);

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

/**
 * A new temporary calendar opens on the current day: the `expires` switcher
 * reveals the pickers already filled, instead of two empty required-looking
 * fields. Matches the same fallback the API mapper applies to a stored calendar.
 *
 * [WTEL-10431](https://webitel.atlassian.net/browse/WTEL-10431)
 */
const today = () => Date.now();

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
	startAt: z.any().optional().default(today),
	endAt: z.any().optional().default(today),
	expires: z.boolean().optional().default(false),
	accepts: acceptsOfDayUiArraySchema.default(defaultAccepts),
	specials: acceptsOfDayUiArraySchema.default(defaultSpecials),
	excepts: z.array(calendarExceptSchema).optional().default([]),
});
