import { shallowMount } from '@vue/test-utils';
import WtCcAgentStatusTimers from '../wt-cc-agent-status-timers.vue';

describe('WtCcAgentStatusTimers', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCcAgentStatusTimers, {
      props: {
        status: {
          online: 123,
          pause: 123,
          offline: 123,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders component with empty status prop', () => {
    const wrapper = shallowMount(WtCcAgentStatusTimers, {
      props: { status: {} },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
