import { shallowMount, mount } from '@vue/test-utils';
import WtSelectButton from '../wt-button-select.vue';

// helps to mock @floating-ui/vue autoUpdate method
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('WtSelectButton', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSelectButton);
    expect(wrapper.classes('wt-button-select')).toBe(true);
  });

  it('renders a button content via default slot', () => {
    const content = 'button content';
    const wrapper = mount(WtSelectButton, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.wt-button-select__button').text()).toBe(content);
  });

  it('should rotate the arrow', () => {
    const wrapper = mount(WtSelectButton, {
      data: () => ({
        isOpened: true,
      }),
      props: {
        options: [],
      },
    });
    const wtIcon = wrapper.find('.wt-button-select__select-arrow');
    expect(wtIcon.classes()).toContain('wt-button-select__select-arrow--active');
  });
});
