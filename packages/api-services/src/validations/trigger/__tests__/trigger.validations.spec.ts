import {
	EngineTriggerEventType,
	EngineTriggerObjectType,
	EngineTriggerType,
} from '@webitel/api-services/gen/models';
import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { triggerSchema } from '../trigger.validations';

const issuePaths = (result: ReturnType<typeof triggerSchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(triggerSchema, {});

const named = {
	name: 'trigger',
	schema: {
		id: '1',
		name: 'flow',
	},
};

describe('triggerSchema', () => {
	it('seeds a new trigger as an hourly cron', () => {
		expect(defaults()).toMatchObject({
			name: '',
			enabled: true,
			type: EngineTriggerType.Cron,
			timeout: 60,
			variables: [],
			expression: '0 */1 12 * * *',
			object: EngineTriggerObjectType.Cases,
		});
	});

	it('requires name, flow and the timezone of a cron trigger', () => {
		expect(issuePaths(triggerSchema.safeParse(defaults()))).toEqual(
			expect.arrayContaining([
				'name',
				'schema.id',
				'timezone.id',
			]),
		);
	});

	it('requires the object and the event of an event trigger, not the cron settings', () => {
		const paths = issuePaths(
			triggerSchema.safeParse({
				...defaults(),
				...named,
				type: EngineTriggerType.Event,
				object: '',
			}),
		);

		expect(paths).toEqual([
			'object',
			'event',
		]);
	});

	it('accepts a filled event trigger and an emptied timeout', () => {
		const result = triggerSchema.safeParse({
			...defaults(),
			...named,
			type: EngineTriggerType.Event,
			event: EngineTriggerEventType.Create,
			timeout: null,
		});

		expect(result.success).toBe(true);
	});

	it('rejects a negative timeout', () => {
		expect(
			issuePaths(
				triggerSchema.safeParse({
					...defaults(),
					...named,
					timezone: {
						id: 1,
						name: 'UTC',
					},
					timeout: -1,
				}),
			),
		).toEqual([
			'timeout',
		]);
	});
});
