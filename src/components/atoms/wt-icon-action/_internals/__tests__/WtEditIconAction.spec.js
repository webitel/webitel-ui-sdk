import { shallowMount } from '@vue/test-utils';
import WtEditIconAction from '../wt-edit-icon-action.vue';

describe('WtEditIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtEditIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
