import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

export default class AppearanceStoreModule extends BaseStoreModule {
  state = {
    theme: null,
  }

  actions = {
    SET_THEME: (context, theme) => {
      context.commit('SET_THEME', theme);
    },
  }

  mutations = {
    SET_THEME: (state, theme) => {
      state.theme = theme;
    },
  }
}
