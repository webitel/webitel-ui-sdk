import { mount, shallowMount } from '@vue/test-utils';
import WtTree from '../wt-tree.vue';

describe('WtTree', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTree, {
      stubs: {
        WtTree: true,
      },
    });
    expect(wrapper.classes('wt-tree')).toBe(true);
  });
});
