import { shallowMount } from '@vue/test-utils';
import WtRefreshIconAction from '../wt-refresh-icon-action.vue';

describe('WtRefreshIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtRefreshIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
