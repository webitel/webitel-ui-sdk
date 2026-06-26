import type { WebitelCasesSLACondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';
import { requiredLookupSchema } from '../_shared/lookup.validations';

export const caseSLAConditionSchema = z.object<
	ZodShape<WebitelCasesSLACondition>
>({
	name: z.string().min(1),
	priorities: z.array(requiredLookupSchema).min(1),
	reactionTime: z.union([
		z.string().min(1),
		z.number().min(1),
	]),
	resolutionTime: z.union([
		z.string().min(1),
		z.number().min(1),
	]),
});
