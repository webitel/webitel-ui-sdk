import type { EngineOnlineSkills } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';
import { lookupSchema } from '../_shared/lookup.validations';

export const onlineSkillSchema = z.object<ZodShape<EngineOnlineSkills>>({
	name: z.string().min(1),
	description: z.string().optional(),
	skills: z.array(lookupSchema).optional(),
});
