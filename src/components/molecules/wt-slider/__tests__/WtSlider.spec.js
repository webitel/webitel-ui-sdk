import { shallowMount } from '@vue/test-utils';
import WtSlider from '../wt-slider.vue';

describe('WtSlider', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSlider, {});
    expect(wrapper.classes('wt-slider')).toBe(true);
  });
});
