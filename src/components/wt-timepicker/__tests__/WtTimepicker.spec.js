import { mount, shallowMount } from '@vue/test-utils';

import WtTimeInput from '../../wt-time-input/wt-time-input.vue';
import WtTimepicker from '../wt-timepicker.vue';

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
    const wrapper = mount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      props: { format: 'mm' },
    });
    expect(wrapper.findAllComponents(WtTimeInput).length).toBe(1);
  });

  it('Correctly converts value from MIN time-input to output', async () => {
    const value = 0;
    const wrapper = mount(WtTimepicker, {
      // stubs: {
      //   WtTimeInput,
      // },
      props: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(0).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21 * 60 * 60]);
  });

  it('Correctly converts value from HOUR time-input to output', () => {
    const value = 0;
    const wrapper = mount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      props: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(1).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21 * 60]);
  });

  it('Correctly converts value from SEC time-input to output', () => {
    const value = 0;
    const wrapper = mount(WtTimepicker, {
      stubs: {
        WtTimeInput,
      },
      props: { value },
    });
    wrapper.findAllComponents(WtTimeInput).at(2).vm.$emit('input', 21);
    expect(wrapper.emitted().input[0]).toEqual([21]);
  });
});
