import { beforeEach, describe, expect, it, vi } from 'vitest';

const searchQueueSkill = vi.fn();
const readQueueSkill = vi.fn();

vi.mock('../../../../gen-wire', () => ({
	getQueueSkillService: () => ({
		searchQueueSkill,
		readQueueSkill,
	}),
}));

const { QueueSkillsAPI } = await import('../queueSkills');

/** live payload for a level-0 skill: `{id, skill, min_capacity: 0, max_capacity: 10}` */
describe('QueueSkillsAPI reads a level-0 skill as level 0', () => {
	beforeEach(() => {
		searchQueueSkill.mockReset();
		readQueueSkill.mockReset();
	});

	it('fills lvl in on get', async () => {
		readQueueSkill.mockResolvedValue({
			data: {
				id: 339,
				skill: {
					id: '45',
					name: 'Liza-test',
				},
				min_capacity: 0,
				max_capacity: 10,
			},
		});

		expect(
			await QueueSkillsAPI.get({
				parentId: '208',
				itemId: '339',
			}),
		).toMatchObject({
			id: 339,
			lvl: 0,
			minCapacity: 0,
			maxCapacity: 10,
		});
	});

	it('fills lvl in on every list row, without touching the rows that have one', async () => {
		searchQueueSkill.mockResolvedValue({
			data: {
				items: [
					{
						id: 339,
						max_capacity: 10,
					},
					{
						id: 412,
						lvl: 10,
						max_capacity: 10,
					},
				],
				next: false,
			},
		});

		const { items } = await QueueSkillsAPI.getList({
			parentId: '208',
		});

		expect(items.map((item: { lvl: number }) => item.lvl)).toEqual([
			0,
			10,
		]);
	});
});
