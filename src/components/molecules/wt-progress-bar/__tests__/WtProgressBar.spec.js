import { shallowMount } from '@vue/test-utils';
import WtProgressBar from '../wt-progress-bar.vue';

describe('WtProgressBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtProgressBar);
    expect(wrapper.exists()).toBe(true);
  });
  it('isOverflow correctly computes overflow=true', () => {
    const wrapper = shallowMount(WtProgressBar, { propsData: { value: 2, max: 1 } });
    expect(wrapper.vm.isOverflow).toBe(true);
  });
  it('isOverflow correctly computes overflow=false', () => {
    const wrapper = shallowMount(WtProgressBar, { propsData: { value: 0.99, max: 1 } });
    expect(wrapper.vm.isOverflow).toBe(false);
  });
});
