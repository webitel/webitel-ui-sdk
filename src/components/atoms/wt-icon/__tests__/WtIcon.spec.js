import { shallowMount } from '@vue/test-utils';
import WtIcon from '../wt-icon.vue';

describe('WtIcon', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIcon, {
      propsData: {
        icon: 'icon-name',
      },
    });
    expect(wrapper.classes('wt-icon')).toBe(true);
  });
});
