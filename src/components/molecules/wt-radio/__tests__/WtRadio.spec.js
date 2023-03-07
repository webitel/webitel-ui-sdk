import { shallowMount } from '@vue/test-utils';
import WtRadio from '../wt-radio.vue';
import WtLabel from '../../wt-label/wt-label.vue';
import WtIcon from '../../../atoms/wt-icon/wt-icon.vue';

describe('WtRadio', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtRadio, {
      stubs: {
        WtLabel,
        WtIcon,
      },
    });
    expect(wrapper.classes('wt-radio')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtRadio, {
      stubs: {
        WtLabel,
        WtIcon,
      },
      props: { label },
    });
    expect(wrapper.find('.wt-radio__label').text()).toBe(label);
  });

  it('toggles passed value at click', () => {
    const selected = '';
    const value = 'jest';
    const wrapper = shallowMount(WtRadio, {
      stubs: {
        WtLabel,
        WtIcon,
      },
      props: { selected, value },
    });
    wrapper.find('.wt-radio__input').trigger('input');
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });
});
