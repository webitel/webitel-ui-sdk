import { shallowMount } from '@vue/test-utils';
import WtAppHeader from '../wt-app-header.vue';

describe('WtAppHeader', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtAppHeader);
    expect(wrapper.classes('wt-app-header')).toBe(true);
  });

  it('renders a app-header content via default slot', () => {
    const content = 'app header content';
    const wrapper = shallowMount(WtAppHeader, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-app-header').text()).toBe(content);
  });
});
