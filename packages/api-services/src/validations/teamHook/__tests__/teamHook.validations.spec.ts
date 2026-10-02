import { describe, expect, it } from 'vitest';

import { teamHookSchema } from '../teamHook.validations';

const issuePaths = (value: Record<string, unknown>) =>
	teamHookSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('teamHookSchema', () => {
	it('requires an event and a flow schema', () => {
		const paths = issuePaths({
			event: '',
			schema: {},
		});

		expect(paths).toContain('event');
		expect(paths).toContain('schema');
	});

	it('accepts a filled hook', () => {
		expect(
			teamHookSchema.safeParse({
				event: 'agent_status',
				schema: {
					id: 1,
					name: 'Flow',
				},
			}).success,
		).toBe(true);
	});
});
