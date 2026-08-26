import type { WebitelCasesCatalog } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import {
	lookupSchema,
	requiredLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export const caseServiceCatalogSchema = z.object<ZodShape<WebitelCasesCatalog>>(
	{
		name: z.string().min(1),
		prefix: z.string().min(1),
		status: requiredLookupSchema,
		closeReasonGroup: requiredLookupSchema,
		sla: requiredLookupSchema,
		defaultPriority: requiredLookupSchema,
		teams: z.array(lookupSchema).optional(),
		skills: z.array(lookupSchema).optional(),
		code: z.string().optional(),
		description: z.string().optional(),
		state: z.boolean().default(true),
	},
);
