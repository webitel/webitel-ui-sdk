import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { resourceDisplaySchema } from '../resourceDisplay.validations';

const issuePaths = (value: Record<string, unknown>) =>
	resourceDisplaySchema
		.safeParse(value)
		.error?.issues.map((issue) => issue.path.join('.')) ?? [];

describe('resourceDisplaySchema', () => {
	it('seeds a new number with an empty display', () => {
		expect(getDefaultsFromZodSchema(resourceDisplaySchema, {})).toMatchObject({
			display: '',
		});
	});

	it('requires a number', () => {
		expect(
			issuePaths({
				display: '',
			}),
		).toEqual([
			'display',
		]);
	});

	it('rejects symbols a number cannot dial', () => {
		expect(
			issuePaths({
				display: '380 44 123',
			}),
		).toEqual([
			'display',
		]);
	});

	it('accepts a dialable number', () => {
		expect(
			resourceDisplaySchema.safeParse({
				display: '+380441234567',
			}).success,
		).toBe(true);
	});
});
