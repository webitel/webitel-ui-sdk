import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { flexibleLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const teamSchema = z.object<ZodShape<EngineAgentTeam>>({
	id: z.string().optional(),
	name: z.string().min(1).default(''),
	description: z.string().optional().default(''),
	strategy: z.string().min(1).default(''),
	admin: z.array(flexibleLookupSchema).optional().default([]),
	screenControl: z.boolean().optional().default(false),
	maxNoAnswer: z.number().min(0).default(3),
	wrapUpTime: z.number().min(0).default(15),
	noAnswerDelayTime: z.number().min(0).default(30),
	taskAcceptTimeout: z.number().min(0).default(30),
	callTimeout: z.number().min(0).default(60),
	inviteChatTimeout: z.number().min(0).default(30),
});
