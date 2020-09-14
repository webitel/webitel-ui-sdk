import { shallowMount } from '@vue/test-utils';
import ExpandTransition from '../expand-transition.vue';

describe('ExpandTransition', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ExpandTransition);
    expect(wrapper.exists()).toBe(true);
  });
});
