import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import { schemaVariableSchema } from '../schemaVariable.validations';

const issuePaths = (
	result: ReturnType<typeof schemaVariableSchema.safeParse>,
) => result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(schemaVariableSchema, {});

describe('schemaVariableSchema', () => {
	it('seeds a new variable as plain', () => {
		expect(defaults()).toMatchObject({
			name: '',
			value: '',
			encrypt: false,
		});
	});

	it('requires name and value of a new variable', () => {
		expect(issuePaths(schemaVariableSchema.safeParse(defaults()))).toEqual(
			expect.arrayContaining([
				'name',
				'value',
			]),
		);
	});

	it('requires the value of a new variable even when it is encrypted', () => {
		const result = schemaVariableSchema.safeParse({
			name: 'key',
			encrypt: true,
		});

		expect(issuePaths(result)).toEqual([
			'value',
		]);
	});

	it('keeps the value of a saved encrypted variable when it is left empty', () => {
		const result = schemaVariableSchema.safeParse({
			id: 1,
			name: 'key',
			encrypt: true,
		});

		expect(result.success).toBe(true);
	});
});
