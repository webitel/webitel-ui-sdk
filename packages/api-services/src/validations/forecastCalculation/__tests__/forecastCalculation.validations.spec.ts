import { describe, expect, it } from 'vitest';

import { forecastCalculationSchema } from '../forecastCalculation.validations';

const valid = {
	name: 'Erlang C',
	procedure: 'wfm.forecast_erlang',
};

describe('forecastCalculationSchema', () => {
	it('accepts a calculation with only a name and a procedure', () => {
		expect(forecastCalculationSchema.safeParse(valid).success).toBe(true);
	});

	it('defaults the description and the arguments', () => {
		expect(forecastCalculationSchema.parse(valid)).toEqual({
			...valid,
			description: '',
			args: [],
		});
	});

	it.each([
		'name',
		'procedure',
	])('requires %s', (field) => {
		expect(
			forecastCalculationSchema.safeParse({
				...valid,
				[field]: '',
			}).success,
		).toBe(false);
	});

	it('rejects a name longer than 250 symbols', () => {
		expect(
			forecastCalculationSchema.safeParse({
				...valid,
				name: 'a'.repeat(251),
			}).success,
		).toBe(false);
	});
});
