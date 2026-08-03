import type { EngineSkillPreset } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import type { ZodShape } from '../types';

export const activityTypeSchema = z.object<ZodShape<EngineSkillPreset>>({
	name: z.string().min(1),
	description: z.string().optional(),
	skills: z
		.array(
			z.object({
				id: z.string().optional(),
				name: z.string().optional(),
			}),
		)
		.optional(),
});
