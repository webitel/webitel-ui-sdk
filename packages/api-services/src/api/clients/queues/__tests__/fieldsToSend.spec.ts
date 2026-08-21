import { getShallowFieldsToSendFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import {
	queueBucketSchema,
	queueHookSchema,
	queueMemberSchema,
	queueResGroupSchema,
	queueSchema,
	queueSkillSchema,
} from '../../../../validations';

/**
 * The queue api modules derive their `sanitize()` whitelists from these
 * schemas, so the form and the request cannot drift apart. That only holds
 * while `getShallowFieldsToSendFromZodSchema` can still read the keys — and
 * `queueSchema` and `queueSkillSchema` are `superRefine`-wrapped, which would
 * hide them if zod ever moved refinements back outside the object.
 */
const fieldsOf = (
	schema: Parameters<typeof getShallowFieldsToSendFromZodSchema>[0],
) =>
	[
		...getShallowFieldsToSendFromZodSchema(schema),
	].sort();

describe('fields derived from the queue schemas', () => {
	it('sends every editable queue field', () => {
		expect(fieldsOf(queueSchema)).toEqual([
			'afterSchema',
			'calendar',
			'description',
			'dncList',
			'doSchema',
			'enabled',
			'formSchema',
			'grantee',
			'name',
			'payload',
			'priority',
			'ringtone',
			'schema',
			'stickyAgent',
			'strategy',
			'tags',
			'taskProcessing',
			'team',
			'type',
			'variables',
		]);
	});

	it('reads through the queue superRefine', () => {
		// the rules wrapper must not hide the shape from the whitelist
		expect(fieldsOf(queueSchema)).toContain('payload');
		expect(fieldsOf(queueSkillSchema)).toContain('skill');
	});

	it.each([
		[
			'hook',
			queueHookSchema,
			[
				'enabled',
				'event',
				'properties',
				'schema',
			],
		],
		[
			'bucket',
			queueBucketSchema,
			[
				'bucket',
				'disabled',
				'priority',
			],
		],
		[
			'resource group',
			queueResGroupSchema,
			[
				'communication',
				'resourceGroup',
			],
		],
		[
			'skill',
			queueSkillSchema,
			[
				'buckets',
				'enabled',
				'lvl',
				'maxCapacity',
				'minCapacity',
				'skill',
			],
		],
		[
			'member',
			queueMemberSchema,
			[
				'agent',
				'bucket',
				'communications',
				'expireAt',
				'minOfferingAt',
				'name',
				'priority',
				'stopCause',
				'timezone',
				'variables',
			],
		],
	])('sends every editable %s field', (_entity, schema, expected) => {
		expect(fieldsOf(schema)).toEqual(expected);
	});

	/**
	 * `queueId` is put on nested bodies by each module's `preRequestHandler`; it
	 * belongs to the url, not the form, so it is appended to the derived list
	 * rather than added to the schema.
	 */
	it('leaves queueId out of the nested schemas', () => {
		for (const schema of [
			queueHookSchema,
			queueBucketSchema,
			queueResGroupSchema,
			queueSkillSchema,
			queueMemberSchema,
		]) {
			expect(fieldsOf(schema)).not.toContain('queueId');
		}
	});
});
