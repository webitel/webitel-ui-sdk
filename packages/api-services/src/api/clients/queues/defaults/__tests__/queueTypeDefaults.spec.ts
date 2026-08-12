import { describe, expect, it } from 'vitest';

import { QueueType } from '../../../../../enums';
import processing from '../processing';
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
