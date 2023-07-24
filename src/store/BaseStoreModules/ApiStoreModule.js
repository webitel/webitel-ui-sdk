import BaseStoreModule from './BaseStoreModule';

const getParentIdFromContext = (context) => (
  context?.getters?.PARENT_ID || context?.state?.parentId
);

export default class ApiStoreModule extends BaseStoreModule {
  generateAPIActions(api) {
    if (!api) throw new ReferenceError('pass API module!');
    this.actions
      .GET_LIST = (
      _,
      { context: callerContext = {}, params = {} },
    ) => {
      if (!api.getList) throw Error('No API "getList" method provided');
      return api.getList({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...params,
      });
    };

    this.actions
      .GET_ITEM = (
      _,
      { context: callerContext = {}, params = {} } = {},
    ) => {
      if (!api.get) throw Error('No API "get" method provided');
      return api.get({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...params,
      });
    };

    this.actions
      .POST_ITEM = (
      _,
      { context: callerContext = {}, ...rest } = {},
    ) => {
      if (!api.add) throw Error('No API "add" method provided');
      return api.add({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...rest,
      });
    };

    this.actions
      .PATCH_ITEM = (
      _,
      { context: callerContext = {}, id, changes, ...rest },
    ) => {
      if (!api.patch) throw Error('No API "patch" method provided');
      return api.patch({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...rest,
        id,
        changes,
      });
    };

    this.actions
      .UPD_ITEM = (
      _,
      { context: callerContext = {}, ...rest } = {},
    ) => {
      if (!api.update) throw Error('No API "update" method provided');
      return api.update({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...rest,
      });
    };

    this.actions
      .DELETE_ITEM = (
      _,
      { context: callerContext = {}, id, ...rest },
    ) => {
      if (!api.delete) throw Error('No API "delete" method provided');
      return api.delete({
        ...callerContext.state,
        parentId: getParentIdFromContext(callerContext),
        ...rest,
        id,
      });
    };

    return this;
  }
}
