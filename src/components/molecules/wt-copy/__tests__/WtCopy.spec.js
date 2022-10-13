import { shallowMount } from '@vue/test-utils';
import WtIconBtn from '../../wt-icon-btn/wt-icon-btn.vue';
import WtCopy from '../wt-copy.vue';

describe('WtCopy', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCopy, {
      stubs: {
        WtIconBtn,
      },
    });
    expect(wrapper.classes('wt-copy')).toBe(true);
  });
});
