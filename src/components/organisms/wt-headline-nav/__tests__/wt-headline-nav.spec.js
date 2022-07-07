import { shallowMount } from '@vue/test-utils';
import WtHeadlineNav from '../wt-headline-nav.vue';

describe('WtHeadlineNav', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtHeadlineNav, {
      propsData: {
        path: [],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
