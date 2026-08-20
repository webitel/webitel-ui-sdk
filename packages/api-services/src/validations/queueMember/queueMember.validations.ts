import { z } from 'zod';

import { flexibleLookupSchema } from '../_shared/lookup.validations';
import { variablePairSchema } from '../_shared/variablePair.validations';
import { memberCommunicationSchema } from './memberCommunication.validations';

/**
 * @description
 * A queue member.
 *
 * `communications` and `variables` must stay in the schema even though neither
 * is validated beyond "at least one communication": the card store saves the
 * schema's parsed output, so a key that is absent here is a key that never
 * reaches the backend.
 */
export const queueMemberSchema = z.object({
	name: z.string().min(1),
	/** legacy `requiredArrayValue` — a member with no way to reach it is useless */
	communications: z.array(memberCommunicationSchema).min(1),
	priority: z.number().optional(),
	bucket: flexibleLookupSchema.optional(),
	timezone: flexibleLookupSchema.optional(),
	agent: flexibleLookupSchema.optional(),
	expireAt: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
	minOfferingAt: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
	stopCause: z.string().optional(),
	variables: z.array(variablePairSchema).optional(),
});
