import { shallowMount } from '@vue/test-utils';

import WtIconBtn from '../../wt-icon-btn/wt-icon-btn.vue';
import WtCopyAction from '../wt-copy-action.vue';

describe('WtCopyAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCopyAction, {
      stubs: {
        WtIconBtn,
      },
    });
    expect(wrapper.classes('wt-copy-action')).toBe(true);
  });
});
