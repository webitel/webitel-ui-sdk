import { shallowMount } from '@vue/test-utils';
import WtLoadBar from '../wt-load-bar.vue';

describe('WtLoadBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtLoadBar);
    expect(wrapper.exists()).toBe(true);
  });
});
