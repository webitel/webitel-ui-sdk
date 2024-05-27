import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import AppearanceStoreModule from '../../store/AppearanceStoreModule.js';
import WtDarkModeSwitcher from '../wt-dark-mode-switcher.vue';

describe('WtDarkModeSwitcher', () => {
  let store;

  store = createStore(new AppearanceStoreModule().getModule());

  const wrapper = shallowMount(WtDarkModeSwitcher, {
    global: {
      plugins: [store],
    },
  });

  it('should render component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles dark mode class', async () => {
    expect(window.document.documentElement.classList.contains('theme--dark'))
    .toBe(false);
    await wrapper.findComponent({ name: 'wt-switcher' }).trigger('change');
    expect(window.document.documentElement.classList.contains('theme--dark'))
    .toBe(true);
  });
});
