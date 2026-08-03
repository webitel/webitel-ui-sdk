import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import { defineStore } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import ApplyPresetAction from '../../../filter-presets/components/apply-preset/apply-preset-action.vue';
import {
	createFiltersManager,
	type IFiltersManager,
} from '../../classes/FiltersManager';
import { createFilterConfig } from '../../modules/filterConfig/classes/createFilterConfig';
import { FilterOption } from '../../modules/filterConfig/enums/FilterOption';
import TableFiltersPanel from '../table-filters-panel.vue';

/* the panel only ever calls resetPreset – createTestingPinia stubs it */
const useTestPresetsStore = defineStore('test/presets', () => ({
	resetPreset: () => {},
}));

/*
shallowMount stubs dynamic-filter-panel-wrapper, and stubs don't render slots –
so apply-preset-action would never appear. This stub renders them.
 */
const DynamicFilterPanelWrapperStub = {
	template: '<div><slot name="filters" /><slot name="actions" /></div>',
};

const filterOptions = [
	/* same shape as cc-history: a seeded, non-removable default */
	createFilterConfig({
		name: FilterOption.CreatedAt,
		notDeletable: true,
	}),
	FilterOption.Agent,
];

const mountPanel = (filtersManager: IFiltersManager) => {
	const pinia = createTestingPinia();

	return shallowMount(TableFiltersPanel, {
		props: {
			filterOptions,
			filtersManager,
			presetNamespace: 'test',
			usePresetsStore: useTestPresetsStore,
		},
		global: {
			plugins: [
				pinia,
			],
			stubs: {
				DynamicFilterPanelWrapper: DynamicFilterPanelWrapperStub,
			},
		},
	});
};

const hasAnyFiltersOf = (filtersManager: IFiltersManager) =>
	mountPanel(filtersManager)
		.findComponent(ApplyPresetAction)
		.props('hasAnyFilters');

describe('TableFiltersPanel preset restore gate', () => {
	let filtersManager: IFiltersManager;

	beforeEach(() => {
		filtersManager = createFiltersManager();
	});

	it('reports no filters when nothing is applied', () => {
		expect(hasAnyFiltersOf(filtersManager)).toBe(false);
	});

	it('ignores notDeletable filters, so a seeded default does not block restore', () => {
		filtersManager.addFilter({
			name: FilterOption.CreatedAt,
			value: 'today',
		});

		expect(hasAnyFiltersOf(filtersManager)).toBe(false);
	});

	it('ignores the search filter', () => {
		filtersManager.addFilter({
			name: 'search',
			value: 'test',
		});

		expect(hasAnyFiltersOf(filtersManager)).toBe(false);
	});

	it('reports filters when a deletable one is applied', () => {
		filtersManager.addFilter({
			name: FilterOption.Agent,
			value: 1,
		});

		expect(hasAnyFiltersOf(filtersManager)).toBe(true);
	});
});
