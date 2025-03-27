import { shallowMount } from '@vue/test-utils';

import WtLoader from '../wt-loader.vue';

describe('WtLoader', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtLoader);
    expect(wrapper.classes('wt-loader')).toBe(true);
  });
});
