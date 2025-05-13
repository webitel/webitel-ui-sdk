import { shallowMount } from '@vue/test-utils';

import WtLoader from '../../wt-loader/wt-loader.vue';
import WtButton from '../wt-button.vue';

describe('WtButton', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtButton);
    expect(wrapper.classes('wt-button')).toBe(true);
  });

  it('renders a button content via default slot', () => {
    const content = 'button content';
    const wrapper = shallowMount(WtButton, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-button').text()).toBe(content);
  });

  it('renders button spinner', () => {
    const wrapper = shallowMount(WtButton, {
      props: {
        loading: true,
      },
    });
    expect(wrapper.findComponent(WtLoader).exists()).toBe(true);
  });
});
