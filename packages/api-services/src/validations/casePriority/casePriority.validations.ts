import { z } from 'zod';
import type { ZodShape } from '../types';
import type { WebitelCasesPriority } from '@webitel/api-services/gen/models';

export const casePrioritySchema = z.object<ZodShape<WebitelCasesPriority>>({
	name: z.string().min(1),
});
