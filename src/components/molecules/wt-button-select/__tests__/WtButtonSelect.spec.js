import { shallowMount } from '@vue/test-utils';
import WtSelectButton from '../wt-button-select.vue';
import WtContextMenu from '../../../atoms/wt-context-menu/wt-context-menu.vue';

describe('WtSelectButton', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSelectButton);
    expect(wrapper.classes('wt-button-select')).toBe(true);
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

  it('context-menu is invisible at start', () => {
    const wrapper = shallowMount(WtSelectButton, {
      stubs: { WtContextMenu },
    });
    expect(wrapper.findComponent(WtContextMenu).classes('wt-context-menu--hidden')).toBe(true);
  });

  it('toggles isOpened, if select-btn is clicked', async () => {
    const wrapper = shallowMount(WtSelectButton, {
      stubs: { WtContextMenu },
    });
    wrapper.find('.wt-button-select__select-btn').vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(WtContextMenu).element.classList[1]).toBe(undefined);

    wrapper.find('.wt-button-select__select-btn').vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(WtContextMenu).element.classList[1]).toBe('wt-context-menu--hidden');
  });

  it('hides context-menu on its click event', async () => {
    const isOpened = true;
    const options = ['1', '2'];
    const wrapper = shallowMount(WtSelectButton, {
      stubs: { WtContextMenu },
      data: () => ({ isOpened }),
      propsData: { options },
    });
    wrapper.findComponent({ name: 'WtContextMenu' }).vm.$emit('click', { option: '1' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ name: 'WtContextMenu' }).classes()).toContain('wt-context-menu--hidden');
  });

  it('should rotate the arrow', () => {
    const wrapper = shallowMount(WtSelectButton, {
      data: () => ({
        isOpened: true,
      }),
    });
    const wtIcon = wrapper.find('.wt-button-select__select-arrow');
    expect(wtIcon.classes()).toContain('wt-button-select__select-arrow--active');
  });
});
