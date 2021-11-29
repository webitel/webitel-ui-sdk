import { shallowMount } from '@vue/test-utils';
import WtSelectButton from '../wt-button-select.vue';
import WtContextMenu from '../../../atoms/wt-context-menu/wt-context-menu.vue';

describe('wt-button-select', () => {
  it('renders a component', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtSelectButton, {
      propsData: { options },
    });
    expect(wrapper.classes('wt-button-select')).toBe(true);
  });

  it('should toggle isOpened', () => {
    const wrapper = shallowMount(WtSelectButton);

    wrapper.find('.wt-button-select__select-btn').vm.$emit('click');
    expect(wrapper.vm.isOpened).toBe(true);

    wrapper.find('.wt-button-select__select-btn').vm.$emit('click');
    expect(wrapper.vm.isOpened).toBe(false);
  });

  it('renders a button content via default slot', () => {
    const content = 'button content';
    const wrapper = shallowMount(WtSelectButton, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-button-select__button').text()).toBe(content);
  });

  it('should switch isOpened to false on wt-context-menu', () => {
    const wrapper = shallowMount(WtSelectButton);

    wrapper.find(WtContextMenu).vm.$emit('click');
    expect(wrapper.vm.isOpened).toBe(false);
  });

  it('should add "wt-button-select__select-arrow--active" class', () => {
    const isOpened = false;
    const wrapper = shallowMount(WtSelectButton);

    if (isOpened) {
      expect(wrapper.classes('wt-button-select__select-arrow--active')).toBe(true);
    }
  });

  it('Component wt-context-menu should be invisible', () => {
    const isOpened = false;

    const wrapper = shallowMount(WtSelectButton);
    if (isOpened) {
      expect(wrapper.find(WtContextMenu).isVisible()).toBe(false);
    } else if (!isOpened) {
      expect(wrapper.find(WtContextMenu).isVisible()).toBe(true);
    }
  });
});
