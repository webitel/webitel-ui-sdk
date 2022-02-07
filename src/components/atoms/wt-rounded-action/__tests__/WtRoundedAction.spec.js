import { shallowMount } from '@vue/test-utils';
import WtRoundedAction from '../wt-rounded-action.vue';

describe('WtRoundedAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtRoundedAction, { propsData: { icon: 'call' } });
    expect(wrapper.classes('wt-rounded-action')).toBe(true);
  });
});
