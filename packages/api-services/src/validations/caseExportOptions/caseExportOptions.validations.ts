import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';

export const caseExportOptionsSchema = z
	.object({
		type: z
			.object({
				name: z.string(),
				value: z.string(),
			})
			.nullable(),
		separator: z.string().nullable(),
	})
	.superRefine((data, ctx) => {
		if (!data.type) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'type',
				],
				...i18nIssue('required'),
			});
		}

		if (data.type?.value === 'csv' && !data.separator) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'separator',
				],
				...i18nIssue('required'),
			});
		}
	});

export type CaseExportOptions = z.infer<typeof caseExportOptionsSchema>;
