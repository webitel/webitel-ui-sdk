import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

import {
	createFiltersManager,
	type IFiltersManager,
} from '../../../../classes/FiltersManager';
import { createFilterConfig } from '../../../../modules/filterConfig/classes/createFilterConfig';
import { FilterOption } from '../../../../modules/filterConfig/enums/FilterOption';
import StaticFilterField from '../static-filter-field.vue';

/* stands in for a real value input: the field under test only cares that it
   emits update:modelValue */
const StubInput = {
	props: [
		'modelValue',
	],
	emits: [
		'update:modelValue',
	],
	template: '<div class="stub-input" />',
};

const deletableConfig = createFilterConfig({
	name: FilterOption.Agent,
	valueInputComponent: StubInput,
});

/* same shape as the queue logs date range: a seeded default the list cannot run without */
const notDeletableConfig = createFilterConfig({
	name: FilterOption.JoinedAt,
	notDeletable: true,
	valueInputComponent: StubInput,
});

const mountField = (
	filterConfig: typeof deletableConfig,
	filtersManager: IFiltersManager,
) =>
	mount(StaticFilterField, {
		props: {
			filterConfig,
			filter: filtersManager.getFilter(filterConfig.name),
		},
	});

const emitValue = (wrapper: ReturnType<typeof mountField>, value: unknown) =>
	wrapper.findComponent(StubInput).vm.$emit('update:modelValue', value);

describe('StaticFilterField', () => {
	let filtersManager: IFiltersManager;

	beforeEach(() => {
		filtersManager = createFiltersManager();
	});

	it('adds the filter on its first value', () => {
		const wrapper = mountField(deletableConfig, filtersManager);

		emitValue(
			wrapper,
			[
				1,
			],
		);

		expect(wrapper.emitted('add:filter')).toEqual([
			[
				{
					name: FilterOption.Agent,
					value: [
						1,
					],
				},
			],
		]);
	});

	it('updates an already applied filter', () => {
		filtersManager.addFilter({
			name: FilterOption.Agent,
			value: [
				1,
			],
		});

		const wrapper = mountField(deletableConfig, filtersManager);

		emitValue(
			wrapper,
			[
				2,
			],
		);

		expect(wrapper.emitted('add:filter')).toBeUndefined();
		expect(wrapper.emitted('update:filter')).toHaveLength(1);
	});

	it('deletes an applied filter when its field is cleared', () => {
		filtersManager.addFilter({
			name: FilterOption.Agent,
			value: [
				1,
			],
		});

		const wrapper = mountField(deletableConfig, filtersManager);

		emitValue(wrapper, []);

		expect(wrapper.emitted('delete:filter')).toHaveLength(1);
	});

	it('keeps a notDeletable filter when its field is cleared', () => {
		filtersManager.addFilter({
			name: FilterOption.JoinedAt,
			value: 'rdt_today',
		});

		const wrapper = mountField(notDeletableConfig, filtersManager);

		emitValue(wrapper, undefined);

		expect(wrapper.emitted('delete:filter')).toBeUndefined();
	});
});
