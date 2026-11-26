import { mount, shallowMount } from '@vue/test-utils';
import {
	WtCollapsibleSearchBar,
	WtSearchBar,
} from '@webitel/ui-sdk/components';
import { describe, expect, it, vi } from 'vitest';
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

	it('removes the search filter when the value becomes blank', () => {
		const filtersManager = newFiltersManager();
		filtersManager.addFilter({
			name: 'search',
			value: 'john',
		});
		const wrapper = mountSearch(filtersManager);

		wrapper.findComponent(WtSearchBar).vm.$emit('input', '   ');

		expect(wrapper.emitted('filter:delete')).toEqual([
			[
				{
					name: 'search',
				},
			],
		]);
	});

	it('does not search by a blank value', () => {
		const wrapper = mountSearch(newFiltersManager());

		wrapper.findComponent(WtSearchBar).vm.$emit('search', '   ');

		expect(wrapper.emitted('filter:add')).toBeUndefined();
		expect(wrapper.emitted('filter:update')).toBeUndefined();
	});

	it('searches by a value with spaces as it is', () => {
		const wrapper = mountSearch(newFiltersManager());

		wrapper.findComponent(WtSearchBar).vm.$emit('search', ' john ');

		expect(wrapper.emitted('filter:add')).toEqual([
			[
				{
					name: 'search',
					value: ' john ',
				},
			],
		]);
	});

	/* shallowMount renders both async search bars as the same stub */
	it('renders the collapsible search bar with the placeholder', async () => {
		const wrapper = mount(DynamicFilterSearch, {
			props: {
				filtersManager: newFiltersManager(),
				collapsible: true,
				placeholder: 'Search by number',
			},
		});
		await vi.waitFor(() =>
			expect(wrapper.find('.wt-collapsible-search-bar').exists()).toBe(true),
		);

		expect(wrapper.find('.wt-collapsible-search-bar').exists()).toBe(true);
		expect(wrapper.find('input').attributes('placeholder')).toBe(
			'Search by number',
		);
	});

	it('searches from the collapsible search bar', () => {
		const wrapper = mountSearch(newFiltersManager(), {
			collapsible: true,
		});

		wrapper.findComponent(WtCollapsibleSearchBar).vm.$emit('search', 'john');

		expect(wrapper.emitted('filter:add')).toEqual([
			[
				{
					name: 'search',
					value: 'john',
				},
			],
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
