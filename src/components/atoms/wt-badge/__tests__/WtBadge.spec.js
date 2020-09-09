import { shallowMount } from '@vue/test-utils';
import WtBadge from '../wt-badge.vue';

describe('WtBadge', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtBadge);
    expect(wrapper.classes('wt-badge')).toBe(true);
  });

  it('renders a badge content via default slot', () => {
    const content = 'badge content';
    const wrapper = shallowMount(WtBadge, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-badge').text()).toBe(content);
  });
});
