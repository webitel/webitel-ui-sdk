import { shallowMount } from '@vue/test-utils';
import WtTimeInput from '../wt-time-input.vue';
import WtLabel from '../../../atoms/wt-label/wt-label.vue';

describe('WtTimeInput', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTimeInput, {
      stubs: {
        WtLabel,
      },
    });
    expect(wrapper.classes('wt-time-input')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtTimeInput, {
      stubs: {
        WtLabel,
      },
      propsData: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });
});
