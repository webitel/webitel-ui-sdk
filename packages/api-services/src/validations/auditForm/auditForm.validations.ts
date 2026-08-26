import type { EngineAuditForm } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { lookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const auditFormSchema = z.object<ZodShape<EngineAuditForm>>({
	name: z.string().min(3),
	description: z.string().optional(),
	teams: z.array(lookupSchema).optional().default([]),
	enabled: z.boolean().optional().default(true),
	questions: z.array(z.any()).min(1).default([]),
});
