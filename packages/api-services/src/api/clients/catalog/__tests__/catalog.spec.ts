import { beforeEach, describe, expect, it, vi } from 'vitest';

const catalogGetHistory = vi.fn(() =>
	Promise.resolve({
		data: {
			messages: [
				{
					id: 'm1',
					from: {
						id: 1,
					},
				},
			],
			peers: [
				{
					id: 'p1',
				},
			],
			next: true,
		},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getMessages: () => ({
		catalogGetHistory,
	}),
}));

const { CatalogAPI } = await import('../catalog');

/**
 * The endpoint pages with `limit` and an `offset.date` cursor. Dropping either
 * silently returns the newest page every time, and dropping `next` leaves the
 * caller unable to tell there is more (WTEL-10384).
 */
describe('CatalogAPI.getChatMessagesList', () => {
	beforeEach(() => catalogGetHistory.mockClear());

	it('forwards the paging cursor and limit to the endpoint', async () => {
		await CatalogAPI.getChatMessagesList({
			chatId: 'chat-1',
			offsetDate: '1700000000000',
			limit: 20,
		});

		expect(catalogGetHistory).toHaveBeenCalledWith('chat-1', {
			'offset.date': '1700000000000',
			limit: 20,
		});
	});

	it('omits the cursor when no offset is given', async () => {
		await CatalogAPI.getChatMessagesList({
			chatId: 'chat-1',
		});

		expect(catalogGetHistory).toHaveBeenCalledWith('chat-1', {
			'offset.date': undefined,
			limit: undefined,
		});
	});

	it('returns next alongside the merged messages', async () => {
		const response = await CatalogAPI.getChatMessagesList({
			chatId: 'chat-1',
		});

		expect(response.next).toBe(true);
		expect(response.items).toEqual([
			{
				id: 'm1',
				peer: {
					id: 'p1',
				},
			},
		]);
	});
});
