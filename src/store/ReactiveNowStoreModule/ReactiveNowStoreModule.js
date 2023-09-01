import BaseStoreModule from '../BaseStoreModules/BaseStoreModule';

let interval = null;

export default class ReactiveNowStoreModule extends BaseStoreModule {
  state = {
    now: Date.now(),
  };

  actions = {
    SET_NOW_WATCHER: (context) => {
      interval = setInterval(() => {
        context.commit('UPDATE_NOW');
      }, 1000);
    },

    CLEAR_NOW_WATCHER: () => {
      clearInterval(interval);
    },
  };

  mutations = {
    UPDATE_NOW: (state) => {
      state.now = Date.now();
    },
  };
}
