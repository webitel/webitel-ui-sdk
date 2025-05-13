import { shallowMount } from '@vue/test-utils';

import WtHint from '../wt-hint.vue';

describe('WtHint', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtHint);
    expect(wrapper.isVisible()).toBe(true);
  });
});
