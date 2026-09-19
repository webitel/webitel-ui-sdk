import { get } from 'lodash-es';
import { z } from 'zod';

import { clearableNumberSchema } from '../_shared/clearableNumber.validations';
import { i18nIssue } from '../_shared/i18nIssue';
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
	priority: clearableNumberSchema,
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
 * Where a rule's required issue goes.
 *
 * Normally the rule's own path, but a lookup (`calendar`, `schema`) gets `.id`
 * appended: Regle builds a *nested* field status for an object-typed field, and
 * an issue whose path stops at that object has nowhere to land there — it
 * reaches neither `$errors` nor `$invalid`, so clearing the field showed no
 * message and left the save button enabled. WTEL-10408
 *
 * `wt-single-select` reads `$error` and the first message it finds in `$errors`,
 * both of which a nested status aggregates from its children, so the ui shows
 * the same thing it would for a leaf field.
 */
const requiredIssuePath = (path: string): string[] => {
	const segments = path.split('.');
	return isLookupPath(segments)
		? [
				...segments,
				'id',
			]
		: segments;
};

/** Unwraps `.optional()`, `.nullable()`, `.default()` … down to the schema itself. */
const innerSchema = (schema: unknown): unknown => {
	let current = schema;

	while (
		current &&
		typeof current === 'object' &&
		'def' in current &&
		(
			current as {
				def?: {
					innerType?: unknown;
				};
			}
		).def?.innerType
	) {
		current = (
			current as {
				def: {
					innerType: unknown;
				};
			}
		).def.innerType;
	}

	return current;
};

const shapeOf = (schema: unknown): Record<string, unknown> | undefined =>
	(
		innerSchema(schema) as
			| {
					shape?: Record<string, unknown>;
			  }
			| undefined
	)?.shape;

/** A lookup is the only object-shaped field with an `id` of its own. */
const isLookupPath = (segments: string[]): boolean => {
	let shape = shapeOf(queueSchemaBase);

	for (const segment of segments.slice(0, -1)) {
		shape = shapeOf(shape?.[segment]);
	}

	const field = shape?.[segments[segments.length - 1]];

	return !!field && 'id' in (shapeOf(field) ?? {});
};

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
					path: requiredIssuePath(path),
					...i18nIssue('required'),
				});
			}
		}

		for (const [path, min] of Object.entries(rule.minValue ?? {})) {
			const value = get(queue, path);
			// an absent optional field is the `required` rules' business, not this one
			if (value === undefined || value === null || value === '') continue;
			if (Number(value) < min) {
				/**
				 * `too_small`, not a message: a message wins over the app's error
				 * map, the only thing that translates. WTEL-10294
				 */
				ctx.addIssue({
					code: 'too_small',
					origin: 'number',
					minimum: min,
					inclusive: true,
					input: value,
					path: path.split('.'),
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
