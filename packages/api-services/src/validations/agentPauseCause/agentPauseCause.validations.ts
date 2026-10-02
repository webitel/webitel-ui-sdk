import type { EngineAgentPauseCause } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import { flexibleLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const agentPauseCauseSchema = z.object<ZodShape<EngineAgentPauseCause>>({
	name: z.string().min(1).default(''),
	limitMin: clearableNumberSchema.default(60),
	description: z.string().optional().default(''),
	allowAdmin: z.boolean().default(true),
	allowSupervisor: z.boolean().default(true),
	allowAgent: z.boolean().default(true),
	teams: z.array(flexibleLookupSchema).optional().default([]),
});
