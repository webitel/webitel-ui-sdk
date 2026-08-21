import { describe, expect, it } from 'vitest';

import { QueueType } from '../../../../../enums';
import { processing } from '../processing';
import {
	getQueueDefaults,
	hasQueueTypeDefaults,
	QueueTypeDefaults,
} from '../queueTypeDefaults';

const allQueueTypes = Object.values(QueueType);

/** The two types whose legacy schema deliberately has no `taskProcessing`. */
const typesWithoutTaskProcessing = [
	QueueType.OUTBOUND_IVR_QUEUE,
	QueueType.OUTBOUND_JOB_QUEUE,
];

/** The three types whose legacy schema carries `payload.amd`. */
const typesWithAmd = [
	QueueType.OUTBOUND_IVR_QUEUE,
	QueueType.PROGRESSIVE_DIALER,
	QueueType.PREDICTIVE_DIALER,
];

describe('queue type defaults', () => {
	it('has a factory for every QueueType', () => {
		for (const type of allQueueTypes) {
			expect(QueueTypeDefaults[type], `missing factory for ${type}`).toBeTypeOf(
				'function',
			);
		}
		expect(Object.keys(QueueTypeDefaults)).toHaveLength(allQueueTypes.length);
	});

	it('stamps each factory with its own type', () => {
		for (const type of allQueueTypes) {
			expect(QueueTypeDefaults[type]().type).toBe(type);
		}
	});

	/**
	 * The legacy code used factories precisely so two queues never shared a
	 * nested object. A plain object export would let edits on one new queue
	 * leak into the next one opened.
	 */
	it('returns a fresh deep object on every call', () => {
		for (const type of allQueueTypes) {
			const a = QueueTypeDefaults[type]();
			const b = QueueTypeDefaults[type]();

			expect(a).not.toBe(b);
			expect(a).toEqual(b);
			expect(a.payload).not.toBe(b.payload);
			expect(a.variables).not.toBe(b.variables);
		}
	});

	it('keeps taskProcessing exactly where the legacy schema had it', () => {
		for (const type of allQueueTypes) {
			const defaults = QueueTypeDefaults[type]();

			if (typesWithoutTaskProcessing.includes(type)) {
				expect(defaults.taskProcessing, `${type}`).toBeUndefined();
			} else {
				expect(defaults.taskProcessing, `${type}`).toBeDefined();
			}
		}
	});

	it('keeps payload.amd exactly where the legacy schema had it', () => {
		for (const type of allQueueTypes) {
			const { payload } = QueueTypeDefaults[type]();

			expect(Boolean(payload.amd), `${type}`).toBe(typesWithAmd.includes(type));
		}
	});

	/**
	 * Regression guard: api-services' `processing()` used to omit
	 * `prolongationOptions`, which left the Processing tab's prolongation block
	 * without Regle `$fields` — no required markers, no error text.
	 */
	it('seeds taskProcessing.prolongationOptions', () => {
		expect(processing().prolongationOptions).toEqual({
			enabled: false,
			isTimeoutRetry: false,
			prolongationTimeSec: 30,
			repeatsNumber: 1,
		});

		const defaults = QueueTypeDefaults[QueueType.INBOUND_QUEUE]();

		expect(defaults.taskProcessing).toMatchObject({
			prolongationOptions: {
				repeatsNumber: 1,
			},
		});
	});

	it('treats IM_CHAT_QUEUE as CHAT_INBOUND_QUEUE apart from the type', () => {
		const chat = QueueTypeDefaults[QueueType.CHAT_INBOUND_QUEUE]();
		const imChat = QueueTypeDefaults[QueueType.IM_CHAT_QUEUE]();

		expect({
			...imChat,
			type: chat.type,
		}).toEqual(chat);
	});
});

describe('getQueueDefaults', () => {
	it('resolves a numeric type', () => {
		expect(getQueueDefaults(QueueType.PREVIEW_DIALER).type).toBe(
			QueueType.PREVIEW_DIALER,
		);
	});

	/** The card page reads `?type=` off the route, so it arrives as a string. */
	it('resolves a stringified type from the route query', () => {
		expect(getQueueDefaults(String(QueueType.PREDICTIVE_DIALER)).type).toBe(
			QueueType.PREDICTIVE_DIALER,
		);
	});

	it('falls back to the base queue shape for an unknown type', () => {
		const defaults = getQueueDefaults(undefined);

		expect(defaults.type).toBeUndefined();
		expect(defaults).toMatchObject({
			name: '',
			priority: 0,
			variables: [],
		});
	});

	it('reports whether a type has defaults', () => {
		expect(hasQueueTypeDefaults(QueueType.OFFLINE_QUEUE)).toBe(true);
		expect(hasQueueTypeDefaults('4')).toBe(true);
		expect(hasQueueTypeDefaults(42)).toBe(false);
		expect(hasQueueTypeDefaults(undefined)).toBe(false);
	});
});

/**
 * A lookup the user has not filled must be seeded as `undefined`, not `{}`.
 *
 * The key still has to be there — regle builds its `$fields` from the state
 * keys — but an empty *object* makes regle treat the field as a collection and
 * file a root-level `superRefine` issue for it under an index, where nothing
 * reads it: the field shows no error, `r$.$error` stays false so the save
 * button stays enabled, and the save then aborts silently on `$validate()`.
 *
 * [WTEL-10140](https://webitel.atlassian.net/browse/WTEL-10140)
 */
describe('lookup defaults', () => {
	const lookupKeys = [
		'calendar',
		'dncList',
		'team',
		'ringtone',
		'grantee',
		'schema',
		'doSchema',
		'afterSchema',
		'formSchema',
	];

	it('seeds unset lookups as undefined, keeping the key', () => {
		for (const type of allQueueTypes) {
			const defaults = getQueueDefaults(type) as Record<string, unknown>;

			for (const key of lookupKeys) {
				if (!(key in defaults)) continue;

				expect(
					defaults[key],
					`${key} on queue type ${type} must be undefined, not an empty object`,
				).toBeUndefined();
			}
		}
	});

	it('keeps taskProcessing.formSchema out of the empty-object shape too', () => {
		const taskProcessing = processing() as Record<string, unknown>;

		expect(taskProcessing.formSchema).toBeUndefined();
	});
});
