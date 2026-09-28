import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';

import {
	createFiltersManager,
	type IFiltersManager,
} from '../../../classes/FiltersManager';
import DynamicFilterSearch from '../dynamic-filter-search.vue';

const searchModeOptions = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'about',
		text: 'About',
	},
];

const newFiltersManager = () =>
	reactive(createFiltersManager()) as IFiltersManager;

const mountSearch = (
	filtersManager: IFiltersManager,
	props: Record<string, unknown> = {},
) =>
	shallowMount(DynamicFilterSearch, {
		props: {
			filtersManager,
			...props,
		},
	});

/* wt-search-bar is an async component, shallowMount renders it as the root stub */
const searchBarValue = (wrapper: ReturnType<typeof mountSearch>) =>
	wrapper.attributes('value');

describe('dynamic-filter-search', () => {
	it('restores the value of the filter of the current search mode', async () => {
		const filtersManager = newFiltersManager();

		const wrapper = mountSearch(filtersManager, {
			searchModeOptions,
			searchMode: 'name',
			isFiltersRestoring: true,
		});

		filtersManager.addFilter({
			name: 'name',
			value: 'john',
		});
		await wrapper.setProps({
			isFiltersRestoring: false,
		});

		expect(searchBarValue(wrapper)).toBe('john');
	});

	it('switches the search mode to the restored search filter', async () => {
		const filtersManager = newFiltersManager();

		const wrapper = mountSearch(filtersManager, {
			searchModeOptions,
			searchMode: '',
			isFiltersRestoring: true,
		});

		filtersManager.addFilter({
			name: 'about',
			value: 'manager',
		});
		await wrapper.setProps({
			isFiltersRestoring: false,
		});

		expect(searchBarValue(wrapper)).toBe('manager');
		expect(wrapper.emitted('update:searchMode')?.at(-1)).toEqual([
			'about',
		]);
	});

	it('restores the value of a single search filter', () => {
		const filtersManager = newFiltersManager();
		filtersManager.addFilter({
			name: 'q',
			value: 'john',
		});

		const wrapper = mountSearch(filtersManager, {
			singleSearchName: 'q',
		});

		expect(searchBarValue(wrapper)).toBe('john');
	});
});
