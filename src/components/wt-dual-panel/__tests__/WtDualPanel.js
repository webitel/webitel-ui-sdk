import { shallowMount } from '@vue/test-utils';

import WtDualPanel from '../wt-dual-panel.vue';

describe('WtDualPanel', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDualPanel);
    expect(wrapper.classes('wt-dual-panel')).toBe(true);
  });

  it('renders dual panel header via header slot', () => {
    const content = 'Dual Panel header';
    const wrapper = shallowMount(WtDualPanel, {
      slots: { header: content },
    });
    expect(wrapper.find('.wt-dual-panel__header').text()).toBe(content);
  });

  it('renders dual panel actions panel via actions panel slot when actionsPanel prop is true', () => {
    const content = 'Dual Panel actions panel content';
    const wrapper = shallowMount(WtDualPanel, {
      props: { actionsPanel: true },
      slots: { 'actions-panel': content },
    });
    expect(wrapper.find('.wt-dual-panel__actions-panel').text()).toBe(content);
  });

  it('does not render actions panel when actionsPanel prop is false', () => {
    const wrapper = shallowMount(WtDualPanel, {
      props: { actionsPanel: false },
    });
    expect(wrapper.find('.wt-dual-panel__actions-panel').exists()).toBe(false);
  });

  it('renders dual panel side panel via side panel slot', () => {
    const content = 'Dual Panel side panel';
    const wrapper = shallowMount(WtDualPanel, {
      slots: { side: content },
    });
    expect(wrapper.find('.wt-dual-panel__side-panel').text()).toBe(content);
  });

  it('renders dual panel main panel via main panel slot', () => {
    const content = 'Dual Panel main panel';
    const wrapper = shallowMount(WtDualPanel, {
      slots: { main: content },
    });
    expect(wrapper.find('.wt-dual-panel__main-panel').text()).toBe(content);
  });
});
