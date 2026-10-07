import type { WfmWorkingCondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

/** [Claude] an optional whole number the user may clear (`wt-input-number` emits `null`) */
const optionalCountSchema = (max: number) =>
	z.number().int().min(0).max(max).nullish();

export const workingConditionSchema = z.object<ZodShape<WfmWorkingCondition>>({
	name: z.string().min(1).max(250),
	description: z.string().optional().default(''),
	workdayHours: optionalCountSchema(24),
	workdaysPerMonth: optionalCountSchema(31),
	vacation: optionalCountSchema(365),
	sickLeaves: optionalCountSchema(365),
	daysOff: optionalCountSchema(365),
	pauseDuration: optionalCountSchema(1440),
	pauseTemplate: filledLookupSchema,
	shiftTemplate: flexibleLookupSchema.nullish(),
});
