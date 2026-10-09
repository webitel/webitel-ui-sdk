import { describe, expect, it } from 'vitest';

import { teamFlowSchema } from '../teamFlow.validations';

const issuePaths = (value: Record<string, unknown>) =>
	teamFlowSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('teamFlowSchema', () => {
	it('requires a name and a flow schema', () => {
		const paths = issuePaths({
			name: '',
			schema: {},
		});

		expect(paths).toContain('name');
		expect(paths).toContain('schema.id');
	});

	it('accepts a filled flow', () => {
		expect(
			teamFlowSchema.safeParse({
				name: 'Service',
				schema: {
					id: 1,
					name: 'Flow',
				},
			}).success,
		).toBe(true);
	});
});
