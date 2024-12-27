import { shallowMount } from '@vue/test-utils';
import WtPageWrapper from '../wt-page-wrapper.vue';

describe('WtPageWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtPageWrapper);
    expect(wrapper.classes('wt-page-wrapper')).toBe(true);
  });

  it('renders page wrapper header via header slot', () => {
    const content = 'Page Wrapper header';
    const wrapper = shallowMount(WtPageWrapper, {
      slots: { header: content },
    });
    expect(wrapper.find('.wt-page-wrapper__header').text()).toBe(content);
  });

  it('renders page wrapper actions panel via actions panel slot', () => {
    const content = 'Page Wrapper actions panel content';
    const wrapper = shallowMount(WtPageWrapper, {
      slots: { 'actions-panel': content },
    });
    expect(wrapper.find('.wt-page-wrapper__actions-panel').text()).toBe(
      content,
    );
  });

  it('renders page wrapper main content via main slot', () => {
    const content = 'Page Wrapper main';
    const wrapper = shallowMount(WtPageWrapper, {
      slots: { main: content },
    });
    expect(wrapper.find('.wt-page-wrapper__main').text()).toBe(content);
  });
});
