import { mount } from '@vue/test-utils';

import WtActionBar from '../wt-action-bar.vue';

describe('WtActionBar', () => {
  it('renders a component', () => {
    const wrapper = mount(WtActionBar);
    expect(wrapper.exists()).toBe(true);
  });
});
