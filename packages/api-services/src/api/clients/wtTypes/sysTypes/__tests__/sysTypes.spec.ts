import { beforeEach, describe, expect, it, vi } from 'vitest';

const get = vi.fn();

vi.mock('../../../../defaults', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getDefaultInstance: () => ({
		get,
	}),
}));

const { SysTypesAPI } = await import('../sysTypes');

describe('SysTypesAPI.getLookup', () => {
	beforeEach(() => get.mockReset());

	it('queries the path with search, paging, preselected ids and schema filters', async () => {
		get.mockResolvedValue({
			data: {
				items: [],
			},
		});

		await SysTypesAPI.getLookup({
			path: '/dictionary/cities',
			display: 'name',
			primary: 'id',
			filters: [
				'country=ua',
			],
			search: 'kyi',
			id: [
				7,
			],
			page: 2,
		});

		const url = get.mock.calls[0][0] as string;
		expect(url.startsWith('/dictionary/cities?')).toBe(true);
		expect(url).toContain('q=kyi%2A');
		expect(url).toContain('page=2');
		expect(url).toContain('ids=7');
		expect(url).toContain('fields=id');
		expect(url.endsWith('&country=ua')).toBe(true);
	});

	it('maps records to options by primary and a display template', async () => {
		get.mockResolvedValue({
			data: {
				data: [
					{
						code: 7,
						name: 'Kyiv',
						region: {
							name: 'Kyiv oblast',
						},
					},
				],
				next: true,
			},
		});

		const response = await SysTypesAPI.getLookup({
			path: '/dictionary/cities',
			display: '{name} ({region.name}, {missing})',
			primary: 'code',
		});

		expect(response.next).toBe(true);
		expect(response.items[0]).toMatchObject({
			id: 7,
			name: 'Kyiv (Kyiv oblast, {missing})',
		});
	});

	it('reads a plain dot-path display from `items` responses', async () => {
		get.mockResolvedValue({
			data: {
				items: [
					{
						id: 'a',
						profile: {
							title: 'Alpha',
						},
					},
				],
			},
		});

		const response = await SysTypesAPI.getLookup({
			path: '/objects',
			display: 'profile.title',
			primary: 'id',
		});

		expect(response.items[0]).toMatchObject({
			id: 'a',
			name: 'Alpha',
		});
	});
});
