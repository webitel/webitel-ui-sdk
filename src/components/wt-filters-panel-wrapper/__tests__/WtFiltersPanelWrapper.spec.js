import { shallowMount } from '@vue/test-utils';

import FiltersPanelWrapper from '../wt-filters-panel-wrapper.vue';

describe('Filters Panel Wrapper', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(FiltersPanelWrapper);
		expect(wrapper.exists()).toBe(true);
	});
	it('emits "reset" event at wt-table-actions "filterReset" event', () => {
		const wrapper = shallowMount(FiltersPanelWrapper);
		wrapper.vm.tableActionsHandler('filterReset');
		expect(wrapper.emitted().reset).toBeTruthy();
	});
	it(`toggles "filters-panel-wrapper--opened" class at
   wt-table-actions "settings" event`, async () => {
		const wrapper = shallowMount(FiltersPanelWrapper);
		const toggleSpy = vi.spyOn(wrapper.vm, 'toggleFiltersExpansion');
		wrapper.vm.tableActionsHandler('settings');
		expect(toggleSpy).toHaveBeenCalled();
	});
});
