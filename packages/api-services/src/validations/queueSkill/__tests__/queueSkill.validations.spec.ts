import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { queueSkillSchema } from '../queueSkill.validations';

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
});
