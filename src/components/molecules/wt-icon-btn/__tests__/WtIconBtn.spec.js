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

  it('renders tooltip text when passed', () => {
    const tooltip = 'Hello there';
    const wrapper = shallowMount(WtIconBtn, {
      stubs: {
        WtTooltip,
        WtIcon: true,
      },
      propsData: {
        tooltip,
        icon: 'bucket',
      },
    });
    expect(wrapper.find('.wt-tooltip').text()).toBe(tooltip);
  });
});
