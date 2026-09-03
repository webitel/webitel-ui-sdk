import { z } from 'zod';

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
			});
		}

		if (!data.result) {
			ctx.addIssue({
				code: 'custom',
			});
		}
	});

export type CaseClose = z.infer<typeof caseCloseSchema>;
