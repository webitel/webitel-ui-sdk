import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import { phoneNumberSchema } from '../_shared/phoneNumber.validations';

/**
 * Copied as-is from admin's `digitsDtmfOnly`. NB `[\d|w|W]` also allows `|`
 * (likely meant `[\dwW]`); kept so values that save today stay valid.
 */
const dtmfPattern = /^[\d|w|W]*$/;

/**
 * One way to reach a queue member.
 *
 * `destination` is only checked for non-empty: its format depends on the
 * channel, which `type` does not carry. For phone channels use
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
 * Communication for a `Phone` channel: `destination` is dialed, so it must be
 * a valid number. A full schema because regle validates against object schemas.
 *
 * [WTEL-10374](https://webitel.atlassian.net/browse/WTEL-10374)
 */
export const phoneMemberCommunicationSchema = memberCommunicationSchema.extend({
	destination: phoneNumberSchema,
});
