import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireFlow = {
	id: '1',
	name: 'IVR',
	created_at: '10',
	schema: [
		{
			set_var: 'x',
		},
	],
	payload: {
		some_key: 1,
	},
};

const searchRoutingSchema = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{
					id: '1',
					name: 'IVR',
				},
			],
			next: false,
		},
	}),
);
const readRoutingSchema = vi.fn(() =>
	Promise.resolve({
		data: wireFlow,
	}),
);
const createRoutingSchema = vi.fn(() =>
	Promise.resolve({
		data: wireFlow,
	}),
);
const updateRoutingSchema = vi.fn(() =>
	Promise.resolve({
		data: wireFlow,
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getRoutingSchemaService: () => ({
		searchRoutingSchema,
		readRoutingSchema,
		createRoutingSchema,
		updateRoutingSchema,
	}),
}));

const { FlowsAPI } = await import('../flow');

const stringifiedSchema = JSON.stringify(wireFlow.schema, null, 4);

describe('FlowsAPI', () => {
	beforeEach(() => vi.clearAllMocks());

	it('getList maps the flowType filter to type, always with "default"', async () => {
		await FlowsAPI.getList({
			flowType: [
				'chat',
			],
		});

		expect(searchRoutingSchema).toHaveBeenCalledWith(
			expect.objectContaining({
				type: [
					'chat',
					'default',
				],
			}),
		);
	});

	it('getList fills type and editor defaults on items', async () => {
		const { items } = await FlowsAPI.getList({});

		expect(items[0]).toMatchObject({
			type: 'default',
			editor: false,
		});
	});

	it('get stringifies schema and keeps payload keys as they are', async () => {
		const flow = await FlowsAPI.get({
			itemId: '1',
		});

		expect(flow).toMatchObject({
			createdAt: '10',
			schema: stringifiedSchema,
			payload: {
				some_key: 1,
			},
			tags: [],
			editor: false,
		});
	});

	it('add sends parsed schema, untouched payload, and only body fields', async () => {
		const flow = await FlowsAPI.add({
			itemInstance: {
				id: '1',
				name: 'IVR',
				schema: '[{"set_var":"x"}]',
				payload: {
					someKey: 1,
				},
				createdAt: '10',
			},
		});

		expect(createRoutingSchema).toHaveBeenCalledWith({
			name: 'IVR',
			schema: [
				{
					set_var: 'x',
				},
			],
			payload: {
				someKey: 1,
			},
		});
		expect(flow.schema).toBe(stringifiedSchema);
	});

	it('update sends the same body shape to the item id', async () => {
		await FlowsAPI.update({
			itemId: '1',
			itemInstance: {
				name: 'IVR',
				schema: '[]',
				editor: true,
			},
		});

		expect(updateRoutingSchema).toHaveBeenCalledWith('1', {
			name: 'IVR',
			schema: [],
			editor: true,
		});
	});
});
