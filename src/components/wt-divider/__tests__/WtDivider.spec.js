import { shallowMount } from '@vue/test-utils';

import WtDivider from '../wt-divider.vue';

describe('WtDivider', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDivider);
    expect(wrapper.classes('wt-divider')).toBe(true);
  });
});
