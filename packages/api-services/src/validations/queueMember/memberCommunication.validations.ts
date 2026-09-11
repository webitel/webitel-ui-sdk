import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import { phoneNumberSchema } from '../_shared/phoneNumber.validations';

/**
 * Carried over verbatim from the admin app's `digitsDtmfOnly` validator.
 *
 * NB the character class allows a literal `|` as well as digits and `w`/`W` —
 * `[\d|w|W]` was almost certainly meant to be `[\dwW]`. Preserved as-is:
 * tightening it would start rejecting values that save today.
 */
const dtmfPattern = /^[\d|w|W]*$/;

/**
 * @description
 * One way to reach a queue member.
 *
 * `destination` is only checked for being non-empty, because its format depends
 * on the type, and the channel type here is a plain lookup without a channel.
 * When the channel is known to be a phone one, use
 * `phoneMemberCommunicationSchema`.
 */
export const memberCommunicationSchema = z.object({
	destination: z.string().min(1),
	type: filledLookupSchema,
	dtmf: z.string().regex(dtmfPattern).optional(),
	display: z.string().optional(),
	priority: z.number().optional(),
	resource: flexibleLookupSchema.optional(),
	description: z.string().optional(),
});

/**
 * @description
 * Same communication, but for a `Phone` channel: the destination gets dialed,
 * so it must be a valid number.
 *
 * It is a full schema, not a single rule, because regle validates forms against
 * an object schema. To check a destination alone, use `phoneNumberSchema`.
 *
 * [WTEL-10374](https://webitel.atlassian.net/browse/WTEL-10374)
 */
export const phoneMemberCommunicationSchema = memberCommunicationSchema.extend({
	destination: phoneNumberSchema,
});
