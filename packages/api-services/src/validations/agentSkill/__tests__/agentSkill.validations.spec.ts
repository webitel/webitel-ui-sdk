import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { agentSkillSchema } from '../agentSkill.validations';

const filledSkill = {
	id: '1',
	name: 'English',
};

describe('agentSkillSchema', () => {
	it('seeds a new skill with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(agentSkillSchema, {})).toMatchObject({
			capacity: 10,
			enabled: true,
		});
	});

	it('keeps values already on the draft', () => {
		expect(
			getDefaultsFromZodSchema(agentSkillSchema, {
				skill: filledSkill,
				capacity: 42,
				enabled: false,
			}),
		).toMatchObject({
			skill: filledSkill,
			capacity: 42,
			enabled: false,
		});
	});

	it('requires a skill', () => {
		const result = agentSkillSchema.safeParse({
			capacity: 10,
		});

		expect(result.success).toBe(false);
		expect(result.error?.issues.map((issue) => issue.path.join('.'))).toContain(
			'skill',
		);
	});

	it('rejects capacity outside 0-100', () => {
		const tooHigh = agentSkillSchema.safeParse({
			skill: filledSkill,
			capacity: 101,
		});
		const tooLow = agentSkillSchema.safeParse({
			skill: filledSkill,
			capacity: -1,
		});

		expect(tooHigh.success).toBe(false);
		expect(tooLow.success).toBe(false);
	});

	it('accepts a valid skill', () => {
		expect(
			agentSkillSchema.safeParse({
				skill: filledSkill,
				capacity: 50,
				enabled: true,
			}).success,
		).toBe(true);
	});
});
