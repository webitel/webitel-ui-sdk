import { shallowMount } from '@vue/test-utils';
import WtButton from '../wt-button.vue';
import BtnSpinner from '../_internals/spinner.vue';

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
      propsData: {
        loading: true,
      },
    });
    expect(wrapper.findComponent(BtnSpinner).exists()).toBe(true);
  });
});
