import { shallowMount } from '@vue/test-utils';
import WtExpansionPanel from '../wt-expansion-panel.vue';

describe('WtExpansionPanel', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtExpansionPanel);
    expect(wrapper.isVisible()).toBe(true);
  });
});
