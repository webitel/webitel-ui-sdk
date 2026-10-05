import type { EngineTeamHook } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const teamHookSchema = z.object<ZodShape<EngineTeamHook>>({
	event: z.string().min(1),
	schema: filledLookupSchema,
	properties: z.array(z.string()).optional(),
	enabled: z.boolean().default(true),
});
