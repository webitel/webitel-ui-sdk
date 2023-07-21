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
      { context: callerContext = {}, ...rest } = {},
    ) => api.add({ ...callerContext.state, ...rest });
    this.actions
      .PATCH_ITEM = (
      _,
      { context: callerContext = {}, id, changes, ...rest },
    ) => (
      api.patch({ ...callerContext.state, ...rest, id, changes })
    );
    this.actions
      .UPD_ITEM = (
      _,
      { context: callerContext = {}, ...rest } = {},
    ) => api.update({ ...callerContext.state, ...rest });
    this.actions
      .DELETE_ITEM = (
      _,
      { context: callerContext = {}, id, ...rest },
    ) => api.delete({ ...callerContext.state, ...rest, id });
    return this;
  }
}
