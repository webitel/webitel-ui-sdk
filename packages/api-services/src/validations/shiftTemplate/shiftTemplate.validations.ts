import type { WfmShiftTemplate } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import {
	getTimeRangeErrors,
	type TimeRange,
	timeRangeSchema,
} from '../_shared/timeRange.validations';
import type { ZodShape } from '../types';

/**
 * [Claude] each row is a part of the shift within a day: start < end, both in minutes
 */
const shiftTemplateTimesSchema = z.array(timeRangeSchema).min(1);

/**
 * [Claude] row errors for `useTimeRangesValidation`: regle marks a row as a plain field,
 * so the custom range issues are read from the schema directly
 */
export const getShiftTemplateTimeRangeErrors = (items: unknown) =>
	getTimeRangeErrors(shiftTemplateTimesSchema, items);

/**
 * [Claude] a new template row: 9:00–20:00 (minutes of the day).
 * Shared by the schema default and the form's "add row" action.
 */
export const getDefaultShiftTemplateTime = (): TimeRange => ({
	start: 9 * 60,
	end: 20 * 60,
});

export const shiftTemplateSchema = z.object<ZodShape<WfmShiftTemplate>>({
	name: z.string().min(1).max(250).default(''),
	description: z.string().optional().default(''),
	times: shiftTemplateTimesSchema.default(() => [
		getDefaultShiftTemplateTime(),
	]),
});
