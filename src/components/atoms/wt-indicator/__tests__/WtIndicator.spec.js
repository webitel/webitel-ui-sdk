import { shallowMount } from '@vue/test-utils';
import WtIndicator from '../wt-indicator.vue';

describe('WtIndicator', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIndicator);
    expect(wrapper.classes('wt-indicator')).toBe(true);
  });

  it('renders a component text, if passed', () => {
    const content = 'Hello there!';
    const wrapper = shallowMount(WtIndicator, {
      propsData: {
        text: content,
      },
    });
    expect(wrapper.find('.wt-indicator__text').text()).toEqual(content);
  });

  it('changed indicator color, if prop is passed', () => {
    const wrapper = shallowMount(WtIndicator, {
      propsData: {
        color: 'primary',
      },
    });
    expect(wrapper.find('.wt-indicator__indicator').classes())
      .toContain('wt-indicator__indicator--primary');
  });
});
