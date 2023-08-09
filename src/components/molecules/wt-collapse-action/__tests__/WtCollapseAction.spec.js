import { shallowMount } from '@vue/test-utils';
import WtCollapseAction from '../wt-collapse-action.vue';

describe('WtCollapseAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCollapseAction);
    expect(wrapper.isVisible()).toBe(true);
  });
});
