export default class BaseStoreModule {
  state = {};

  getters = {};

  actions = {};

  mutations = {};

  modules = {};

  attachAPIModule(APIModule) {
    this._APIModule = APIModule;
    return this;
  }

  generateAPIActions() {
    if (!this._APIModule) throw new ReferenceError('attach API module first!');
    this.actions.GET_LIST = (context, params = {}) => this._APIModule.getList({ ...context.state, ...params });
    this.actions.GET_ITEM = (context, params = {}) => this._APIModule.get({ ...context.state, ...params });
    this.actions.POST_ITEM = (context) => this._APIModule.add(context.state);
    this.actions.PATCH_ITEM = (context, { id, changes }) => (this._APIModule.patch({ ...context.state, id, changes }));
    this.actions.UPD_ITEM = (context) => this._APIModule.update(context.state);
    this.actions.DELETE_ITEM = (context, id) => this._APIModule.delete({ ...context.state, id });
    return this;
  }

  setChildModules(modules) {
    this.modules = modules;
    return this;
  }

  getModule({
              state = {},
              getters = {},
              actions = {},
              mutations = {},
              namespaced = true,
            } = {}) {
    return {
      namespaced,
      state: { ...this.state, ...state },
      getters: { ...this.getters, ...getters },
      actions: { ...this.actions, ...actions },
      mutations: { ...this.mutations, ...mutations },
      modules: this.modules,
    };
  }
}
