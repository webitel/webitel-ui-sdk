import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { filledLookupSchema } from '../../_shared/lookup.validations';
import { caseCloseFieldsChecks, caseSchema } from '../case.validations';

const schema = caseSchema
	.extend({
		source: filledLookupSchema,
		service: filledLookupSchema,
	})
	.check(...caseCloseFieldsChecks);

const issuePaths = (value: unknown) =>
	schema.safeParse(value).error?.issues.map(({ path }) => path.join('.')) ?? [];

describe('caseCloseFieldsChecks', () => {
	const finalStatusCondition = {
		id: '6',
		name: 'Closed',
		final: true,
	};

	it('requires close fields on a final case while other fields are still unset', () => {
		const paths = issuePaths({
			statusCondition: finalStatusCondition,
			closeReason: null,
			closeResult: '',
		});

		expect(paths).toEqual(
			expect.arrayContaining([
				'source',
				'service',
				'closeReason',
				'closeResult',
			]),
		);
	});

	it('points an empty close reason object at its id', () => {
		expect(
			issuePaths({
				statusCondition: finalStatusCondition,
				closeReason: {},
				closeResult: 'a result',
			}),
		).toContain('closeReason.id');
	});

	it('does not require close fields on a non-final case', () => {
		const paths = issuePaths({
			statusCondition: {
				id: '5',
				name: 'New',
				initial: true,
			},
		});

		expect(paths).not.toContain('closeReason');
		expect(paths).not.toContain('closeResult');
	});

	it('does not throw when the parsed value is not an object', () => {
		expect(() => schema.safeParse(undefined)).not.toThrow();
		expect(() =>
			z
				.object({})
				.check(...caseCloseFieldsChecks)
				.safeParse(null),
		).not.toThrow();
	});
});
