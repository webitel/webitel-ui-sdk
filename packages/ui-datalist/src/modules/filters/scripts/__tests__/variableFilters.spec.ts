import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';

import {
	extractVariableFilters,
	isVariableFilterName,
	toVariableFilterFields,
	VARIABLE_FIELD_PREFIX,
	variableKeyFromFilterName,
	withVariableColumnFilters,
} from '../variableFilters';

const header = {
	value: 'variables.sip_code',
	field: 'variables.sip_code',
	text: 'sip_code',
	show: true,
};

describe('VARIABLE_FIELD_PREFIX', () => {
	it('is defined correctly', () => {
		expect(VARIABLE_FIELD_PREFIX).toBe('variables.');
	});
});

describe('isVariableFilterName', () => {
	it('returns true for names starting with VARIABLE_FIELD_PREFIX', () => {
		expect(isVariableFilterName('variables.sip_code')).toBe(true);
		expect(isVariableFilterName('variables.custom_field')).toBe(true);
	});

	it('returns false for names not starting with VARIABLE_FIELD_PREFIX', () => {
		expect(isVariableFilterName('agent')).toBe(false);
		expect(isVariableFilterName('queue')).toBe(false);
		expect(isVariableFilterName('var.sip_code')).toBe(false);
	});
});

describe('variableKeyFromFilterName', () => {
	it('extracts the variable key from filter name', () => {
		expect(variableKeyFromFilterName('variables.sip_code')).toBe('sip_code');
		expect(variableKeyFromFilterName('variables.custom_field')).toBe(
			'custom_field',
		);
	});

	it('returns empty string when called with just the prefix', () => {
		expect(variableKeyFromFilterName('variables.')).toBe('');
	});
});

describe('withVariableColumnFilters', () => {
	it('names the header filter after the variable field, keeping the header itself', () => {
		const [decorated] = withVariableColumnFilters([
			header,
		]);

		expect(decorated).toMatchObject(header);
		expect(decorated.filter).toBe('variables.sip_code');
	});
});

describe('toVariableFilterFields', () => {
	it('describes the variable as a text field the column filter can resolve', () => {
		expect(
			toVariableFilterFields([
				header,
			]),
		).toEqual([
			{
				id: 'variables.sip_code',
				name: 'sip_code',
				kind: WtTypeExtensionFieldKind.Text,
			},
		]);
	});

	it('falls back to the key from the field when the header has no text', () => {
		const [field] = toVariableFilterFields([
			{
				...header,
				text: undefined,
			},
		]);

		expect(field.name).toBe('sip_code');
	});
});

describe('extractVariableFilters', () => {
	it('extracts only variable filters from params', () => {
		const params = {
			'variables.sip_code': '200',
			'variables.custom_field': 'value',
			agent: 'agent-123',
			queue: 'queue-456',
		};

		expect(extractVariableFilters(params)).toEqual({
			sip_code: '200',
			custom_field: 'value',
		});
	});

	it('converts undefined values to empty strings', () => {
		const params = {
			'variables.sip_code': undefined,
			'variables.custom_field': 'value',
		};

		expect(extractVariableFilters(params)).toEqual({
			sip_code: '',
			custom_field: 'value',
		});
	});

	it('returns empty object when no variable filters present', () => {
		const params = {
			agent: 'agent-123',
			queue: 'queue-456',
		};

		expect(extractVariableFilters(params)).toEqual({});
	});

	it('returns empty object for empty params', () => {
		expect(extractVariableFilters({})).toEqual({});
	});
});
