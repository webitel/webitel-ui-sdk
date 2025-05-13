import { shallowMount } from '@vue/test-utils';

import WtItemLink from '../wt-item-link.vue';

describe('WtItemLink', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtItemLink);
    expect(wrapper.exists()).toBe(true);
  });
});
