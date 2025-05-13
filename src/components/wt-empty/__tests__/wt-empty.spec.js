import { shallowMount } from '@vue/test-utils';

import WtEmpty from '../wt-empty.vue';

describe('WtEmpty', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtEmpty);
    expect(wrapper.exists()).toBe(true);
  });
});
