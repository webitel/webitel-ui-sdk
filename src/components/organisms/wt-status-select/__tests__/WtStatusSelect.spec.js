import { shallowMount } from '@vue/test-utils';
import WtStatusSelect from '../wt-status-select.vue';
import WtSelect from '../../../molecules/wt-select/wt-select.vue';

describe('WtStatusSelect', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtStatusSelect, {
      stubs: { WtSelect },
    });
    expect(wrapper.classes('wt-status-select')).toBe(true);
  });

  it('correctly represents duration', () => {
    const wrapper = shallowMount(WtStatusSelect, {
      stubs: { WtSelect },
    });
    expect(wrapper.vm.duration).toBe('00:00:00');

    // wrapper.setProps({ statusDuration: 1 });
    // expect(wrapper.vm.duration).toBe('00:00:01');
    //
    // wrapper.setProps({ statusDuration: '01' });
    // expect(wrapper.vm.duration).toBe('00:00:01');
  });
});
