import { shallowMount } from '@vue/test-utils';
import WtTableDeleteAction from '../table-cells/wt-table-delete-action.vue';

describe('WtTableDeleteAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTableDeleteAction);
    expect(wrapper.exists()).toBe(true);
  });
});
