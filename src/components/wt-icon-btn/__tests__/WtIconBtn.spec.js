import { shallowMount } from '@vue/test-utils';
import WtIconBtn from '../wt-icon-btn.vue';
import WtIcon from '../../wt-icon/wt-icon.vue';

describe('WtIconBtn', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIconBtn, {
      stubs: {
        WtIcon,
      },
      props: { icon: 'bucket' },
    });
    expect(wrapper.classes('wt-icon-btn')).toBe(true);
  });
});
