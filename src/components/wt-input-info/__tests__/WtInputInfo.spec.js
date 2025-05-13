import { shallowMount } from '@vue/test-utils';

import WtInputInfo from '../wt-input-info.vue';

describe('WtInputInfo', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtInputInfo);
    expect(wrapper.classes('wt-input-info')).toBe(true);
  });
});
