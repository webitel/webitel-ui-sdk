import { describe, expect, it } from 'vitest';
import type { z } from 'zod';

import { caseExportOptionsSchema } from '../caseExportOptions.validations';

const issues = (result: z.ZodSafeParseResult<unknown>) =>
	result.success
		? []
		: result.error.issues.map((issue) => ({
				path: issue.path.join('.'),
				i18nKey: (
					issue as {
						params?: {
							i18nKey?: string;
						};
					}
				).params?.i18nKey,
			}));

describe('caseExportOptionsSchema', () => {
	it('accepts xlsx without a separator', () => {
		const result = caseExportOptionsSchema.safeParse({
			type: {
				name: 'xlsx',
				value: 'xlsx',
			},
			separator: null,
		});

		expect(issues(result)).toEqual([]);
	});

	it('accepts csv with a separator', () => {
		const result = caseExportOptionsSchema.safeParse({
			type: {
				name: 'csv',
				value: 'csv',
			},
			separator: ',',
		});

		expect(issues(result)).toEqual([]);
	});

	/**
	 * The popup binds `r$.$fields.type` to the select, so the issue has to be
	 * filed under `type` — a root-level issue disables the button but shows no
	 * "required" message under the field (WTEL-10340).
	 */
	it('reports a missing format under the `type` path', () => {
		const result = caseExportOptionsSchema.safeParse({
			type: null,
			separator: ',',
		});

		expect(issues(result)).toEqual([
			{
				path: 'type',
				i18nKey: 'required',
			},
		]);
	});

	it('reports a missing csv separator under the `separator` path', () => {
		const result = caseExportOptionsSchema.safeParse({
			type: {
				name: 'csv',
				value: 'csv',
			},
			separator: '',
		});

		expect(issues(result)).toEqual([
			{
				path: 'separator',
				i18nKey: 'required',
			},
		]);
	});
});
