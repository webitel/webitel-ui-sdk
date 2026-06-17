import type { ContactsDynamicCondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const contactGroupConditionSchema = z.object<
	ZodShape<ContactsDynamicCondition>
>({
	expression: z.string().min(1),
	group: z.object({
		id: z.string().min(1),
		name: z.string().optional(),
	}),
	assignee: z
		.object({
			id: z.string().optional(),
			name: z.string().optional(),
		})
		.optional(),
});
