import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';

export default class ApiStoreModule extends BaseStoreModule {
  generateAPIActions(api) {
    if (!api) throw new ReferenceError('pass API module!');
    this.actions
      .GET_LIST = (
      context,
      params = {},
    ) => this.api.getList({ ...context.state, ...params });
    this.actions
      .GET_ITEM = (
      context,
      params = {},
    ) => this.api.get({ ...context.state, ...params });
    this.actions
      .POST_ITEM = (context) => this.api.add(context.state);
    this.actions
      .PATCH_ITEM = (context, { id, changes }) => (
      this.api.patch({ ...context.state, id, changes })
    );
    this.actions
      .UPD_ITEM = (context) => this.api.update(context.state);
    this.actions
      .DELETE_ITEM = (context, id) => this.api.delete({ ...context.state, id });
    return this;
  }
}
