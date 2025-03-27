import { shallowMount } from '@vue/test-utils';

import WtIntersectionObserver from '../wt-intersection-observer.vue';

describe('WtIntersectionObserver', () => {
  const next = () => true;
  it('renders a component', () => {
    const wrapper = shallowMount(WtIntersectionObserver, {
      props: { next },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
