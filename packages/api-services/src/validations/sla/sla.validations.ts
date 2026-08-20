import type { WebitelCasesSLA } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredDurationSchema } from '../_shared/duration.validations';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const MINUTE_IN_MS = 60000;

export const slaSchema = z
	.object<ZodShape<WebitelCasesSLA>>({
		name: z.string().min(1),
		description: z.string().optional(),
		calendar: requiredLookupSchema,
		reactionTime: requiredDurationSchema(),
		resolutionTime: requiredDurationSchema(),
		validFrom: z
			.union([
				z.string(),
				z.number(),
			])
			.nullish(),
		validTo: z
			.union([
				z.string(),
				z.number(),
			])
			.nullish(),
	})
	.superRefine((data, ctx) => {
		if (!data.validFrom || !data.validTo) return;

		const validFrom = Number(data.validFrom);
		const validTo = Number(data.validTo);

		if (Number.isNaN(validFrom) || Number.isNaN(validTo)) return;

		if (validFrom > validTo - MINUTE_IN_MS) {
			ctx.addIssue({
				code: 'too_big',
				origin: 'date',
				maximum: validTo,
				inclusive: false,
				input: data.validFrom,
				path: [
					'validFrom',
				],
			});
		}
	});
