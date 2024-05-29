import { mount, shallowMount } from '@vue/test-utils';
import WtIcon from '../../wt-icon/wt-icon.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtCheckbox from '../wt-checkbox.vue';

describe('WtCheckbox', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCheckbox, {
      stubs: {
        WtLabel,
        WtIcon,
      },
    });
    expect(wrapper.classes('wt-checkbox')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtCheckbox, {
      stubs: {
        WtLabel,
        WtIcon,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-checkbox__label').text()).toBe(label);
  });

  it('toggles passed value at click', () => {
    const selected = true;
    const wrapper = mount(WtCheckbox, {
      stubs: {
        WtLabel,
        WtIcon,
      },
      props: { selected },
    });
    wrapper.find('.wt-checkbox__input').trigger('change');
    expect(wrapper.emitted().change[0]).toEqual([!selected]);
  });
});
