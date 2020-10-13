import { shallowMount } from '@vue/test-utils';
import WtPopup from '../wt-popup.vue';

describe('WtPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtPopup, {
      stubs: { WtIconBtn: true },
    });
    expect(wrapper.classes('wt-popup')).toBe(true);
  });

  it('renders popup header via header slot', () => {
    const content = 'Popup header';
    const wrapper = shallowMount(WtPopup, {
      stubs: { WtIconBtn: true },
      slots: { header: content },
    });
    expect(wrapper.find('.wt-popup__header').text()).toBe(content);
  });

  it('renders popup header via title slot', () => {
    const content = 'Popup title';
    const wrapper = shallowMount(WtPopup, {
      stubs: { WtIconBtn: true },
      slots: { title: content },
    });
    expect(wrapper.find('.wt-popup__header__title').text()).toBe(content);
  });

  it('renders popup main via main slot', () => {
    const content = 'Popup main content';
    const wrapper = shallowMount(WtPopup, {
      stubs: { WtIconBtn: true },
      slots: { main: content },
    });
    expect(wrapper.find('.wt-popup__main').text()).toBe(content);
  });

  it('renders popup actions via actions slot', () => {
    const content = 'Popup actions';
    const wrapper = shallowMount(WtPopup, {
      stubs: { WtIconBtn: true },
      slots: { actions: content },
    });
    expect(wrapper.find('.wt-popup__actions').text()).toBe(content);
  });
});
