import type { EngineSkill } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import type { ZodShape } from '../types';

export const skillSchema = z.object<ZodShape<EngineSkill>>({
	name: z.string().min(1).default(''),
	description: z.string().optional().default(''),
});
