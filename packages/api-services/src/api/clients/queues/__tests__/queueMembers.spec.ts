import { beforeEach, describe, expect, it, vi } from 'vitest';

const searchMemberInQueue = vi.fn();
const resetMembersCount = vi.fn();
const resetMembers = vi.fn();
const searchMemberCommunication = vi.fn();

vi.mock('../../../../gen-wire', () => ({
	getMemberService: () => ({
		searchMemberInQueue,
		resetMembersCount,
		resetMembers,
		searchMemberCommunication,
	}),
}));

const { QueueMembersAPI } = await import('../queueMembers');

describe('QueueMembersAPI.getList', () => {
	beforeEach(() => {
		searchMemberInQueue.mockReset().mockResolvedValue({
			data: {
				items: [],
				next: false,
			},
		});
	});

	const paramsSent = () => searchMemberInQueue.mock.calls[0][1];

	/**
	 * `created_at` and `priority` are protobuf nested messages, so they only
	 * bind as dotted keys. The generated params type calls them `createdAtFrom`
	 * and `priorityFrom`, which the backend ignores — the request succeeds and
	 * returns unfiltered rows.
	 */
	it('sends range bounds as dotted keys', async () => {
		await QueueMembersAPI.getList({
			parentId: '7',
			createdAt: {
				from: 100,
				to: 200,
			},
			memberPriority: {
				from: 1,
				to: 9,
			},
		});

		expect(paramsSent()).toMatchObject({
			'created_at.from': 100,
			'created_at.to': 200,
			'priority.from': 1,
			'priority.to': 9,
		});
		expect(paramsSent()).not.toHaveProperty('createdAtFrom');
		expect(paramsSent()).not.toHaveProperty('priorityFrom');
	});

	it('passes the queue id positionally, as a number', async () => {
		await QueueMembersAPI.getList({
			parentId: '7',
		});

		expect(searchMemberInQueue.mock.calls[0][0]).toBe(7);
	});

	/** the datalist names differ from the service's, so the mapping is explicit */
	it('maps the filter names onto the service params', async () => {
		await QueueMembersAPI.getList({
			parentId: '7',
			search: 'joe',
			bucket: [
				1,
			],
			agent: [
				2,
			],
			stopCause: [
				'cancel',
			],
			offeringAt: {
				from: 300,
				to: 400,
			},
			attempts: {
				from: 2,
				to: 5,
			},
			name: 'alice',
			destination: '380',
		});

		expect(paramsSent()).toMatchObject({
			q: 'joe*',
			bucket_id: [
				1,
			],
			agent_id: [
				2,
			],
			stop_cause: [
				'cancel',
			],
			'offering_at.from': 300,
			'offering_at.to': 400,
			'attempts.from': 2,
			'attempts.to': 5,
			name: 'alice',
			destination: '380',
		});
	});

	/** the pre-migration spellings still work, so both can coexist */
	it('still accepts the legacy filter names', async () => {
		await QueueMembersAPI.getList({
			parentId: '7',
			from: 100,
			to: 200,
			cause: [
				'cancel',
			],
		});

		expect(paramsSent()).toMatchObject({
			'created_at.from': 100,
			'created_at.to': 200,
			stop_cause: [
				'cancel',
			],
		});
	});
});

describe('QueueMembersAPI.getQuantity', () => {
	beforeEach(() => {
		resetMembersCount.mockReset().mockResolvedValue({
			data: {
				count: 12,
			},
		});
	});

	/** was a hand-built url; the generated call must keep the dotted keys */
	it('counts through the service with dotted range keys', async () => {
		const count = await QueueMembersAPI.getQuantity({
			parentId: '7',
			filters: {
				createdAt: {
					from: 100,
					to: 200,
				},
			},
		});

		expect(count).toBe(12);
		expect(resetMembersCount).toHaveBeenCalledWith(
			'7',
			expect.objectContaining({
				'created_at.from': 100,
				'created_at.to': 200,
			}),
		);
	});

	it('reports zero when the service returns no count', async () => {
		resetMembersCount.mockResolvedValue({
			data: {},
		});

		await expect(
			QueueMembersAPI.getQuantity({
				parentId: '7',
			}),
		).resolves.toBe(0);
	});
});

describe('QueueMembersAPI.getCommunications', () => {
	beforeEach(() => {
		searchMemberCommunication.mockReset().mockResolvedValue({
			data: {
				items: [
					{
						id: '1',
						destination: '380',
					},
				],
				next: true,
			},
		});
	});

	it('requests one member of one queue with the sort and page', async () => {
		await QueueMembersAPI.getCommunications({
			parentId: 7,
			memberId: 42,
			page: 2,
			size: 20,
			sort: '-priority',
		});

		expect(searchMemberCommunication).toHaveBeenCalledWith('7', '42', {
			page: 2,
			size: 20,
			sort: '-priority',
			fields: undefined,
		});
	});

	it('returns the items with the next flag', async () => {
		const { items, next } = await QueueMembersAPI.getCommunications({
			parentId: 7,
			memberId: 42,
		});

		expect(items).toEqual([
			{
				id: '1',
				destination: '380',
			},
		]);
		expect(next).toBe(true);
	});

	/** an empty list comes back as `{}` */
	it('defaults to an empty last page', async () => {
		searchMemberCommunication.mockResolvedValue({
			data: {},
		});

		await expect(
			QueueMembersAPI.getCommunications({
				parentId: 7,
				memberId: 42,
			}),
		).resolves.toEqual({
			items: [],
			next: false,
		});
	});
});
