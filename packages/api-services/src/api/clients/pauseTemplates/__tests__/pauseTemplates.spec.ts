import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireItem = {
	id: '1',
	name: 'lunch',
	description: 'desc',
	causes: [
		{
			cause: {
				id: '7',
				name: 'Coffee',
			},
			duration: '15',
		},
	],
	domain_id: '1',
};

const service = {
	pauseTemplateServiceSearchPauseTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					wireItem,
				],
				next: true,
			},
		}),
	),
	pauseTemplateServiceReadPauseTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	pauseTemplateServiceCreatePauseTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	pauseTemplateServiceUpdatePauseTemplate: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
};

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getPauseTemplateService: () => service,
}));

const { PauseTemplatesAPI } = await import('../pauseTemplates');

const formItem = {
	id: '1',
	name: 'lunch',
	description: 'desc',
	causes: [
		{
			cause: {
				id: '7',
				name: 'Coffee',
			},
			duration: 15,
		},
		{
			duration: 30,
		},
	],
	domainId: '1',
	_dirty: true,
};

describe('PauseTemplatesAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('getList sends the search as `q`', async () => {
		const { items, next } = await PauseTemplatesAPI.getList({
			search: 'lun',
			page: 2,
			size: 10,
		});

		expect(
			service.pauseTemplateServiceSearchPauseTemplate,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'lun*',
				page: 2,
				size: 10,
			}),
		);
		expect(items[0].domainId).toBe('1');
		expect(next).toBe(true);
	});

	it('get unwraps the `item` envelope and keeps causes nested', async () => {
		const item = await PauseTemplatesAPI.get({
			itemId: '1',
		});

		expect(item.name).toBe('lunch');
		expect(item.causes).toEqual(wireItem.causes);
	});

	it('add wraps the item and sends only the form fields', async () => {
		await PauseTemplatesAPI.add({
			itemInstance: formItem,
		});

		const [body] =
			service.pauseTemplateServiceCreatePauseTemplate.mock.calls[0];
		expect(body).toEqual({
			item: {
				name: 'lunch',
				description: 'desc',
				causes: formItem.causes,
			},
		});
	});

	it('update sends the id separately and drops it from the item', async () => {
		await PauseTemplatesAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});

		const [id, body] =
			service.pauseTemplateServiceUpdatePauseTemplate.mock.calls[0];
		expect(id).toBe('1');
		expect(body.item).not.toHaveProperty('id');
		expect(body.item).not.toHaveProperty('domain_id');
		expect(body.item).not.toHaveProperty('_dirty');
		expect(body.item.causes).toEqual(formItem.causes);
	});
});
