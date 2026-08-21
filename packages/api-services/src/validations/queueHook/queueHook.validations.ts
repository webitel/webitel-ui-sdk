import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const queueHookSchema = z.object({
	event: z.string().min(1),
	schema: filledLookupSchema,
	properties: z.array(z.string()).optional(),
	enabled: z.boolean().optional(),
});
