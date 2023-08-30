import { shallowMount, mount } from '@vue/test-utils';
import WtDatepicker from '../wt-datepicker.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtIcon from '../../wt-icon/wt-icon.vue';

describe('WtDatepicker', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDatepicker, {
      stubs: {
        WtLabel,
        WtIcon,
      },
    });
    expect(wrapper.classes('wt-datepicker')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtDatepicker, {
      stubs: {
        WtLabel,
        WtIcon,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });
});
