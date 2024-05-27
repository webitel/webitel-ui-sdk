import { createStore } from 'vuex';
import AppearanceStoreModule from '../AppearanceStoreModule.js';

describe('AppearanceStoreModule', () => {
  let store;

  beforeEach(() => {
    store = createStore(new AppearanceStoreModule().getModule());
  });

  it('should set theme', async () => {
    await store.dispatch('SET_THEME', 'dark');
    expect(store.state.theme).toBe('dark');
  });
});
