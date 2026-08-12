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

	/** the panel holds one range value; the flat pair is still accepted */
	it('accepts either the range object or the flat bounds', async () => {
		await QueueLogsAPI.getList({
			parentId: '7',
			joinedAtFrom: 1,
			joinedAtTo: 2,
		});

		expect(paramsSent()).toMatchObject({
			'joined_at.from': 1,
			'joined_at.to': 2,
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
