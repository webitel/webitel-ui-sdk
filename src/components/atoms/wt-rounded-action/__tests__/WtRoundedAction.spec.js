import { shallowMount } from '@vue/test-utils';
import WtRoundedAction from '../wt-rounded-action.vue';
import BtnSpinner from '../../wt-button/_internals/spinner.vue';

describe('WtRoundedAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtRoundedAction, { propsData: { icon: 'call' } });
    expect(wrapper.classes('wt-rounded-action')).toBe(true);
  });

  it('renders button spinner', () => {
    const wrapper = shallowMount(WtRoundedAction, {
      propsData: {
        icon: 'call',
        loading: true,
      },
    });
    expect(wrapper.findComponent(BtnSpinner).exists()).toBe(true);
  });
});
