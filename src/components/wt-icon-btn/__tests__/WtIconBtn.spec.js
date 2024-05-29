import { shallowMount } from '@vue/test-utils';
import WtIcon from '../../wt-icon/wt-icon.vue';
import WtIconBtn from '../wt-icon-btn.vue';

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
