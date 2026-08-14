import { beforeEach, describe, expect, it, vi } from 'vitest';

const searchAttemptsHistory = vi.fn();

vi.mock('@webitel/api-services/gen', () => ({
	getMemberService: () => ({
		searchAttemptsHistory,
	}),
}));

const { QueueLogsAPI } = await import('../queueLogs');

const paramsSent = () => searchAttemptsHistory.mock.calls[0][0];

describe('QueueLogsAPI.getList', () => {
	beforeEach(() => {
		searchAttemptsHistory.mockReset().mockResolvedValue({
			data: {
				items: [],
				next: false,
			},
		});
	});

	/**
	 * The range filters are protobuf nested messages, so they only bind as
	 * `joined_at.from`. The generated params type calls them `joinedAtFrom`,
	 * which the backend would ignore — the request would succeed and quietly
	 * return unfiltered rows. That is how the duration filter was broken before
	 * this migration, so it is worth pinning.
	 *
	 * Verified live: `joined_at`, `leaving_at` and `offering_at` all filter with
	 * this shape. `duration` does not — the backend accepts and ignores it (see
	 * the note in `queueLogs.ts`), so this pins the wire format only, not that
	 * the duration filter actually works.
	 */
	it('sends range bounds as dotted keys', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
			joinedAt: {
				from: 100,
				to: 200,
			},
			duration: {
				from: 5,
				to: 30,
			},
		});

		expect(paramsSent()).toMatchObject({
			'joined_at.from': 100,
			'joined_at.to': 200,
			'duration.from': 5,
			'duration.to': 30,
		});
	});

	it('does not send the flattened names the generated type declares', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
			joinedAt: {
				from: 100,
				to: 200,
			},
		});

		expect(paramsSent()).not.toHaveProperty('joinedAtFrom');
		expect(paramsSent()).not.toHaveProperty('joinedAtTo');
	});

	it('maps the filter names onto the service params', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
			bucket: [
				1,
			],
			agent: [
				2,
			],
			leavingAt: {
				from: 10,
				to: 20,
			},
			offeringAt: {
				from: 30,
				to: 40,
			},
		});

		expect(paramsSent()).toMatchObject({
			bucketId: [
				1,
			],
			agentId: [
				2,
			],
			'leaving_at.from': 10,
			'leaving_at.to': 20,
			'offering_at.from': 30,
			'offering_at.to': 40,
		});
	});

	it('scopes the query to its queue and maps search onto q', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
			search: 'joe',
		});

		// `starToSearch` makes it a prefix search, as everywhere else
		expect(paramsSent()).toMatchObject({
			queueId: [
				'7',
			],
			q: 'joe*',
		});
	});

	it('sorts by join time unless told otherwise', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
		});
		expect(paramsSent().sort).toBe('+joined_at');

		searchAttemptsHistory.mockClear();
		await QueueLogsAPI.getList({
			parentId: '7',
			sort: '-duration',
		});
		expect(paramsSent().sort).toBe('-duration');
	});
});
