import type { WebitelCasesSLA } from '@webitel/api-services/gen/models';
import { z } from 'zod';
import { requiredLookupSchema } from '../_shared/lookup.validations';
import type { ZodShape } from '../types';

const generalLookupSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
});

const toTimestamp = (value: unknown): number | null => {
	if (value instanceof Date) {
		const dateTime = value.getTime();
		return Number.isFinite(dateTime) ? dateTime : null;
	}

	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : null;
	}

	if (typeof value === 'string' && value.trim()) {
		const asNumber = Number(value);
		if (Number.isFinite(asNumber)) {
			return asNumber;
		}

		const asDate = Date.parse(value);
		return Number.isFinite(asDate) ? asDate : null;
	}

	return null;
};

export const caseSLASchema = z
	.object<ZodShape<WebitelCasesSLA>>({
		id: z.string().optional(),
		name: z.string().min(1, 'Name is required'),

		calendar: requiredLookupSchema,

		reactionTime: z.number().min(1, 'Reaction time must be at least 1'),
		resolutionTime: z.number().min(1, 'Resolution time must be at least 1'),

		description: z.string().optional(),
		createdAt: z.string().optional(),
		createdBy: generalLookupSchema.optional(),
		updatedAt: z.string().optional(),
		updatedBy: generalLookupSchema.optional(),

		validFrom: z
			.union([
				z.string(),
				z.number(),
				z.date(),
			])
			.optional(),
		validTo: z
			.union([
				z.string(),
				z.number(),
				z.date(),
			])
			.optional(),
	})
	.superRefine((data, ctx) => {
		if (!data.validFrom || !data.validTo) return;

		const fromMs = toTimestamp(data.validFrom);
		const toMs = toTimestamp(data.validTo);
		if (fromMs === null || toMs === null) return;

		if (fromMs > toMs - 60000) {
			const errorMessage =
				'Valid From must be at least 1 minute less than Valid To';

			// Добавляем ошибку на validFrom
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorMessage,
				path: [
					'validFrom',
				],
			});

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: errorMessage,
				path: [
					'validTo',
				],
			});
		}
	});
