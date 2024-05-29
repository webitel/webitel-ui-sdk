import { mount, shallowMount } from '@vue/test-utils';
import WtLabel from '../../wt-label/wt-label.vue';
import WtInput from '../wt-input.vue';

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
    const wrapper = mount(WtInput, {
      stubs: {
        WtLabel,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });
});
