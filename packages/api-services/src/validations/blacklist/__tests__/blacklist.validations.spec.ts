import { describe, expect, it } from 'vitest';

import { blacklistSchema } from '../blacklist.validations';

const issuePaths = (value: Record<string, unknown>) =>
	blacklistSchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('blacklistSchema', () => {
	it('requires a name', () => {
		expect(
			issuePaths({
				name: '',
			}),
		).toContain('name');
	});

	it('accepts a filled blacklist', () => {
		expect(
			blacklistSchema.safeParse({
				name: 'Spam',
				description: 'Known spammers',
			}).success,
		).toBe(true);
	});
});
