import { describe, expect, it } from 'vitest';

import { regionSchema } from '../region.validations';

const issuePaths = (value: Record<string, unknown>) =>
	regionSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('regionSchema', () => {
	it('requires a name and a timezone', () => {
		const paths = issuePaths({
			name: '',
			timezone: {},
		});

		expect(paths).toContain('name');
		expect(paths).toContain('timezone.id');
	});

	it('accepts a filled region', () => {
		expect(
			regionSchema.safeParse({
				name: 'Kyiv',
				timezone: {
					id: 1,
					name: 'Europe/Kyiv',
				},
			}).success,
		).toBe(true);
	});
});
