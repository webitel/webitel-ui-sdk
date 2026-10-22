import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { skillSchema } from '../skill.validations';

describe('skillSchema', () => {
	it('seeds a new skill with the defaults the form expects', () => {
		expect(getDefaultsFromZodSchema(skillSchema, {})).toMatchObject({
			name: '',
			description: '',
		});
	});

	it('requires a name', () => {
		const paths =
			skillSchema
				.safeParse({
					name: '',
				})
				.error?.issues.map((issue) => issue.path.join('.')) ?? [];

		expect(paths).toContain('name');
	});

	it('accepts a skill without a description', () => {
		expect(
			skillSchema.safeParse({
				name: 'English',
			}).success,
		).toBe(true);
	});
});
