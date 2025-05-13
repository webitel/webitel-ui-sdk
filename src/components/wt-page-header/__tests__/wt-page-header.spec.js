import { shallowMount } from '@vue/test-utils';

import WtPageHeader from '../wt-page-header.vue';

describe('WtPageHeader', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtPageHeader);
    expect(wrapper.isVisible()).toBe(true);
  });
});
