import { shallowMount } from '@vue/test-utils';
import WtAddIconAction from '../wt-add-icon-action.vue';

describe('WtAddIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtAddIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
