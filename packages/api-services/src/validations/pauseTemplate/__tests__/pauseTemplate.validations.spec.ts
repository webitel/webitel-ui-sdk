import { describe, expect, it } from 'vitest';

import { pauseTemplateSchema } from '../pauseTemplate.validations';

describe('pauseTemplateSchema', () => {
	it('fills a new template with one 30 min row and no cause', () => {
		expect(pauseTemplateSchema.parse({}).causes).toEqual([
			{
				duration: 30,
			},
		]);
	});

	it('accepts a row without a pause cause', () => {
		const result = pauseTemplateSchema.safeParse({
			name: 'lunch',
			causes: [
				{
					duration: 15,
				},
			],
		});
		expect(result.success).toBe(true);
	});

	it('rejects an empty name', () => {
		expect(
			pauseTemplateSchema.safeParse({
				name: '',
			}).success,
		).toBe(false);
	});

	it('rejects a name longer than 250 symbols', () => {
		expect(
			pauseTemplateSchema.safeParse({
				name: 'a'.repeat(251),
			}).success,
		).toBe(false);
	});

	it('rejects a template without rows', () => {
		expect(
			pauseTemplateSchema.safeParse({
				name: 'lunch',
				causes: [],
			}).success,
		).toBe(false);
	});

	it('accepts a duration the API returns as a string', () => {
		expect(
			pauseTemplateSchema.safeParse({
				name: 'lunch',
				causes: [
					{
						cause: null,
						duration: '15',
					},
				],
			}).success,
		).toBe(true);
	});

	it.each([
		0,
		'0',
		null,
	])('rejects a row duration of %j', (duration) => {
		expect(
			pauseTemplateSchema.safeParse({
				name: 'lunch',
				causes: [
					{
						cause: {
							id: '1',
							name: 'Coffee',
						},
						duration,
					},
				],
			}).success,
		).toBe(false);
	});
});
