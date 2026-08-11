import type { EngineCalendar } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

/** UI shape: minutes as `start`/`end` (API maps to startTimeOfDay/endTimeOfDay). */
const acceptOfDayUiSchema = z.object({
	day: z.number(),
	disabled: z.boolean().default(false),
	start: z.number(),
	end: z.number(),
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
	accepts: z.array(acceptOfDayUiSchema).default(defaultAccepts()),
	specials: z.array(acceptOfDayUiSchema).default(defaultSpecials()),
	excepts: z.array(z.any()).optional().default([]),
});
