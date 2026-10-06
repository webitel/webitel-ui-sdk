import type { EngineOutboundResource } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import { filledLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const resourceSchema = z.object<ZodShape<EngineOutboundResource>>({
	name: z.string().min(1).default(''),
	gateway: filledLookupSchema,
	rps: z.number().min(-1).max(1000).default(10),
	limit: z.number().min(-1).max(5000).default(10),
	description: z.string().optional().default(''),
	maxSuccessivelyErrors: z.number().default(2),
	errorIds: z.array(z.string()).optional().default([]),
	patterns: z.array(z.string()).optional().default([]),
	failureDialDelay: clearableNumberSchema.default(0),
	parameters: z
		.object({
			cidType: z.string().optional().default(''),
			ignoreEarlyMedia: z.string().optional().default(''),
		})
		.optional()
		.default({
			cidType: '',
			ignoreEarlyMedia: '',
		}),
});
