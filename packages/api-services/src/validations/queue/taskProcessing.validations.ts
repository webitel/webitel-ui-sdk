import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';

import { flexibleLookupSchema } from '../_shared/lookup.validations';

export const prolongationOptionsSchema = z.object({
	enabled: z.boolean().optional(),
	isTimeoutRetry: z.boolean().optional(),
	prolongationTimeSec: clearableNumberSchema,
	repeatsNumber: clearableNumberSchema,
});

export const taskProcessingSchema = z.object({
	enabled: z.boolean().optional(),
	formSchema: flexibleLookupSchema.optional(),
	sec: clearableNumberSchema,
	renewalSec: clearableNumberSchema,
	// `.prefault`, not `.default`: zod 4's `.default({})` does not recurse, so
	// the nested keys would be missing and Regle would build no `$fields` for
	// them — the prolongation block would lose its validation silently.
	prolongationOptions: prolongationOptionsSchema.prefault({}),
});
