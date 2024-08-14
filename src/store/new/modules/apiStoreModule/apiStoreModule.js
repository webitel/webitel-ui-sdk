const getParentIdFromContext = (context) => (
  context?.getters?.PARENT_ID || context?.state?.parentId
);

const state = () => ({
  api: null,
});

const getters = {};

const actions = {
  GET_LIST: (
    apiContext,
    { context: callerContext = {}, params = {} },
  ) => {
    if (!apiContext.state.api.getList) throw Error('No API "getList" method provided');
    return apiContext.state.api.getList({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...params,
    });
  },

  GET_ITEM: (
    apiContext,
    { context: callerContext = {}, params = {} } = {},
  ) => {
    if (!apiContext.state.api.get) throw Error('No API "get" method provided');
    return apiContext.state.api.get({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...params,
    });
  },

  POST_ITEM: (
    apiContext,
    { context: callerContext = {}, ...rest } = {},
  ) => {
    if (!apiContext.state.api.add) throw Error('No API "add" method provided');
    return apiContext.state.api.add({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...rest,
    });
  },

  UPD_ITEM: (
    apiContext,
    { context: callerContext = {}, ...rest } = {},
  ) => {
    if (!apiContext.state.api.update) throw Error('No API "update" method provided');
    return apiContext.state.api.update({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...rest,
    });
  },

  PATCH_ITEM: (
    apiContext,
    { context: callerContext = {}, id, changes, ...rest },
  ) => {
    if (!apiContext.state.api.patch) throw Error('No API "patch" method provided');
    return apiContext.state.api.patch({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...rest,
      id,
      changes,
    });
  },

  DELETE_ITEM: (
    apiContext,
    { context: callerContext = {}, id, ...rest },
  ) => {
    if (!apiContext.state.api.delete) throw Error('No API "delete" method provided');
    return apiContext.state.api.delete({
      ...callerContext.state,
      parentId: getParentIdFromContext(callerContext),
      ...rest,
      id,
    });
  },
};

const mutations = {};

export default () => ({
  state: state(),
  getters,
  actions,
  mutations,
});
