import { z } from 'zod';

import { lookupSchema } from '../_shared/lookup.validations';

export const prolongationOptionsSchema = z.object({
	enabled: z.boolean().optional(),
	isTimeoutRetry: z.boolean().optional(),
	prolongationTimeSec: z.number().optional(),
	repeatsNumber: z.number().optional(),
});

export const taskProcessingSchema = z.object({
	enabled: z.boolean().optional(),
	formSchema: lookupSchema.optional(),
	sec: z.number().optional(),
	renewalSec: z.number().optional(),
	// `.prefault`, not `.default`: zod 4's `.default({})` does not recurse, so
	// the nested keys would be missing and Regle would build no `$fields` for
	// them — the prolongation block would lose its validation silently.
	prolongationOptions: prolongationOptionsSchema.prefault({}),
});
