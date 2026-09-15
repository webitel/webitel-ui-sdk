import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { queueSkillSchema } from '../queueSkill.validations';

const filledSkill = {
	id: '1',
	name: 'English',
};

describe('queueSkillSchema', () => {
	/** see the hook schema spec — same pre-migration default */
	it('defaults a new skill to enabled', () => {
		expect(getDefaultsFromZodSchema(queueSkillSchema, {})).toMatchObject({
			enabled: true,
		});
	});

	it('keeps a disabled skill disabled', () => {
		const result = queueSkillSchema.safeParse({
			skill: {
				id: '1',
				name: 'skill',
			},
			lvl: 1,
			enabled: false,
		});

		expect(result.success).toBe(true);
		expect(result.data?.enabled).toBe(false);
	});

	/** `skill` stays empty, and its error must not swallow the other defaults */
	it('seeds a new skill with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(queueSkillSchema, {})).toMatchObject({
			lvl: 0,
			minCapacity: 0,
			maxCapacity: 10,
			buckets: [],
		});
	});

	it('keeps values already on the draft', () => {
		expect(
			getDefaultsFromZodSchema(queueSkillSchema, {
				skill: filledSkill,
				lvl: 5,
				minCapacity: 2,
				maxCapacity: 8,
			}),
		).toMatchObject({
			skill: filledSkill,
			lvl: 5,
			minCapacity: 2,
			maxCapacity: 8,
			buckets: [],
		});
	});

	it('requires a skill', () => {
		const result = queueSkillSchema.safeParse({
			lvl: 0,
			minCapacity: 0,
			maxCapacity: 10,
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues.map((issue) => issue.path.join('.'))).toContain(
			'skill',
		);
	});

	it('reports both sides when minCapacity exceeds maxCapacity', () => {
		const result = queueSkillSchema.safeParse({
			skill: filledSkill,
			lvl: 0,
			minCapacity: 10,
			maxCapacity: 5,
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues.map((issue) => issue.path.join('.'))).toEqual([
			'minCapacity',
			'maxCapacity',
		]);
	});

	it('accepts the defaults as a valid pair', () => {
		expect(
			queueSkillSchema.safeParse({
				skill: filledSkill,
				lvl: 0,
				minCapacity: 0,
				maxCapacity: 10,
			}).success,
		).toBe(true);
	});
});
