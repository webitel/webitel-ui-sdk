import { shallowMount } from '@vue/test-utils';

import WtBreadcrumb from '../wt-breadcrumb.vue';

describe('WtBreadcrumb', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtBreadcrumb, {
      props: {
        path: [],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
