import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const queueBucketSchema = z.object({
	bucket: filledLookupSchema,
	/** legacy: required + numeric + minValue(0) */
	priority: z.number().min(0),
	disabled: z.boolean().optional(),
});
