import { shallowMount } from '@vue/test-utils';
import WtLink from '../wt-link.vue';

describe('WtLink', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtLink);
    expect(wrapper.exists()).toBe(true);
  });
});
