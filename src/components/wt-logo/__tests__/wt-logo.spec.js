import { shallowMount } from '@vue/test-utils';

import WtLogo from '../wt-logo.vue';

describe('WtLogo', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtLogo);
    expect(wrapper.exists()).toBeTruthy();
  });
});
