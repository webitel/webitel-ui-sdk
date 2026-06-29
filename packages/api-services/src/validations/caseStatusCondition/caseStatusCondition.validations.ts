import type { WebitelCasesStatusCondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const caseStatusConditionSchema = z.object<
	ZodShape<WebitelCasesStatusCondition>
>({
	name: z.string().min(1),
	description: z.string().optional(),
});
