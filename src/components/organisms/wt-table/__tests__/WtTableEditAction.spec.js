import { shallowMount } from '@vue/test-utils';
import WtTableEditAction from '../table-cells/wt-table-edit-action.vue';

describe('WtTableEditAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTableEditAction);
    expect(wrapper.exists()).toBe(true);
  });
});
