import { z } from 'zod';

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
			});
		}

		if (data.type?.value === 'csv' && !data.separator) {
			ctx.addIssue({
				code: 'custom',
			});
		}
	});

export type CaseExportOptions = z.infer<typeof caseExportOptionsSchema>;
