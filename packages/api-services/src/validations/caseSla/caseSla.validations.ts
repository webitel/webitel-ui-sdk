import type { WebitelCasesSLA } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const caseSLASchema = z.object<ZodShape<WebitelCasesSLA>>({
	name: z.string().min(1),
	calendar: requiredLookupSchema,
	reactionTime: z.union([
		z.string().min(1),
		z.number().min(1),
	]),
	resolutionTime: z.union([
		z.string().min(1),
		z.number().min(1),
	]),
	description: z.string().optional(),
	validFrom: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
	validTo: z
		.union([
			z.string(),
			z.number(),
		])
		.optional(),
});
