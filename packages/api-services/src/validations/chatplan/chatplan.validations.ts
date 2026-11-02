import type { EngineChatPlan } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

export const chatplanSchema = z.object({
	name: z.string().min(1).default(''),
	schema: filledLookupSchema.default({}),
	description: z.string().optional().default(''),
	enabled: z.boolean().optional().default(true),
});

export type ChatplanFormShape = z.input<typeof chatplanSchema>;

/** [Claude] the chatplan as a card holds it: the API entity with the form's fields */
export type ChatplanCard = Omit<EngineChatPlan, keyof ChatplanFormShape> &
	ChatplanFormShape;
