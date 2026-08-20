import { get, set } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
	getQueueDefaults,
	QueueTypeDefaults,
} from '../../../api/clients/queues/defaults/queueTypeDefaults';
import { QueueType } from '../../../enums';
import { queueTypeRules, sharedQueueRules } from '../queue.rules';
import { queueSchema, queueSchemaBase } from '../queue.validations';

type AnyRecord = Record<string, unknown>;

const allQueueTypes = Object.values(QueueType);

/** Lookup fields are `{ id, name }`; everything else required here is scalar. */
const lookupPaths = new Set([
	'calendar',
	'schema',
	'team',
	'dncList',
	'grantee',
	'ringtone',
	'doSchema',
	'afterSchema',
	'formSchema',
]);

const filledValueFor = (path: string, current: unknown) => {
	if (lookupPaths.has(path))
		return {
			id: '1',
			name: 'x',
		};
	if (typeof current === 'number') return Math.max(current, 1);
	if (typeof current === 'string' && current) return current;
	return 'x';
};

const requiredPathsFor = (type: number) => [
	...(sharedQueueRules.required ?? []),
	...(queueTypeRules[type]?.required ?? []),
];

/** A queue of `type` with every required field filled in. */
const validQueueFor = (type: number): AnyRecord => {
	const queue = getQueueDefaults(type) as AnyRecord;
	queue.name = 'Support';
	for (const path of requiredPathsFor(type)) {
		set(queue, path, filledValueFor(path, get(queue, path)));
	}
	return queue;
};

const issuePaths = (result: z.ZodSafeParseResult<unknown>) =>
	result.success
		? []
		: result.error.issues.map((issue) => issue.path.join('.'));

describe('queueSchema', () => {
	/**
	 * `createCardStore` takes the schema straight, and
	 * `getShallowFieldsToSendFromZodSchema` calls `.keyof()` on it. Since zod 4
	 * keeps refinements inside the schema, `.superRefine` must leave a
	 * `ZodObject` behind — if that ever regresses, both break at once.
	 */
	it('stays a ZodObject after superRefine', () => {
		expect(queueSchema).toBeInstanceOf(z.ZodObject);
		expect(queueSchema.keyof().options).toEqual(
			queueSchemaBase.keyof().options,
		);
		expect(queueSchema.keyof().options).toContain('payload');
	});

	it('has a rule entry for every queue type', () => {
		for (const type of allQueueTypes) {
			expect(queueTypeRules[type], `missing rules for ${type}`).toBeDefined();
		}
	});

	it.each(allQueueTypes)('accepts a fully filled queue of type %i', (type) => {
		const result = queueSchema.safeParse(validQueueFor(type));

		expect(issuePaths(result)).toEqual([]);
	});

	/**
	 * The behaviour that actually matters: each type's own required list is
	 * enforced, and only for that type.
	 */
	it.each(allQueueTypes)('enforces every required field of type %i', (type) => {
		for (const path of requiredPathsFor(type)) {
			const queue = validQueueFor(type);
			set(queue, path, lookupPaths.has(path) ? {} : '');

			expect(
				issuePaths(queueSchema.safeParse(queue)),
				`${path} should be required for type ${type}`,
			).toContain(path);
		}
	});

	it.each(allQueueTypes)('enforces the minimums of type %i', (type) => {
		const minimums = {
			...sharedQueueRules.minValue,
			...queueTypeRules[type]?.minValue,
		};

		for (const [path, min] of Object.entries(minimums)) {
			const queue = validQueueFor(type);
			set(queue, path, min - 1);

			expect(
				issuePaths(queueSchema.safeParse(queue)),
				`${path} should be >= ${min} for type ${type}`,
			).toContain(path);
		}
	});

	/** Vuelidate's `required` treats 0 and false as filled; ours must too. */
	it('treats a zero priority as filled rather than missing', () => {
		const queue = validQueueFor(QueueType.INBOUND_QUEUE);
		queue.priority = 0;

		expect(issuePaths(queueSchema.safeParse(queue))).not.toContain('priority');
	});

	it('does not require team, which the legacy rules never enforced', () => {
		const queue = validQueueFor(QueueType.OFFLINE_QUEUE);
		queue.team = {};

		expect(issuePaths(queueSchema.safeParse(queue))).not.toContain('team');
	});

	/**
	 * Regle builds `$fields` from state keys, so anything the defaults seed must
	 * survive the schema — a key the schema strips has no validation entry, and
	 * the field silently loses its required marker and error text.
	 */
	it.each(allQueueTypes)('keeps every seeded key of type %i', (type) => {
		const defaults = QueueTypeDefaults[type]() as AnyRecord;
		const parsed = queueSchemaBase.parse(validQueueFor(type)) as AnyRecord;

		for (const key of Object.keys(defaults)) {
			expect(
				parsed,
				`top-level ${key} stripped for type ${type}`,
			).toHaveProperty(key);
		}

		for (const key of Object.keys(defaults.payload as AnyRecord)) {
			expect(
				parsed.payload,
				`payload.${key} stripped for type ${type}`,
			).toHaveProperty(key);
		}
	});
});
