import { shallowMount } from '@vue/test-utils';
import WtImage from '../wt-image.vue';

describe('WtImage', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtImage);
    expect(wrapper.exists()).toBe(true);
  });
});
