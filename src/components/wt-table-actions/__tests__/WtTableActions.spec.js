import { shallowMount } from '@vue/test-utils';
import WtTableActions from '../wt-table-actions.vue';

describe('WtTableActions', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTableActions);
    expect(wrapper.classes('wt-table-actions')).toBe(true);
  });
});
