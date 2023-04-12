import { shallowMount } from '@vue/test-utils';
import WtHistoryIconAction from '../wt-history-icon-action.vue';

describe('WtHistoryIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtHistoryIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
