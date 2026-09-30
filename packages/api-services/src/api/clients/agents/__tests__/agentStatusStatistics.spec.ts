import { describe, expect, it, vi } from 'vitest';

const searchAgentStatusStatistic = vi.fn(() =>
	Promise.resolve({
		data: {
			items: [
				{},
			],
		},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getAgentService: () => ({
		searchAgentStatusStatistic,
	}),
}));

const { AgentsAPI } = await import('../agents');

const expectItems = [
	{
		_isSelected: false,
		missed: 0,
		transferred: 0,
		statusDuration: '00:00:00',
		utilization: '0.00%',
		online: '00:00:00',
		offline: '00:00:00',
		pause: '00:00:00',
		callTime: '00:00:00',
		chatTime: '00:00:00',
		occupancy: '0.00%',
	},
];

describe('AgentsAPI.getStatusStatistics', () => {
	it('formats the raw response', async () => {
		const response = await AgentsAPI.getStatusStatistics({});

		expect(response.items).toEqual(expectItems);
		expect(response.next).toBe(false);
	});
});
