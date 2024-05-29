import { mount, shallowMount } from '@vue/test-utils';
import WtLabel from '../../wt-label/wt-label.vue';
import WtSelect from '../wt-select.vue';

describe('WtSelect', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
    });
    expect(wrapper.classes('wt-select')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });
});
