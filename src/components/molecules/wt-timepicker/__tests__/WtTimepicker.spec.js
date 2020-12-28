import { shallowMount } from '@vue/test-utils';
import WtTimepicker from '../wt-timepicker.vue';
import WtTimeInput from '../../wt-time-input/wt-time-input.vue';

describe('WtTimepicker', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTimepicker, {
      stubs: {
        WtTimeInput: true,
      },
    });
    expect(wrapper.classes('wt-timepicker')).toBe(true);
  });

  it('renders only specified by format time inputs', () => {
    const wrapper = shallowMount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      propsData: { format: 'mm' },
    });
    expect(wrapper.findAllComponents(WtTimeInput).length).toBe(1);
  });

  it('Correctly converts value from MIN time-input to output', () => {
    const value = 0;
    const wrapper = shallowMount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      propsData: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(0).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21 * 60 * 60]);
  });

  it('Correctly converts value from HOUR time-input to output', () => {
    const value = 0;
    const wrapper = shallowMount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      propsData: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(1).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21 * 60]);
  });

  it('Correctly converts value from SEC time-input to output', () => {
    const value = 0;
    const wrapper = shallowMount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      propsData: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(2).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21]);
  });
});
