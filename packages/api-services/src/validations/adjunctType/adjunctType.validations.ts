import type { DataInputDictionary } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import type { ZodShape } from '../types';

export const adjunctTypeSchema = z.object<ZodShape<DataInputDictionary>>({
	name: z.string().min(1),
	repo: z
		.string()
		.min(1)
		.refine(
			(value) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value),
			i18nIssue('latinWithNumber'),
		),
	about: z.string().optional(),
	administered: z.boolean().optional(),
	primary: z.string().optional(),
	display: z.string().optional(),
	fields: z.array(z.any()).optional(),
	indexes: z.any().optional(),
});
