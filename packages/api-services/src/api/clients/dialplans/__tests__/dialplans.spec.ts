import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireDialplan = {
	id: '1',
	name: 'Outbound',
	pattern: '^1$',
	allow_transfer: true,
	domain_id: '10',
	schema: {
		id: '2',
		name: 'IVR',
	},
};

const searchRoutingOutboundCall = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{
					id: '1',
				},
			],
			next: false,
		},
	}),
);
const createRoutingOutboundCall = vi.fn(() =>
	Promise.resolve({
		data: wireDialplan,
	}),
);
const updateRoutingOutboundCall = vi.fn(() =>
	Promise.resolve({
		data: wireDialplan,
	}),
);
const patchRoutingOutboundCall = vi.fn(() =>
	Promise.resolve({
		data: wireDialplan,
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getRoutingOutboundCallService: () => ({
		searchRoutingOutboundCall,
		createRoutingOutboundCall,
		updateRoutingOutboundCall,
		patchRoutingOutboundCall,
	}),
}));

const { DialplansAPI } = await import('../dialplans');

const card = {
	id: '1',
	name: 'Outbound',
	pattern: '^1$',
	allowTransfer: true,
	description: '',
	domainId: '10',
	createdAt: '5',
	schema: {
		id: '2',
		name: 'IVR',
	},
};

describe('DialplansAPI', () => {
	beforeEach(() => vi.clearAllMocks());

	it('getList sends search as q and allowTransfer as allow_transfer', async () => {
		await DialplansAPI.getList({
			search: 'out',
			allowTransfer: true,
		});

		expect(searchRoutingOutboundCall).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'out*',
				allow_transfer: true,
			}),
		);
	});

	it('getList defaults disabled to false', async () => {
		const { items } = await DialplansAPI.getList({});
		expect(items[0]).toMatchObject({
			disabled: false,
		});
	});

	it('add sends only body fields, never domain_id', async () => {
		await DialplansAPI.add({
			itemInstance: card,
		});

		expect(createRoutingOutboundCall).toHaveBeenCalledWith({
			name: 'Outbound',
			pattern: '^1$',
			allow_transfer: true,
			description: '',
			schema: {
				id: '2',
				name: 'IVR',
			},
		});
	});

	it('update sends the same body to the item id', async () => {
		const response = await DialplansAPI.update({
			itemId: '1',
			itemInstance: card,
		});

		expect(updateRoutingOutboundCall).toHaveBeenCalledWith(
			'1',
			expect.not.objectContaining({
				domain_id: expect.anything(),
			}),
		);
		expect(response).toMatchObject({
			allowTransfer: true,
		});
	});

	it('patch sends just the changed field', async () => {
		await DialplansAPI.patch({
			id: '1',
			changes: {
				disabled: true,
			},
		});

		expect(patchRoutingOutboundCall).toHaveBeenCalledWith('1', {
			disabled: true,
		});
	});
});
