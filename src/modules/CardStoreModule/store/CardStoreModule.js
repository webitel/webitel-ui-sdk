import deepCopy from 'deep-copy';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

export default class CardStoreModule extends BaseStoreModule {
  state = {
    itemId: 0,
    itemInstance: {},
  };

  actions = {
    SET_PARENT_ITEM_ID: (context, id) => {
      context.commit('SET_PARENT_ITEM_ID', id);
    },
    SET_ITEM_ID: (context, id) => {
      if (id !== 'new') context.commit('SET_ITEM_ID', id);
      else context.commit('SET_ITEM_ID', 0);
    },
    LOAD_ITEM: async (context) => {
      if (context.state.itemId) {
        const item = await context.dispatch('api/GET_ITEM', { context });
        context.commit('SET_ITEM', item);
      }
    },
    ADD_ITEM: async (context) => {
      if (!context.state.itemId) {
        const { id } = await context.dispatch('api/POST_ITEM', { context });
        await context.dispatch('SET_ITEM_ID', id);
        context.dispatch('LOAD_ITEM');
      }
    },
    UPDATE_ITEM: async (context) => {
      if (context.state.itemInstance._dirty) {
        await context.dispatch('api/UPD_ITEM', { context });
        context.dispatch('LOAD_ITEM');
      }
    },
    SET_ITEM_PROPERTY: (context, payload) => {
      context.commit('SET_ITEM_PROPERTY', payload);
      context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
    },
    RESET_ITEM_STATE: async (context) => {
      context.commit('RESET_ITEM_STATE');
    },
  };

  mutations = {
    SET_PARENT_ITEM_ID: (state, id) => {
      state.parentId = id;
    },
    SET_ITEM_ID: (state, id) => {
      state.itemId = id;
    },
    SET_ITEM_PROPERTY: (state, { prop, value }) => {
      state.itemInstance[prop] = value;
    },
    SET_ITEM: (state, item) => {
      state.itemInstance = item;
    },
    RESET_ITEM_STATE: (state) => {
      Object.assign(state, deepCopy(this.state));
    },
  };

  getModule({
              state = {},
              ...rest
            } = {}) {
    this.state = {
      ...this.state,
      state,
    };
    return super.getModule({
      state: deepCopy(this.state),
      ...rest,
    });
  }
}