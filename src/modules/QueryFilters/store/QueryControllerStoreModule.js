import deepEqual from 'deep-equal';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

export default class QueryControllerStoreModule extends BaseStoreModule {
  getters = {
    GET_VALUE_FROM_QUERY: (state) => ({ filterQuery }) => state.router.currentRoute.query[filterQuery],
  }

  actions = {
    // OVERRIDE ME
    // eslint-disable-next-line no-unused-vars
    BEFORE_CHANGE_ROUTE_QUERY_HOOK: (context, { query, filterQuery, value }) => query,
    // OVERRIDE ME
    AFTER_CHANGE_ROUTE_QUERY_HOOK: (context, { query }) => query,
    _CHANGE_ROUTE_QUERY: async (context, { filterQuery, value }) => {
      try {
        const { router } = context.state;
        let query = { ...router.currentRoute.query };
        query[filterQuery] = value;
        query = await context.dispatch('BEFORE_CHANGE_ROUTE_QUERY_HOOK', { query, filterQuery, value });
        await router.replace({
          name: router.currentRoute.name,
          query,
        });
        await context.dispatch('AFTER_CHANGE_ROUTE_QUERY_HOOK', { query });
      } catch (err) {
        throw err;
      }
    },
    SET_VALUE_TO_QUERY: async (
      context,
      { filterQuery, value, storedProp = 'id' },
    ) => {
      try {
        let newValue = '';
        if (Array.isArray(value)) {
          if (value.length && typeof value[0] !== 'object') {
            newValue = value;
          } else {
            newValue = value.map((item) => item[storedProp]);
          }
        } else if (typeof value === 'object' && value !== null) {
          newValue = value[storedProp];
        } else {
          newValue = value;
        }
        if (!deepEqual(context.state.router.currentRoute.query[filterQuery], newValue)) {
          await context.dispatch('_CHANGE_ROUTE_QUERY', {
            value: newValue,
            filterQuery,
          });
        }
      } catch (err) {
        throw err;
      }
    },
  };

  constructor({ router } = {}) {
    super();
    if (!router) throw new Error('Pass router object to QueryController Store Module');
    this.state.router = router;
  }
}
