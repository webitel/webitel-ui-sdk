import { shallowMount } from '@vue/test-utils';
import WtSwitcher from '../wt-switcher.vue';
import WtLabel from '../../../atoms/wt-label/wt-label.vue';

describe('WtSwitcher', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSwitcher, {
      stubs: { WtLabel },
    });
    expect(wrapper.classes('wt-switcher')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtSwitcher, {
      stubs: { WtLabel },
      propsData: { label },
    });
    expect(wrapper.find('.wt-switcher__label').text()).toBe(label);
  });

  it('toggles passed value at click', () => {
    const value = true;
    const wrapper = shallowMount(WtSwitcher, {
      stubs: { WtLabel },
      propsData: { value },
    });
    wrapper.find('.wt-switcher__wrapper').trigger('click');
    expect(wrapper.emitted().change.pop()).toEqual([!value]);
  });
});
