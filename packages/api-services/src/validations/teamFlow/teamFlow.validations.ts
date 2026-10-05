import type { EngineTeamTrigger } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const teamFlowSchema = z.object<ZodShape<EngineTeamTrigger>>({
	name: z.string().min(1),
	description: z.string().optional(),
	schema: filledLookupSchema,
	enabled: z.boolean().default(true),
});
