import { describe, expect, it } from 'vitest';

import { teamAgentSchema } from '../teamAgent.validations';

describe('teamAgentSchema', () => {
	it('requires an agent', () => {
		expect(
			teamAgentSchema.safeParse({
				agent: {},
			}).success,
		).toBe(false);
	});

	it('accepts a picked agent', () => {
		expect(
			teamAgentSchema.safeParse({
				agent: {
					id: '1',
					name: 'John',
				},
			}).success,
		).toBe(true);
	});
});
