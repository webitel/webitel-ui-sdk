import { shallowMount } from '@vue/test-utils';
import WtInput from '../wt-input.vue';
import WtLabel from '../../wt-label/wt-label.vue';

describe('WtInput', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtInput, {
      stubs: {
        WtLabel,
      },
    });
    expect(wrapper.classes('wt-input')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtInput, {
      stubs: {
        WtLabel,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });
});
