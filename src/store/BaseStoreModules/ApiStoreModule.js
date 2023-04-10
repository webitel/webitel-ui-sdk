import BaseStoreModule from './BaseStoreModule';

export default class ApiStoreModule extends BaseStoreModule {
  generateAPIActions(api) {
    if (!api) throw new ReferenceError('pass API module!');
    this.actions
      .GET_LIST = (
      _,
      { context: callerContext = {}, params = {} },
    ) => api.getList({ ...callerContext.state, ...params });
    this.actions
      .GET_ITEM = (
      _,
      { context: callerContext = {}, params = {} } = {},
    ) => api.get({ ...callerContext.state, ...params });
    this.actions
      .POST_ITEM = (
      _,
      { context: callerContext = {} } = {},
    ) => api.add(callerContext.state);
    this.actions
      .PATCH_ITEM = (_, { context: callerContext = {}, id, changes }) => (
      api.patch({ ...callerContext.state, id, changes })
    );
    this.actions
      .UPD_ITEM = (
      _,
      { context: callerContext = {} } = {},
    ) => api.update(callerContext.state);
    this.actions
      .DELETE_ITEM = (
      _,
      { context: callerContext = {}, id },
    ) => api.delete({ ...callerContext.state, id });
    return this;
  }
}
