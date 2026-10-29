import { z } from 'zod';

import { flexibleLookupSchema } from '../_shared/lookup.validations';

export const userTokenSchema = z.object({
	usage: z.string().min(1).default(''),
	expiryDays: z.number().int().min(0).nullish(),
	notifyUsers: z.array(flexibleLookupSchema).optional().default([]),
});
