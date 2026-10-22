import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { changelogSchema } from '../changelog.validations';

const issuePaths = (result: ReturnType<typeof changelogSchema.safeParse>) =>
	result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(changelogSchema, {});

describe('changelogSchema', () => {
	it('seeds a new changelog as a disabled weekly one kept for a week', () => {
		expect(defaults()).toMatchObject({
			daysToStore: 7,
			period: 7,
			enabled: false,
			description: '',
		});
	});

	it('requires the object', () => {
		expect(issuePaths(changelogSchema.safeParse(defaults()))).toEqual([
			'object.id',
		]);
	});

	it('keeps the logs for a day at least', () => {
		const result = changelogSchema.safeParse({
			...(defaults() as object),
			object: {
				id: 1,
				name: 'schema',
			},
			daysToStore: 0,
		});

		expect(issuePaths(result)).toEqual([
			'daysToStore',
		]);
	});
});
