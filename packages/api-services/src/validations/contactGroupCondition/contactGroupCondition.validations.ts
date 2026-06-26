import type { ContactsDynamicCondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import {
	lookupSchema,
	requiredLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const contactGroupConditionSchema = z.object<
	ZodShape<ContactsDynamicCondition>
>({
	expression: z.string().min(1),
	group: requiredLookupSchema,
	assignee: lookupSchema.optional(),
});
