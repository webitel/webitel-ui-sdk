import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';

export const queueSkillSchemaBase = z.object({
	skill: filledLookupSchema,
	lvl: z.number().min(0).max(1000),
	minCapacity: z.number().min(0).max(100).optional(),
	maxCapacity: z.number().min(0).max(100).optional(),
	buckets: z.array(flexibleLookupSchema).optional(),
	enabled: z.boolean().optional(),
});

/**
 * `minCapacity` and `maxCapacity` bound each other, which Vuelidate expressed
 * as a pair of cross-field validators. Both sides are reported, so whichever
 * field the user is editing shows the error.
 */
export const queueSkillSchema = queueSkillSchemaBase.superRefine(
	(skill, ctx) => {
		if (skill.minCapacity == null || skill.maxCapacity == null) return;
		if (skill.minCapacity <= skill.maxCapacity) return;

		ctx.addIssue({
			code: 'custom',
			path: [
				'minCapacity',
			],
			message: 'Value must be less than or equal to the maximum capacity',
		});
		ctx.addIssue({
			code: 'custom',
			path: [
				'maxCapacity',
			],
			message: 'Value must be greater than or equal to the minimum capacity',
		});
	},
);
