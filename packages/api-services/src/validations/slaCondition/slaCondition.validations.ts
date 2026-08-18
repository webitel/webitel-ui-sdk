import type { WebitelCasesSLACondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredDurationSchema } from '../_shared/duration.validations';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const slaConditionSchema = z.object<ZodShape<WebitelCasesSLACondition>>({
	name: z.string().min(1),
	priorities: z.array(requiredLookupSchema).min(1),
	reactionTime: requiredDurationSchema(),
	resolutionTime: requiredDurationSchema(),
});
