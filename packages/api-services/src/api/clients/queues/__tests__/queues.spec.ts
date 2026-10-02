import { beforeEach, describe, expect, it, vi } from 'vitest';

import { QueuePeriod, QueueType } from '../../../../enums';

const readQueue = vi.fn();
const searchQueue = vi.fn();
const searchQueueReportGeneral = vi.fn();

vi.mock('../../../../gen-wire', () => ({
	getQueueService: () => ({
		readQueue,
		searchQueue,
		searchQueueReportGeneral,
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

/**
 * `queuePeriod` is a relative-window preset the supervisor queues table sends
 * ('today', '3hour', …); the service only understands an absolute
 * `joined_at.from`/`joined_at.to` range, so resolving the preset to
 * timestamps happens inside `getReportGeneral` itself.
 */
describe('QueuesAPI.getReportGeneral, queuePeriod window resolution', () => {
	beforeEach(() => {
		searchQueueReportGeneral.mockReset();
		searchQueueReportGeneral.mockResolvedValue({
			data: {
				items: [],
				next: false,
			},
		});
	});

	it('defaults to today (start of day through now)', async () => {
		const end = Date.now();

		await QueuesAPI.getReportGeneral({});

		const sentParams = searchQueueReportGeneral.mock.calls[0][0];
		const expectedFrom = new Date(end).setHours(0, 0, 0, 0);

		// checking approx equality: `Date.now()` here and inside the call may
		// not be perfectly in sync
		expect(sentParams['joined_at.from'].slice(0, -4)).toEqual(
			`${expectedFrom}`.slice(0, -4),
		);
		expect(sentParams['joined_at.to'].slice(0, -4)).toEqual(
			`${end}`.slice(0, -4),
		);
	});

	it('resolves "3hour" to now minus 3 hours', async () => {
		const end = Date.now();

		await QueuesAPI.getReportGeneral({
			queuePeriod: QueuePeriod.ThreeHours,
		});

		const sentParams = searchQueueReportGeneral.mock.calls[0][0];
		const expectedFrom = end - 3 * 60 * 60 * 1000;

		expect(sentParams['joined_at.from'].slice(0, -3)).toEqual(
			`${expectedFrom}`.slice(0, -3),
		);
		expect(sentParams['joined_at.to'].slice(0, -3)).toEqual(
			`${end}`.slice(0, -3),
		);
	});
});

/**
 * The table renders bridged/abandoned/sl20/sl30 as percent strings and
 * duration fields rounded to 2 decimals directly, with no caller-side
 * formatting step; a queue with no matching agents omits `agent_status`
 * entirely, so it has to be defaulted here too.
 */
describe('QueuesAPI.getReportGeneral, response shaping', () => {
	beforeEach(() => {
		searchQueueReportGeneral.mockReset();
	});

	it('formats percentages, rounds durations, and defaults agentStatus/aggs', async () => {
		searchQueueReportGeneral.mockResolvedValue({
			data: {
				items: [
					{
						processed: 1,
						count: 1,
						sum_bill_sec: 60,
						avg_wrap_sec: 60,
						avg_asa_sec: 60,
						avg_awt_sec: 60,
					},
				],
				next: false,
			},
		});

		const response = await QueuesAPI.getReportGeneral({});

		expect(response).toEqual({
			aggs: {
				online: 0,
				offline: 0,
				free: 0,
				pause: 0,
				total: 0,
			},
			items: [
				{
					_isSelected: false,
					abandoned: 0,
					agentStatus: {
						free: 0,
						offline: 0,
						online: 0,
						pause: 0,
						total: 0,
					},
					avgAhtSec: 0,
					avgAsaSec: 60,
					avgAwtSec: 60,
					avgWrapSec: 60,
					bridged: 0,
					count: 1,
					members: {
						processing: 1,
						waiting: 0,
					},
					processed: 1,
					sumBillSec: 60,
					transferred: 0,
					sl20: 0,
					sl30: 0,
				},
			],
			next: false,
		});
	});
});
