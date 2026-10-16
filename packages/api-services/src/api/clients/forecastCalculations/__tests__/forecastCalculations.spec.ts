import { beforeEach, describe, expect, it, vi } from 'vitest';

const service = {
	forecastCalculationServiceSearchForecastCalculation: vi.fn(() =>
		Promise.resolve({
			data: {
				items: [
					{
						id: '1',
						name: 'weekdays',
						domain_id: '1',
					},
				],
				next: true,
			},
		}),
	),
};

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getForecastCalculationService: () => service,
}));

const { ForecastCalculationsAPI } = await import('../forecastCalculations');

describe('ForecastCalculationsAPI', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('getList sends the search as `q`', async () => {
		const { items, next } = await ForecastCalculationsAPI.getList({
			search: 'week',
			page: 2,
			size: 10,
		});

		expect(
			service.forecastCalculationServiceSearchForecastCalculation,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				q: 'week*',
				page: 2,
				size: 10,
			}),
		);
		expect(items[0].domainId).toBe('1');
		expect(next).toBe(true);
	});

	it('getLookup requests only id and name', async () => {
		await ForecastCalculationsAPI.getLookup({});

		expect(
			service.forecastCalculationServiceSearchForecastCalculation,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				fields: [
					'id',
					'name',
				],
			}),
		);
	});
});
