import { shallowMount } from '@vue/test-utils';
import WtIconBtn from '../wt-icon-btn.vue';
import WtIcon from '../../../atoms/wt-icon/wt-icon.vue';
import WtTooltip from '../../../atoms/wt-tooltip/wt-tooltip.vue';

describe('WtIconBtn', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIconBtn, {
      stubs: {
        WtIcon,
      },
      propsData: { icon: 'bucket' },
    });
    expect(wrapper.classes('wt-icon-btn')).toBe(true);
  });
});
