import { shallowMount } from '@vue/test-utils';

import WtIcon from '../wt-icon.vue';

describe('WtIcon', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIcon, {
      props: {
        icon: 'icon-name',
      },
    });
    expect(wrapper.classes('wt-icon')).toBe(true);
  });
  it('correctly computes icon name', () => {
    const iconName = '#jest-bucket';
    const wrapper = shallowMount(WtIcon, {
      props: {
        icon: 'bucket',
        size: 'sm',
        iconPrefix: 'jest',
      },
    });
    expect(wrapper.vm.iconName).toBe(iconName);
  });
});
