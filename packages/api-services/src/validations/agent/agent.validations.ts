import type { EngineAgent } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const agentSchema = z.object<ZodShape<EngineAgent>>({
	id: z.string().optional(),
	user: filledLookupSchema,
	team: filledLookupSchema,
	supervisor: z.array(flexibleLookupSchema).optional().default([]),
	auditor: z.array(flexibleLookupSchema).optional().default([]),
	region: flexibleLookupSchema.optional().default({}),
	greetingMedia: flexibleLookupSchema.optional().default({}),
	progressiveCount: z.number().min(1).nullable().optional().default(null),
	chatCount: z.number().min(1).default(1),
	taskCount: z.number().min(1).default(1),
	extraChatCount: z.number().min(0).nullable().optional().default(0),
	isSupervisor: z.boolean().optional().default(false),
	screenControl: z.boolean().optional().default(false),
	allowSetScreenControl: z.boolean().optional(),
});
