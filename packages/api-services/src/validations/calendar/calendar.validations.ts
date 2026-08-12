import type { EngineCalendar } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const dayMinuteSchema = z
	.number()
	.int()
	.min(0)
	.max(24 * 60);

/** UI shape: minutes as `start`/`end` (API maps to startTimeOfDay/endTimeOfDay). */
const acceptOfDayUiSchema = z.object({
	day: z.number().int().min(0).max(6),
	disabled: z.boolean().default(false),
	start: dayMinuteSchema,
	end: dayMinuteSchema,
});

const exceptUiSchema = z.object({
	name: z.string().optional(),
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
	accepts: z.array(acceptOfDayUiSchema).default(defaultAccepts),
	specials: z.array(acceptOfDayUiSchema).default(defaultSpecials),
	excepts: z.array(exceptUiSchema).optional().default([]),
});
