import { beforeEach, describe, expect, it, vi } from 'vitest';

const get = vi.fn();
const patch = vi.fn();
const getList = vi.fn();

vi.mock('../agents', () => ({
	AgentsAPI: {
		get: (...args: unknown[]) => get(...args),
		patch: (...args: unknown[]) => patch(...args),
		getList: (...args: unknown[]) => getList(...args),
	},
}));

const { AgentSubordinatesAPI } = await import('../agentSubordinates');

const lastPatch = () => patch.mock.calls.at(-1)?.[0];

describe('AgentSubordinatesAPI', () => {
	beforeEach(() => {
		get.mockReset();
		patch.mockReset();
		getList.mockReset();
		patch.mockResolvedValue({
			id: '7',
		});
	});

	it('lists the agents supervised by the parent', async () => {
		await AgentSubordinatesAPI.getList({
			parentId: '1',
			page: 2,
		});

		expect(getList).toHaveBeenCalledWith({
			page: 2,
			supervisorId: [
				1,
			],
		});
	});

	it('adds the parent to the fetched supervisors without duplicates', async () => {
		get.mockResolvedValue({
			supervisor: [
				{
					id: 3,
				},
				{
					id: '1',
				},
			],
		});

		await AgentSubordinatesAPI.add({
			parentId: '1',
			itemInstance: {
				agent: {
					id: '7',
				},
			},
		});

		expect(get).toHaveBeenCalledWith({
			itemId: '7',
		});
		expect(lastPatch()).toEqual({
			id: '7',
			changes: {
				supervisor: [
					{
						id: '3',
					},
					{
						id: '1',
					},
				],
			},
		});
	});

	it('adds the parent to an agent with no supervisors', async () => {
		get.mockResolvedValue({});

		await AgentSubordinatesAPI.add({
			parentId: 1,
			itemInstance: {
				agent: {
					id: '7',
				},
			},
		});

		expect(lastPatch().changes.supervisor).toEqual([
			{
				id: '1',
			},
		]);
	});

	it('removes only the parent from the supervisors on delete', async () => {
		get.mockResolvedValue({
			supervisor: [
				{
					id: 1,
				},
				{
					id: 3,
				},
			],
		});

		await AgentSubordinatesAPI.delete({
			parentId: '1',
			id: '7',
		});

		expect(lastPatch()).toEqual({
			id: '7',
			changes: {
				supervisor: [
					{
						id: 3,
					},
				],
			},
		});
	});

	it('moves the parent from the old agent to the new one on update', async () => {
		get.mockResolvedValue({
			supervisor: [
				{
					id: '1',
				},
			],
		});

		await AgentSubordinatesAPI.update({
			parentId: '1',
			itemId: '5',
			itemInstance: {
				agent: {
					id: '7',
				},
			},
		});

		expect(patch.mock.calls.map(([params]) => params.id)).toEqual([
			'7',
			'5',
		]);
	});

	it('does not remove the parent when the agent is unchanged', async () => {
		get.mockResolvedValue({
			supervisor: [
				{
					id: '1',
				},
			],
		});

		await AgentSubordinatesAPI.update({
			parentId: '1',
			itemId: '7',
			itemInstance: {
				agent: {
					id: '7',
				},
			},
		});

		expect(patch).toHaveBeenCalledTimes(1);
	});
});
