import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

import {
	isVariableHeader,
	useTableVariableHeaders,
	VARIABLE_FIELD_PREFIX,
} from '../useTableVariableHeaders';

describe('isVariableHeader', () => {
	it('detects variable headers by field or value prefix', () => {
		expect(
			isVariableHeader({
				field: `${VARIABLE_FIELD_PREFIX}city`,
			}),
		).toBe(true);
		expect(
			isVariableHeader({
				value: `${VARIABLE_FIELD_PREFIX}city`,
			}),
		).toBe(true);
		expect(
			isVariableHeader({
				field: 'name',
				value: 'name',
			}),
		).toBe(false);
	});
});

describe('useTableVariableHeaders', () => {
	it('replaces existing variable headers and appends new ones', () => {
		const headers = ref([
			{
				field: 'name',
				value: 'name',
				show: true,
			},
			{
				field: `${VARIABLE_FIELD_PREFIX}old`,
				value: `${VARIABLE_FIELD_PREFIX}old`,
				text: 'old',
				show: true,
			},
		]);
		const updateShownHeaders = vi.fn();

		const { updateVariableHeaders } = useTableVariableHeaders({
			headers,
			updateShownHeaders,
		});

		updateVariableHeaders([
			{
				field: `${VARIABLE_FIELD_PREFIX}old`,
				value: `${VARIABLE_FIELD_PREFIX}old`,
				text: 'old',
				show: true,
			},
			{
				field: `${VARIABLE_FIELD_PREFIX}new`,
				value: `${VARIABLE_FIELD_PREFIX}new`,
				text: 'new',
				show: true,
			},
		]);

		expect(updateShownHeaders).toHaveBeenCalledWith([
			{
				field: 'name',
				value: 'name',
				show: true,
			},
			{
				field: `${VARIABLE_FIELD_PREFIX}old`,
				value: `${VARIABLE_FIELD_PREFIX}old`,
				text: 'old',
				show: true,
			},
			{
				field: `${VARIABLE_FIELD_PREFIX}new`,
				value: `${VARIABLE_FIELD_PREFIX}new`,
				text: 'new',
				show: true,
			},
		]);
	});

	it('removes variable headers missing from the incoming list', () => {
		const headers = ref([
			{
				field: `${VARIABLE_FIELD_PREFIX}keep`,
				value: `${VARIABLE_FIELD_PREFIX}keep`,
				text: 'keep',
				show: false,
			},
			{
				field: `${VARIABLE_FIELD_PREFIX}drop`,
				value: `${VARIABLE_FIELD_PREFIX}drop`,
				text: 'drop',
				show: true,
			},
		]);
		const updateShownHeaders = vi.fn();

		const { updateVariableHeaders } = useTableVariableHeaders({
			headers,
			updateShownHeaders,
		});

		updateVariableHeaders([
			{
				field: `${VARIABLE_FIELD_PREFIX}keep`,
				value: `${VARIABLE_FIELD_PREFIX}keep`,
				text: 'keep',
				show: true,
			},
		]);

		expect(updateShownHeaders).toHaveBeenCalledWith([
			{
				field: `${VARIABLE_FIELD_PREFIX}keep`,
				value: `${VARIABLE_FIELD_PREFIX}keep`,
				text: 'keep',
				show: false,
			},
		]);
	});
});
