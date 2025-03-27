import { shallowMount } from '@vue/test-utils';

import WtContextMenu from '../wt-context-menu.vue';

describe('WtContextMenu', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtContextMenu, { props: { options: [] } });
    expect(wrapper.classes('wt-context-menu')).toBe(true);
  });
});
