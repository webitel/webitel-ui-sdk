import type { EngineSchemaVariable } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { isFilled } from '../_shared/isFilled';

/** [Claude] the form edits `value` as text, the generated model leaves it untyped */
export type SchemaVariableCard = Omit<EngineSchemaVariable, 'value'> & {
	value?: string;
};

/**
 * [Claude] Global variable card schema.
 *
 * An encrypted variable is never read back, so a saved one keeps its value
 * when the field is left empty; a new or a plain one needs it.
 */
export const schemaVariableSchema = z
	.object({
		id: z.number().optional(),
		name: z.string().min(1).default(''),
		value: z.string().optional().default(''),
		encrypt: z.boolean().default(false),
	})
	.superRefine((variable, ctx) => {
		if (variable.id && variable.encrypt) return;
		if (isFilled(variable.value)) return;
		ctx.addIssue({
			code: 'custom',
			path: [
				'value',
			],
			...i18nIssue('required'),
		});
	});
