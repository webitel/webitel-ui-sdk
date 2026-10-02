import { describe, expect, it } from 'vitest';

import { agentSubordinateSchema } from '../agentSubordinate.validations';

describe('agentSubordinateSchema', () => {
	it('requires an agent', () => {
		expect(
			agentSubordinateSchema.safeParse({
				agent: {},
			}).success,
		).toBe(false);
	});

	it('accepts a picked agent', () => {
		expect(
			agentSubordinateSchema.safeParse({
				agent: {
					id: '1',
					name: 'John',
				},
			}).success,
		).toBe(true);
	});
});
