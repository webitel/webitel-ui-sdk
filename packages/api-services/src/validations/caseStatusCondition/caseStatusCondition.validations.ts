import { z } from 'zod';
import type { ZodShape } from '../types';
import type { WebitelCasesStatusCondition } from '@webitel/api-services/gen/models';

export const caseStatusConditionSchema = z.object<
	ZodShape<WebitelCasesStatusCondition>
>({
	name: z.string().min(1),
});
