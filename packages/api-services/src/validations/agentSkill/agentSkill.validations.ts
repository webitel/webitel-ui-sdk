import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const agentSkillSchema = z.object({
	skill: filledLookupSchema,
	capacity: z.number().min(0).max(100).default(10),
	enabled: z.boolean().default(true),
});
