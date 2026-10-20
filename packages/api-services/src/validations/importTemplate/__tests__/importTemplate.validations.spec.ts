import { StorageImportSourceType } from '@webitel/api-services/gen/models';
import { getDefaultsFromZodSchema } from '@webitel/api-services/gen/utils';
import { describe, expect, it } from 'vitest';

import {
	type ImportTemplateCard,
	importTemplateSchema,
} from '../importTemplate.validations';

const issuePaths = (
	result: ReturnType<typeof importTemplateSchema.safeParse>,
) => result.error?.issues.map(({ path }) => path.join('.')) ?? [];

const defaults = () => getDefaultsFromZodSchema(importTemplateSchema, {});

describe('importTemplateSchema', () => {
	it('seeds a new template as a utf-8, comma-separated dialer import', () => {
		expect(defaults()).toMatchObject({
			name: '',
			sourceType: StorageImportSourceType.Dialer,
			parameters: {
				charset: {
					value: 'utf-8',
				},
				separator: ',',
				skipHeaders: true,
				clearMembers: false,
				mappings: {
					name: '',
					destination: [],
					code: [],
					variables: [],
				},
			},
		});
	});

	it('requires name, source, separator and the name, destination and code columns', () => {
		const template = defaults() as ImportTemplateCard;
		template.parameters.separator = '';

		expect(issuePaths(importTemplateSchema.safeParse(template))).toEqual(
			expect.arrayContaining([
				'name',
				'source.id',
				'parameters.separator',
				'parameters.mappings.name',
				'parameters.mappings.destination',
				'parameters.mappings.code',
			]),
		);
	});

	it('accepts a filled template', () => {
		const result = importTemplateSchema.safeParse({
			...(defaults() as object),
			name: 'import',
			source: {
				id: 1,
				name: 'queue',
			},
			parameters: {
				mappings: {
					name: 'Name',
					destination: [
						'Phone',
					],
					code: [
						'Type',
					],
				},
			},
		});

		expect(result.success).toBe(true);
	});
});
