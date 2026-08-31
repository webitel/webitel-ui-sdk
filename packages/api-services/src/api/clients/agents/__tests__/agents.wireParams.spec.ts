import { beforeEach, describe, expect, it, vi } from 'vitest';

const searchAgent = vi.fn(() =>
	Promise.resolve({
		data: {},
	}),
);

vi.mock('../../../../gen-wire', async (importOriginal) => ({
	...(await importOriginal<Record<string, unknown>>()),
	getAgentService: () => ({
		searchAgent,
	}),
}));

const { SearchAgentQueryParams } = await import('../../../../gen-wire');
const { AgentsAPI } = await import('../agents');

/**
 * Callers spell these filters after the entity, the endpoint after the column.
 * Left unmapped they were sanitized away, so the filters silently did nothing.
 */
describe('AgentsAPI.getList', () => {
	beforeEach(() => searchAgent.mockClear());

	it('maps team and skill onto team_id and skill_id', async () => {
		await AgentsAPI.getList({
			page: 1,
			size: 10,
			team: [
				1,
			],
			skill: [
				2,
			],
		});

		const [params] = searchAgent.mock.calls[0];
		expect(params).toMatchObject({
			team_id: [
				1,
			],
			skill_id: [
				2,
			],
		});
		expect(SearchAgentQueryParams.strict().safeParse(params).success).toBe(
			true,
		);
	});
});
