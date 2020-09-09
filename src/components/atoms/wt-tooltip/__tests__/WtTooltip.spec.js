import { shallowMount } from '@vue/test-utils';
import WtTooltip from '../wt-tooltip.vue';

describe('WtTooltip', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTooltip);
    expect(wrapper.classes('wt-tooltip')).toBe(true);
  });

  it('renders a component text, if passed', () => {
    const content = 'Hello there!';
    const wrapper = shallowMount(WtTooltip, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-tooltip').text()).toEqual(content);
  });

  it('changed tooltip color, if prop is passed', () => {
    const wrapper = shallowMount(WtTooltip, {
      propsData: {
        contrast: true,
      },
    });
    expect(wrapper.find('.wt-tooltip').classes())
      .toContain('wt-tooltip--contrast');
  });
});
