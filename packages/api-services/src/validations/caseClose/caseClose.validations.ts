import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';

export const caseCloseSchema = z
	.object({
		reason: z
			.object({
				id: z.union([
					z.string(),
					z.number(),
				]),
			})
			.passthrough()
			.nullable(),
		result: z.string().nullable(),
	})
	.superRefine((data, ctx) => {
		if (!data.reason?.id) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'reason',
				],
				...i18nIssue('required'),
			});
		}

		if (!data.result) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'result',
				],
				...i18nIssue('required'),
			});
		}
	});

export type CaseClose = z.infer<typeof caseCloseSchema>;
