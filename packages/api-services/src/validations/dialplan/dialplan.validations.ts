import type { EngineRoutingOutboundCall } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';
import { regExpSchema } from '../_shared/regExp.validations';

export const dialplanSchema = z.object({
	name: z.string().min(1).default(''),
	schema: filledLookupSchema.default({}),
	pattern: regExpSchema.min(1).default(''),
	description: z.string().optional().default(''),
	allowTransfer: z.boolean().optional().default(false),
});

export type DialplanFormShape = z.input<typeof dialplanSchema>;

/** [Claude] the dialplan as a card holds it: the API entity with the form's fields */
export type DialplanCard = Omit<
	EngineRoutingOutboundCall,
	keyof DialplanFormShape
> &
	DialplanFormShape;
