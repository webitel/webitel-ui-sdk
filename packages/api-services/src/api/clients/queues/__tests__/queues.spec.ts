import { beforeEach, describe, expect, it, vi } from 'vitest';

import { QueueType } from '../../../../enums';

const readQueue = vi.fn();
const searchQueue = vi.fn();

vi.mock('../../../../gen-wire', () => ({
	getQueueService: () => ({
		readQueue,
		searchQueue,
	}),
}));

const { QueuesAPI } = await import('../queues');

/**
 * proto3 omits zero values, so an OFFLINE_QUEUE (type `0`) arrives with no
 * `type` key at all. Legacy restored it with a `defaultObject`; these tests
 * pin that the restore survived the migration.
 *
 * The failure mode is silent and severe: without `type`, `getQueueDefaults`
 * falls back to the type-agnostic base, the Params tab renders none of the
 * offline-specific controls, and `queueSchema`'s `superRefine` skips the
 * per-type branch — the form just quietly loses half its behaviour.
 */
describe('QueuesAPI.get, on a type-less (offline) response', () => {
	beforeEach(() => {
		readQueue.mockReset();
	});

	it('restores type 0 and seeds the offline defaults', async () => {
		readQueue.mockResolvedValue({
			data: {
				id: 239,
				name: 'offline',
				payload: {},
			},
		});

		const item = await QueuesAPI.get({
			itemId: 239,
		});

		expect(item.type).toBe(QueueType.OFFLINE_QUEUE);
		// seeded from offlineQueue(), not from the base defaults
		expect(item.payload).toMatchObject({
			maxAttempts: 3,
			originateTimeout: 60,
			minOnlineAgents: 0,
		});
		expect(item.taskProcessing).toBeDefined();
	});

	it('never overwrites a type the backend did send', async () => {
		readQueue.mockResolvedValue({
			data: {
				id: 15,
				type: QueueType.CHAT_INBOUND_QUEUE,
				payload: {},
			},
		});

		const item = await QueuesAPI.get({
			itemId: 15,
		});

		expect(item.type).toBe(QueueType.CHAT_INBOUND_QUEUE);
	});
});

describe('QueuesAPI.getList, on type-less rows', () => {
	beforeEach(() => {
		searchQueue.mockReset();
	});

	/**
	 * The table renders `type`, `active` and `waiting` straight into cells, so
	 * an omitted zero shows up as a blank column rather than "Offline queue"/0.
	 */
	it('restores the zero values the table renders', async () => {
		searchQueue.mockResolvedValue({
			data: {
				items: [
					{
						id: 239,
						name: 'offline',
					},
				],
				next: false,
			},
		});

		const { items } = await QueuesAPI.getList({});

		expect(items[0]).toMatchObject({
			type: QueueType.OFFLINE_QUEUE,
			enabled: false,
			active: 0,
			waiting: 0,
		});
	});

	it('leaves non-zero values alone', async () => {
		searchQueue.mockResolvedValue({
			data: {
				items: [
					{
						id: 15,
						type: QueueType.CHAT_INBOUND_QUEUE,
						enabled: true,
						active: 4,
						priority: 1000,
					},
				],
				next: false,
			},
		});

		const { items } = await QueuesAPI.getList({});

		expect(items[0]).toMatchObject({
			type: QueueType.CHAT_INBOUND_QUEUE,
			enabled: true,
			active: 4,
			priority: 1000,
			waiting: 0,
		});
	});
});
