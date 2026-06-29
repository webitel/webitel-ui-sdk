import type { WebitelCasesPriority } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const casePrioritySchema = z.object<ZodShape<WebitelCasesPriority>>({
	name: z.string().min(1),
	color: z.string().min(1),
	description: z.string().optional(),
});
