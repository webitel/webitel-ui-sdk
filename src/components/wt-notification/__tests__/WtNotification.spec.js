import { shallowMount } from '@vue/test-utils';

import WtIcon from '../../wt-icon/wt-icon.vue';
import WtNotification from '../wt-notification.vue';

describe('WtNotification', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtNotification, {
      stubs: { WtIcon },
    });
    expect(wrapper.classes('wt-notification')).toBe(true);
  });

  it('renders message via default slot', () => {
    const content = 'Hello there';
    const wrapper = shallowMount(WtNotification, {
      stubs: { WtIcon },
      slots: { default: content },
    });
    expect(wrapper.find('.wt-notification__text').text()).toBe(content);
  });
});
