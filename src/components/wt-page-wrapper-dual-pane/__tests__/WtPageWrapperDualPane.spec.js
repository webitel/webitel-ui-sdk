import { shallowMount } from '@vue/test-utils';
import WtPageWrapperDualPane from '../wt-page-wrapper-dual-pane.vue';

describe('WtPageWrapperDualPane', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtPageWrapperDualPane);
    expect(wrapper.classes('wt-page-wrapper-dual-pane')).toBe(true);
  });

  it('renders page wrapper header via header slot', () => {
    const content = 'Page Wrapper header';
    const wrapper = shallowMount(WtPageWrapperDualPane, {
      slots: { header: content },
    });
    expect(wrapper.find('.wt-page-wrapper-dual-pane__header').text()).toBe(content);
  });

  it('renders page wrapper actions panel via actions panel slot when actionsPanel prop is true', () => {
    const content = 'Page Wrapper actions panel content';
    const wrapper = shallowMount(WtPageWrapperDualPane, {
      props: { actionsPanel: true },
      slots: { 'actions-panel': content },
    });
    expect(wrapper.find('.wt-page-wrapper-dual-pane__actions-panel').text()).toBe(content);
  });

  it('does not render actions panel when actionsPanel prop is false', () => {
    const wrapper = shallowMount(WtPageWrapperDualPane, {
      props: { actionsPanel: false },
    });
    expect(wrapper.find('.wt-page-wrapper-dual-pane__actions-panel').exists()).toBe(false);
  });

  it('renders page wrapper side pane via side pane slot', () => {
    const content = 'Page Wrapper side pane';
    const wrapper = shallowMount(WtPageWrapperDualPane, {
      slots: { 'side': content },
    });
    expect(wrapper.find('.wt-page-wrapper-dual-pane__side-pane').text()).toBe(content);
  });

  it('renders page wrapper main pane via main pane slot', () => {
    const content = 'Page Wrapper main pane';
    const wrapper = shallowMount(WtPageWrapperDualPane, {
      slots: { 'main': content },
    });
    expect(wrapper.find('.wt-page-wrapper-dual-pane__main-pane').text()).toBe(content);
  });
});
