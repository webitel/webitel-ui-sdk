import type { WebitelCasesService } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { lookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const caseServiceSchema = z.object<ZodShape<WebitelCasesService>>({
	name: z.string().min(1),
	assignee: lookupSchema.optional(),
	group: lookupSchema.optional(),
	sla: lookupSchema.optional(),
	defaultPriority: lookupSchema.optional(),
	code: z.string().optional(),
	description: z.string().optional(),
	state: z.boolean().default(true),
});
