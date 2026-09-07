import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { queueHookSchema } from '../queueHook.validations';

describe('queueHookSchema', () => {
	/**
	 * The card store seeds a new item from the schema defaults, so a hook added
	 * from the queue card must come out enabled — as it did before the pinia
	 * migration replaced the vuex `resettableItemState`.
	 */
	it('defaults a new hook to enabled', () => {
		expect(getDefaultsFromZodSchema(queueHookSchema, {})).toMatchObject({
			enabled: true,
		});
	});

	it('keeps a disabled hook disabled', () => {
		const result = queueHookSchema.safeParse({
			event: 'joined',
			schema: {
				id: '1',
				name: 'flow',
			},
			enabled: false,
		});

		expect(result.success).toBe(true);
		expect(result.data?.enabled).toBe(false);
	});
});
