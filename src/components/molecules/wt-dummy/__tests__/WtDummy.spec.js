import { shallowMount } from '@vue/test-utils';
import WtDummy from '../wt-dummy.vue';

describe('WtDummy', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDummy);
    expect(wrapper.isVisible()).toBe(true);
  });
});
