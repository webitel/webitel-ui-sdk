import type { WebitelCasesCase } from '@webitel/api-services/gen/models';
import { z } from 'zod';

import { i18nIssue } from '../_shared/i18nIssue';
import { lookupSchema } from '../_shared/lookup.validations';

const lookupShape = () => lookupSchema.passthrough().default({});

const statusConditionShape = () =>
	z
		.object({
			id: z
				.union([
					z.string(),
					z.number(),
				])
				.optional(),
			name: z.string().optional(),
			final: z.boolean().optional(),
			initial: z.boolean().optional(),
		})
		.passthrough()
		.default({});

export const caseSchema = z.object({
	subject: z.string().default(''),
	source: lookupShape(),
	priority: lookupShape(),
	reporter: lookupShape(),
	service: lookupShape(),
	statusCondition: statusConditionShape(),
	closeReason: lookupSchema.passthrough().nullish(),
	closeResult: z.string().default(''),
} satisfies Partial<Record<keyof WebitelCasesCase, z.ZodType>>);

export const refineCaseCloseFields = (
	data: Pick<
		z.infer<typeof caseSchema>,
		'statusCondition' | 'closeReason' | 'closeResult'
	>,
	ctx: z.RefinementCtx,
) => {
	if (!data.statusCondition?.final) return;

	if (!data.closeReason?.id)
		ctx.addIssue({
			code: 'custom',
			path: data.closeReason
				? [
						'closeReason',
						'id',
					]
				: [
						'closeReason',
					],
			...i18nIssue('required'),
		});

	if (!data.closeResult)
		ctx.addIssue({
			code: 'custom',
			path: [
				'closeResult',
			],
			...i18nIssue('required'),
		});
};
