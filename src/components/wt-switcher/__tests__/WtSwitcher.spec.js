import { mount, shallowMount } from '@vue/test-utils';
import WtLabel from '../../wt-label/wt-label.vue';
import WtSwitcher from '../wt-switcher.vue';

describe('WtSwitcher', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSwitcher, {
      stubs: { WtLabel },
    });
    expect(wrapper.classes('wt-switcher')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtSwitcher, {
      stubs: { WtLabel },
      props: { label },
    });
    expect(wrapper.find('.wt-switcher__label').text()).toBe(label);
  });

  it('toggles passed value at click', () => {
    const value = true;
    const wrapper = mount(WtSwitcher, {
      stubs: { WtLabel },
      props: { value },
    });
    wrapper.find('.wt-switcher__input').trigger('change');
    expect(wrapper.emitted().change[0]).toEqual([!value]);
  });
});
