import { z } from 'zod';
import { WebitelCasesStatus } from '@webitel/api-services/gen/models';
import type { ZodShape } from '../types';

export const caseStatusSchema = z.object<ZodShape<WebitelCasesStatus>>({
	name: z.string().min(1),
	description: z.string().optional(),
});
