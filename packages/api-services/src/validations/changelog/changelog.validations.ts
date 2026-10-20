import type { LoggerConfig } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import {
	filledLookupSchema,
	flexibleLookupSchema,
} from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

export type ChangelogCard = LoggerConfig;

/** [Claude] Changelog card schema: which object is logged, where the logs go and for how long. */
export const changelogSchema = z.object<ZodShape<LoggerConfig>>({
	id: z.number().optional(),
	// [Claude] `.prefault`, not `.default`: zod 4's `.default({})` would skip the required check
	object: filledLookupSchema.prefault({}),
	storage: flexibleLookupSchema.optional().default({}),
	daysToStore: z.number().min(1).default(7),
	period: z.number().default(7),
	enabled: z.boolean().default(false),
	description: z.string().optional().default(''),
});
