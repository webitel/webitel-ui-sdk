import { shallowMount } from '@vue/test-utils';
import WtDeleteIconAction from '../wt-delete-icon-action.vue';

describe('WtDeleteIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDeleteIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
