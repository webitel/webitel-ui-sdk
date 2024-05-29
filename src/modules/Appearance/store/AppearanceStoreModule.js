import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule.js';

export default class AppearanceStoreModule extends BaseStoreModule {
  state = {
    theme: null,
  };

  getters = {
    DARK_MODE: (state) => state.theme === 'dark',
  };

  actions = {
    SET_THEME: (context, theme) => {
      context.commit('SET_THEME', theme);
    },
  };

  mutations = {
    SET_THEME: (state, theme) => {
      state.theme = theme;
    },
  };
}
