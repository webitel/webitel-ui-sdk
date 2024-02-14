import { shallowMount } from '@vue/test-utils';
import WtExpansionPanel from '../wt-expansion-panel.vue';

describe('WtExpansionPanel', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtExpansionPanel);
    expect(wrapper.isVisible()).toBe(true);
  });
  it('emits "opened" event when opened', () => {
    const wrapper = shallowMount(WtExpansionPanel);
    wrapper.vm.opened = false;
    wrapper.find('.wt-expansion-panel-header').trigger('click');
    expect(wrapper.emitted().opened).toBeTruthy();
  });
  it('emits "closed" event when closed', () => {
    const wrapper = shallowMount(WtExpansionPanel);
    wrapper.vm.opened = true;
    wrapper.find('.wt-expansion-panel-header').trigger('click');
    expect(wrapper.emitted().closed).toBeTruthy();
  });
});
