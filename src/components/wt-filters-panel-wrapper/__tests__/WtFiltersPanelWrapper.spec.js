import { shallowMount } from '@vue/test-utils';
import FiltersPanelWrapper from '../wt-filters-panel-wrapper.vue';

describe('Filters Panel Wrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FiltersPanelWrapper);
    expect(wrapper.exists()).toBe(true);
  });
  it('emits "reset" event at wt-table-actions "filterReset" event', () => {
    const wrapper = shallowMount(FiltersPanelWrapper);
    wrapper.findComponent({ name: 'wt-table-actions' })
    .vm.$emit('input', 'filterReset');
    expect(wrapper.emitted().reset).toBeTruthy();
  });
  it(`toggles "filters-panel-wrapper--opened" class at
   wt-table-actions "settings" event`, async () => {
    const wrapper = shallowMount(FiltersPanelWrapper);
    expect(wrapper.classes().includes('filters-panel-wrapper--opened'))
    .toBe(false);
    wrapper.findComponent({ name: 'wt-table-actions' })
    .vm.$emit('input', 'settings');
    await wrapper.vm.$nextTick();
    expect(wrapper.classes().includes('filters-panel-wrapper--opened'))
    .toBe(true);
  });
});
