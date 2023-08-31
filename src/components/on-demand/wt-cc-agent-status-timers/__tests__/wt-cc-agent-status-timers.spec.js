import { shallowMount } from '@vue/test-utils';
import WtCcAgentStatusTimers from '../wt-cc-agent-status-timers.vue';

describe('Wt Cc Agent Status Timers', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCcAgentStatusTimers, {
      propsData: {
        status: {
          online: 123,
          pause: 123,
          offline: 123,
        },
      },
    });
    expect(wrapper.exists())
      .toBe(true);
  });
  it('renders component with empty status prop', () => {
    const wrapper = shallowMount(WtCcAgentStatusTimers, {
      propsData: { status: {} },
    });
    expect(wrapper.exists())
      .toBe(true);
  });
});
