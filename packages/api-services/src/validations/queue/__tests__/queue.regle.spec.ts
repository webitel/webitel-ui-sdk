import { useRegleSchema } from '@regle/schemas';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

import { getQueueDefaults } from '../../../api/clients/queues/defaults/queueTypeDefaults';
import { QueueType } from '../../../enums';
import { queueSchema } from '../queue.validations';

/**
 * @description
 * The schema's required rules only matter if Regle surfaces them: the card
 * disables its save button on `r$.$error`, and `wt-single-select` highlights on
 * the field status' `$error`. An issue whose path stops at an object-typed
 * field reaches neither, which is how a cleared `Calendar`/`Schema` used to
 * save silently. https://webitel.atlassian.net/browse/WTEL-10408
 */
const filledQueue = (type: number) => ({
	...(getQueueDefaults(type) as Record<string, unknown>),
	name: 'Support',
	strategy: 'random',
	calendar: {
		id: '1',
		name: 'Working hours',
	},
	schema: {
		id: '2',
		name: 'Flow',
	},
	payload: {
		...((
			getQueueDefaults(type) as {
				payload?: Record<string, unknown>;
			}
		).payload ?? {}),
		resourceStrategy: 'default',
	},
});

describe('queueSchema through Regle', () => {
	it.each([
		'calendar',
		'schema',
	])('reports a cleared %s on the field the form binds', async (field) => {
		const state = ref<Record<string, unknown>>(
			filledQueue(QueueType.OUTBOUND_IVR_QUEUE),
		);
		const { r$ } = useRegleSchema(state, queueSchema);

		await r$.$validate();
		expect(r$.$error, 'a filled queue must validate').toBe(false);

		// what `wt-single-select`'s clear button emits for a lookup
		state.value[field] = {};
		await r$.$validate();

		// biome-ignore lint/suspicious/noExplicitAny: regle's field status shape
		const status = (r$.$fields as any)[field];

		expect(r$.$error, 'save must stay blocked').toBe(true);
		expect(status.$error, `${field} must be highlighted`).toBe(true);
		// `wt-single-select` renders the first message it finds under `$errors`;
		// the text itself is the app's error map, which is not installed here
		expect(status.$errors.id, 'a message must reach the ui').not.toEqual([]);
	});
});
