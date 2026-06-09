import { z } from 'zod';
import type { ZodShape } from '../types';
import type { WebitelCasesStatusCondition } from '@webitel/api-services/gen/models';

export const caseStatusConditionSchema = z.object<
	ZodShape<WebitelCasesStatusCondition>
>({
	name: z.string().min(1),
	description: z.string().optional(),
	final: z.boolean().optional(),
	initial: z.boolean().optional(),
	id: z.string().optional(),
	statusId: z.string().optional(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	createdBy: z.any().optional(),
	updatedBy: z.any().optional(),
});
