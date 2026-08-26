import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';

/**
 * Carried over verbatim from the admin app's `digitsDtmfOnly` validator.
 *
 * NB the character class allows a literal `|` as well as digits and `w`/`W` —
 * `[\d|w|W]` was almost certainly meant to be `[\dwW]`. Preserved as-is:
 * tightening it would start rejecting values that save today.
 */
const dtmfPattern = /^[\d|w|W]*$/;

export const memberCommunicationSchema = z.object({
	destination: z.string().min(1),
	type: filledLookupSchema,
	dtmf: z.string().regex(dtmfPattern).optional(),
	display: z.string().optional(),
	priority: z.number().optional(),
	resource: flexibleLookupSchema.optional(),
	description: z.string().optional(),
});
