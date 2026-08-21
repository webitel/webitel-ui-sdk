import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';

export const queueResGroupSchema = z.object({
	resourceGroup: filledLookupSchema,
	/**
	 * Sent, but never edited — the popup has no control for it. Kept so it
	 * survives a round-trip rather than being stripped on save.
	 */
	communication: flexibleLookupSchema.optional(),
});
