import { get } from 'lodash-es';
import { z } from 'zod';

import { isFilled } from '../_shared/isFilled';
import { flexibleLookupSchema } from '../_shared/lookup.validations';
import { variablePairSchema } from '../_shared/variablePair.validations';
import { queueTypeRules, sharedQueueRules } from './queue.rules';
import { queuePayloadSchema } from './queuePayload.validations';
import { taskProcessingSchema } from './taskProcessing.validations';

/**
 * @description
 * One flat schema covering all ten queue types, rather than a discriminated
 * union on `type`.
 *
 * The union would be more precise, but Regle would then infer
 * `validationFields` as a union too, and every form tab would need narrowing
 * before it could read a field. Flat keeps `validationFields.<field>` reachable
 * from every tab regardless of type, and the per-type rules move into the
 * `superRefine` below.
 *
 * `.superRefine` is safe to build on here: since zod 4 it lives inside the
 * schema and returns a `ZodObject`, so `schema.keyof()` still works and
 * `createCardStore` still accepts it.
 */
export const queueSchemaBase = z.object({
	// identity
	name: z.string().min(1),
	description: z.string().optional(),
	type: z.number(),
	enabled: z.boolean().optional(),
	priority: z.number().optional(),
	tags: z
		.array(
			z.object({
				name: z.string(),
			}),
		)
		.optional(),

	// lookups
	calendar: flexibleLookupSchema.optional(),
	team: flexibleLookupSchema.optional(),
	dncList: flexibleLookupSchema.optional(),
	grantee: flexibleLookupSchema.optional(),
	ringtone: flexibleLookupSchema.optional(),
	schema: flexibleLookupSchema.optional(),
	doSchema: flexibleLookupSchema.optional(),
	afterSchema: flexibleLookupSchema.optional(),
	formSchema: flexibleLookupSchema.optional(),

	// behaviour
	strategy: z.string().optional(),
	stickyAgent: z.boolean().optional(),

	taskProcessing: taskProcessingSchema.optional(),
	payload: queuePayloadSchema.optional(),

	variables: z.array(variablePairSchema).optional(),
});

/**
 * Applies the rules the legacy `validations()` switch used to build per type.
 * Paths are dotted, so an issue raised for `payload.maxWaitTime` lands on
 * `validationFields.payload.$fields.maxWaitTime`.
 */
export const queueSchema = queueSchemaBase.superRefine((queue, ctx) => {
	const rules = [
		sharedQueueRules,
		queueTypeRules[Number(queue.type)] ?? {},
	];

	for (const rule of rules) {
		for (const path of rule.required ?? []) {
			if (!isFilled(get(queue, path))) {
				ctx.addIssue({
					code: 'custom',
					path: path.split('.'),
					message: 'Value is required',
				});
			}
		}

		for (const [path, min] of Object.entries(rule.minValue ?? {})) {
			const value = get(queue, path);
			// an absent optional field is the `required` rules' business, not this one
			if (value === undefined || value === null || value === '') continue;
			if (Number(value) < min) {
				ctx.addIssue({
					code: 'custom',
					path: path.split('.'),
					message: `Value must be ${min} or greater`,
				});
			}
		}
	}
});

/**
 * The queue as the *form* holds it. Not an entity type — it has no `id`, and
 * `variables` is the editable pair list rather than the wire-format map. Apps
 * pair this with `EngineQueue` for the parts the form does not own.
 */
export type QueueFormShape = z.infer<typeof queueSchemaBase>;
