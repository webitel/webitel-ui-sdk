import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireItem = {
	id: '1',
	name: 'Day',
	description: 'desc',
	times: [
		{
			start: 540,
			end: 1200,
		},
	],
	domain_id: '1',
	created_at: '1',
};

const service = {
	shiftTemplateServiceSearchShiftTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					wireItem,
				],
				next: true,
			},
		}),
	),
	shiftTemplateServiceReadShiftTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	shiftTemplateServiceCreateShiftTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	shiftTemplateServiceUpdateShiftTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
};

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getShiftTemplateService: () => service,
}));

const { ShiftTemplatesAPI } = await import('../shiftTemplates');

const formItem = {
	id: '1',
	name: 'Day',
	description: 'desc',
	times: [
		{
			start: 540,
			end: 1200,
		},
	],
	domainId: '1',
	createdAt: '1',
	_dirty: true,
};

describe('ShiftTemplatesAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('getList sends the search as `q`', async () => {
		const { items, next } = await ShiftTemplatesAPI.getList({
			search: 'day',
			page: 2,
			size: 10,
		});

		expect(
			service.shiftTemplateServiceSearchShiftTemplate,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'day*',
				page: 2,
				size: 10,
			}),
		);
		expect(items[0].name).toBe('Day');
		expect(next).toBe(true);
	});

	it('get and update unwrap the `item` envelope', async () => {
		const item = await ShiftTemplatesAPI.get({
			itemId: '1',
		});
		expect(item.times).toEqual(wireItem.times);

		const updated = await ShiftTemplatesAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});
		expect(updated.name).toBe('Day');
	});

	it('add wraps the item and sends only the form fields', async () => {
		await ShiftTemplatesAPI.add({
			itemInstance: formItem,
		});

		const [body] =
			service.shiftTemplateServiceCreateShiftTemplate.mock.calls[0];
		expect(body).toEqual({
			item: {
				name: 'Day',
				description: 'desc',
				times: [
					{
						start: 540,
						end: 1200,
					},
				],
			},
		});
	});

	it('update sends the id separately and drops it from the item', async () => {
		await ShiftTemplatesAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});

		const [id, body] =
			service.shiftTemplateServiceUpdateShiftTemplate.mock.calls[0];
		expect(id).toBe('1');
		expect(body.item).not.toHaveProperty('id');
		expect(body.item).not.toHaveProperty('domain_id');
		expect(body.item).not.toHaveProperty('_dirty');
	});
});
