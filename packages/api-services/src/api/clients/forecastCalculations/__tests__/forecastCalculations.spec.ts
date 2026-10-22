import { beforeEach, describe, expect, it, vi } from 'vitest';

const wireItem = {
	id: '1',
	name: 'Erlang C',
	description: 'desc',
	procedure: 'wfm.forecast_erlang',
	args: [
		'$__teamId()',
		'$__timeFrom()',
		'$my_arg',
	],
	domain_id: '1',
};

const service = {
	forecastCalculationServiceSearchForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					wireItem,
				],
				next: true,
			},
		}),
	),
	forecastCalculationServiceReadForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	forecastCalculationServiceCreateForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	forecastCalculationServiceUpdateForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				item: wireItem,
			},
		}),
	),
	forecastCalculationServiceExecuteForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					{
						timestamp: '1760000000000',
						agents: '5',
					},
				],
			},
		}),
	),
};

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getForecastCalculationService: () => service,
}));

const { ForecastCalculationsAPI } = await import('../forecastCalculations');

const formItem = {
	id: '1',
	name: 'Erlang C',
	description: 'desc',
	procedure: 'wfm.forecast_erlang',
	args: [
		'$__teamId()',
	],
	domainId: '1',
	createdAt: '1',
	_dirty: true,
};

describe('ForecastCalculationsAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('getList sends the search as `q`', async () => {
		const { items, next } = await ForecastCalculationsAPI.getList({
			search: 'erl',
			page: 2,
			size: 10,
		});

		expect(
			service.forecastCalculationServiceSearchForecastCalculation,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'erl*',
				page: 2,
				size: 10,
			}),
		);
		expect(items[0].procedure).toBe('wfm.forecast_erlang');
		expect(next).toBe(true);
	});

	it('get unwraps the `item` envelope and keeps the arguments as is', async () => {
		const item = await ForecastCalculationsAPI.get({
			itemId: '1',
		});
		expect(item.args).toEqual(wireItem.args);
	});

	it('add wraps the item and sends only the form fields', async () => {
		await ForecastCalculationsAPI.add({
			itemInstance: formItem,
		});

		const [body] =
			service.forecastCalculationServiceCreateForecastCalculation.mock.calls[0];
		expect(body).toEqual({
			item: {
				name: 'Erlang C',
				description: 'desc',
				procedure: 'wfm.forecast_erlang',
				args: [
					'$__teamId()',
				],
			},
		});
	});

	it('update sends the id separately and drops it from the item', async () => {
		await ForecastCalculationsAPI.update({
			itemId: '1',
			itemInstance: formItem,
		});

		const [id, body] =
			service.forecastCalculationServiceUpdateForecastCalculation.mock.calls[0];
		expect(id).toBe('1');
		expect(body.item).not.toHaveProperty('id');
		expect(body.item).not.toHaveProperty('domain_id');
		expect(body.item).not.toHaveProperty('_dirty');
	});

	it('execute sends the team and the period as query params', async () => {
		const { items } = await ForecastCalculationsAPI.execute({
			itemId: 1,
			teamId: 7,
			from: 1760000000000,
			to: 1760086399999,
		});

		expect(
			service.forecastCalculationServiceExecuteForecastCalculation,
		).toHaveBeenCalledWith('1', {
			team_id: '7',
			'forecast_data.from': '1760000000000',
			'forecast_data.to': '1760086399999',
		});
		expect(items).toEqual([
			{
				timestamp: '1760000000000',
				agents: '5',
			},
		]);
	});
});
