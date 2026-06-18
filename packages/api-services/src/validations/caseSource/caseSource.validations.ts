import type { WebitelCasesSource } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const caseSourceSchema = z.object<ZodShape<WebitelCasesSource>>({
	name: z.string().min(1),
	description: z.string().optional(),
	type: z.string().min(1),
});
