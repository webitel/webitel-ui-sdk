import type { WebitelCasesCase } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { lookupSchema } from '../_shared/lookup.validations';

const lookupShape = () => lookupSchema.passthrough().default({});

const statusConditionShape = () =>
	z
		.object({
			id: z
				.union([
					z.string(),
					z.number(),
				])
				.optional(),
			name: z.string().optional(),
			final: z.boolean().optional(),
			initial: z.boolean().optional(),
		})
		.passthrough()
		.default({});

export const caseSchema = z.object({
	subject: z.string().default(''),
	source: lookupShape(),
	priority: lookupShape(),
	reporter: lookupShape(),
	service: lookupShape(),
	statusCondition: statusConditionShape(),
	closeReason: lookupShape(),
	closeResult: z.string().default(''),
} satisfies Partial<Record<keyof WebitelCasesCase, z.ZodType>>);
