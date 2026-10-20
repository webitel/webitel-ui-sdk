import {
	StorageImportSourceType,
	type StorageImportTemplate,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { filledLookupSchema } from '../_shared/lookup.validations';

/**
 * [Claude] CSV column names for each dialer member field: a single column for
 * a plain field, a list of columns for a multi-value one.
 */
const importTemplateMappingsSchema = z.object({
	name: z.string().min(1).default(''),
	timezoneId: z.string().optional().default(''),
	priority: z.string().optional().default(''),
	expireAt: z.string().optional().default(''),
	bucketId: z.string().optional().default(''),
	agentId: z.string().optional().default(''),
	variables: z.array(z.string()).default([]),
	destination: z.array(z.string()).min(1).default([]),
	commPriority: z.array(z.string()).default([]),
	code: z.array(z.string()).min(1).default([]),
	description: z.array(z.string()).default([]),
	dtmf: z.array(z.string()).default([]),
});

const importTemplateParametersSchema = z.object({
	charset: z
		.object({
			name: z.string(),
			value: z.string(),
		})
		.default({
			name: 'UTF-8',
			value: 'utf-8',
		}),
	separator: z.string().min(1).default(','),
	skipHeaders: z.boolean().default(true),
	clearMembers: z.boolean().default(false),
	// [Claude] `.prefault`, not `.default`: zod 4's `.default({})` would skip the nested defaults
	mappings: importTemplateMappingsSchema.prefault({}),
});

export type ImportTemplateCard = Omit<StorageImportTemplate, 'parameters'> & {
	parameters?: z.infer<typeof importTemplateParametersSchema>;
};

export const importTemplateSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1).default(''),
	description: z.string().optional().default(''),
	source: filledLookupSchema.prefault({}),
	sourceType: z.string().default(StorageImportSourceType.Dialer),
	parameters: importTemplateParametersSchema.prefault({}),
});
