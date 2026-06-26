import type { WebitelCasesSLACondition } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const caseSLAConditionSchema = z.object<
	ZodShape<WebitelCasesSLACondition>
>({
	name: z.string().min(1),
});
