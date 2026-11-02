import type { EngineQuickReply } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { flexibleLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const quickReplySchema = z.object<ZodShape<EngineQuickReply>>({
	name: z.string().min(1),
	text: z.string().min(1),
	teams: z.array(flexibleLookupSchema).optional().default([]),
	queues: z.array(flexibleLookupSchema).optional().default([]),
});
