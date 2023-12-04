import { shallowMount } from '@vue/test-utils';
import WtDarkModeSwitcher from '../wt-dark-mode-switcher.vue';

describe('WtDarkModeSwitcher', () => {
  it('should render component', () => {
    const wrapper = shallowMount(WtDarkModeSwitcher, {});
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles dark mode class', async () => {
    const wrapper = shallowMount(WtDarkModeSwitcher, {});
    expect(window.document.documentElement.classList.contains('theme--dark'))
    .toBe(false);
    await wrapper.findComponent({ name: 'wt-switcher' }).trigger('change');
    expect(window.document.documentElement.classList.contains('theme--dark'))
    .toBe(true);
  });
});
