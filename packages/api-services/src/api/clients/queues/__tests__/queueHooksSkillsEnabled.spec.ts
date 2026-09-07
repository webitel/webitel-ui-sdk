import { beforeEach, describe, expect, it, vi } from 'vitest';

const readQueueHook = vi.fn();
const readQueueSkill = vi.fn();

vi.mock('../../../../gen-wire', () => ({
	getQueueHookService: () => ({
		readQueueHook,
	}),
	getQueueSkillService: () => ({
		readQueueSkill,
	}),
}));

const { QueueHooksAPI } = await import('../queueHooks');
const { QueueSkillsAPI } = await import('../queueSkills');

/**
 * Protobuf omits `enabled` when it is false, so a disabled record reads back
 * without the field. The card store seeds anything missing from the schema,
 * where `enabled` defaults to `true` for newly added records — so `get` has to
 * spell the false out, or an untouched save would re-enable the record.
 */
describe('reading a disabled queue hook / skill', () => {
	beforeEach(() => {
		readQueueHook.mockReset();
		readQueueSkill.mockReset();
	});

	it('spells out enabled: false for a hook that omits it', async () => {
		readQueueHook.mockResolvedValue({
			data: {
				id: 40,
				event: 'bridged',
			},
		});

		await expect(
			QueueHooksAPI.get({
				parentId: '208',
				itemId: '40',
			}),
		).resolves.toMatchObject({
			enabled: false,
		});
	});

	it('spells out enabled: false for a skill that omits it', async () => {
		readQueueSkill.mockResolvedValue({
			data: {
				id: 7,
				lvl: 10,
			},
		});

		await expect(
			QueueSkillsAPI.get({
				parentId: '208',
				itemId: '7',
			}),
		).resolves.toMatchObject({
			enabled: false,
		});
	});

	it('keeps enabled: true as sent', async () => {
		readQueueHook.mockResolvedValue({
			data: {
				id: 41,
				event: 'missed',
				enabled: true,
			},
		});

		await expect(
			QueueHooksAPI.get({
				parentId: '208',
				itemId: '41',
			}),
		).resolves.toMatchObject({
			enabled: true,
		});
	});
});
