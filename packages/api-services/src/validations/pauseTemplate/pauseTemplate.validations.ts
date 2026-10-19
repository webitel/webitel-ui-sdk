import type {
	WfmPauseTemplate,
	WfmPauseTemplateCause,
} from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { flexibleLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

/**
 * [Claude] the API returns the duration (minutes) as an int64 string. An emptied
 * field becomes `undefined` (not `NaN` as with `z.coerce`), so the form shows
 * "required" instead of zod's raw "expected number, received NaN".
 */
const durationMinutesSchema = z.preprocess(
	(value) =>
		value === '' || value === null || value === undefined
			? undefined
			: Number(value),
	z.number().int().min(1),
);

/**
 * [Claude] the pause cause is optional ("Not selected"), the duration is not.
 */
export const pauseTemplateCauseSchema = z.object({
	cause: flexibleLookupSchema.nullish(),
	duration: durationMinutesSchema,
});

/**
 * [Claude] a new template row: no pause cause ("Not selected"), 30 minutes.
 * Shared by the schema default and the form's "add row" action.
 */
export const getDefaultPauseTemplateCause = (): WfmPauseTemplateCause & {
	duration: string;
} => ({
	duration: '30',
});

export const pauseTemplateSchema = z.object<ZodShape<WfmPauseTemplate>>({
	name: z.string().min(1).max(250).default(''),
	description: z.string().optional().default(''),
	causes: z
		.array(pauseTemplateCauseSchema)
		.min(1)
		// [Claude] `.prefault`, not `.default`: the API-shaped row (duration as a string) goes through the schema
		.prefault(() => [
			getDefaultPauseTemplateCause(),
		]),
});
