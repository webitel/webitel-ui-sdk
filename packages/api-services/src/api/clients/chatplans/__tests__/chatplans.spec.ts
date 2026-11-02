import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireChatplan = {
	id: 1,
	name: 'Chat',
	enabled: true,
	schema: {
		id: '2',
		name: 'Bot',
	},
};

const searchChatPlan = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{
					id: 1,
				},
			],
			next: false,
		},
	}),
);
const createChatPlan = vi.fn(() =>
	Promise.resolve({
		data: wireChatplan,
	}),
);
const updateChatPlan = vi.fn(() =>
	Promise.resolve({
		data: wireChatplan,
	}),
);
const patchChatPlan = vi.fn(() =>
	Promise.resolve({
		data: wireChatplan,
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getRoutingChatPlanService: () => ({
		searchChatPlan,
		createChatPlan,
		updateChatPlan,
		patchChatPlan,
	}),
}));

const { ChatplansAPI } = await import('../chatplans');

const card = {
	id: 1,
	name: 'Chat',
	description: '',
	enabled: true,
	createdAt: '5',
	schema: {
		id: '2',
		name: 'Bot',
	},
};

describe('ChatplansAPI', () => {
	beforeEach(() => vi.clearAllMocks());

	it('getList sends search as q', async () => {
		await ChatplansAPI.getList({
			search: 'cha',
		});

		expect(searchChatPlan).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'cha*',
			}),
		);
	});

	it('getList defaults enabled to false', async () => {
		const { items } = await ChatplansAPI.getList({});
		expect(items[0]).toMatchObject({
			enabled: false,
		});
	});

	it('add sends only body fields', async () => {
		await ChatplansAPI.add({
			itemInstance: card,
		});

		expect(createChatPlan).toHaveBeenCalledWith({
			name: 'Chat',
			description: '',
			enabled: true,
			schema: {
				id: '2',
				name: 'Bot',
			},
		});
	});

	it('update sends the body to the numeric id', async () => {
		await ChatplansAPI.update({
			itemId: '1',
			itemInstance: card,
		});

		expect(updateChatPlan).toHaveBeenCalledWith(
			1,
			expect.not.objectContaining({
				created_at: expect.anything(),
			}),
		);
	});

	it('patch sends just the changed field', async () => {
		await ChatplansAPI.patch({
			id: '1',
			changes: {
				enabled: false,
			},
		});

		expect(patchChatPlan).toHaveBeenCalledWith(1, {
			enabled: false,
		});
	});
});
