import set from 'lodash/set';
import {
  queryToSortAdapter,
  sortToQueryAdapter,
} from '../../../scripts/sortQueryAdapters';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';
import FilterEvent from '../../Filters/enums/FilterEvent.enum';
import FilterSearch from '../../QueryFilters/components/filter-search.vue';

export default class TableStoreModule extends BaseStoreModule {
  state = {
    headers: [],
    dataList: [],
    selected: [],
    error: {},
    isLoading: false,
    isNextPage: false,
  };

  getters = {
    PARENT_ID: () => null, // override me

    // FIXME
    FILTERS: (state, getters) => getters['filters/GET_FILTERS'], // override me, if necessary

    FIELDS: (state) => {
      const fields = state.headers.reduce(fields, ({ show }) => {
        if (show) return [...fields, show];
        return fields;
      }, []);

      return [...new Set(['id', ...fields])];
    },

    // main GET_LIST params collector
    GET_LIST_PARAMS: (state, getters) => (overrides) => {
      const filters = getters.FILTERS;
      const fields = getters.FIELDS;
      const parentId = getters.PARENT_ID;

      return {
        parentId,
        ...filters,
        fields,
        ...overrides,
      };
    },
  };

  actions = {
    // FIXME override me, if necessary
    SET_FILTER: (
      context,
      payload,
    ) => context.dispatch('filters/SET_FILTER', payload),

    // FIXME
    ON_FILTER_EVENT: async (context, { event, payload }) => {
      switch (event) {
        case FilterEvent.RESTORED:
          return context.dispatch('LOAD_DATA_LIST');

        case FilterEvent.FILTER_SET:
          if (payload.name === 'fields') {
            const headers = context.state.headers.map((header) => ({
              ...header,
              show: payload.value.includes(header.value),
            }));
            context.commit('SET', { path: 'headers', value: headers });
          }

          if (payload.name === 'sort') {
            const nextSort = queryToSortAdapter(payload.value.slice(0, 1));
            const field = nextSort ? payload.value.slice(1) : payload.value;

            const headers = context.state.headers.map(({
                                                         sort: currentSort,
                                                         ...header
                                                       }) => {
              const sort = field === header.field ? nextSort : currentSort;
              return { ...header, sort };
            });

            if (payload.value !== 'page') {
              await context.dispatch('filters/SET_FILTER', {
                name: 'page',
                value: 1,
                silent: true,
              });
              }
            }

            context.commit('SET', { path: 'headers', value: headers });

          return context.dispatch('LOAD_DATA_LIST');
        default:
          throw new Error(`Unknown filter event: ${event}`);
      }
    },

    // FIXME
    HANDLE_FILTERS_RESTORE: () => {},

    // FIXME
    HANDLE_FILTER_SET: () => {},

    // FIXME
    HANDLE_FIELDS_CHANGE: () => {},

    // FIXME
    HANDLE_SORT_CHANGE: () => {},

    LOAD_DATA_LIST: async (context, query) => {
      context.commit('SET_LOADING', true);
      context.commit('SET_IS_NEXT', false); // [WTEL-3560]

      const params = context.getters.GET_LIST_PARAMS(query);
      try {
        let {
          items = [],
          next = false,
        } = await context.dispatch('api/GET_LIST', { context, params });

        context.commit('SET_DATA_LIST', items);
        context.commit('SET_IS_NEXT', next);
      } catch (err) {
        context.commit('SET_ERROR', err);
      } finally {
        context.commit('SET_LOADING', false);
      }
    },

    SORT: async (context, { header, nextSortOrder }) => {
      const sort = nextSortOrder
        ? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
        : nextSortOrder;
      await context.dispatch('filters/SET_FILTER', {
        filter: 'sort',
        value: sort,
      });
      await context.dispatch('UPDATE_HEADER_SORT', { header, nextSortOrder });
    },

    PATCH_ITEM_PROPERTY: async (context, {
      item: _item, index, prop, value,
    }) => {
      const item = _item || context.state.dataList[index];

      const { id, etag } = item;

      context.commit('PATCH_ITEM_PROPERTY', {
        path: `dataList[${index}].${prop}`,
        value,
      });

      const changes = { [prop]: value };

      try {
        await context.dispatch('api/PATCH_ITEM', {
          context,
          id,
          etag,
          changes,
        });
      } catch (err) {
        await context.dispatch('LOAD_DATA_LIST');
        throw err;
      }
    },

    DELETE: async (context, deleted) => {
      let action = 'DELETE_SINGLE';
      if (Array.isArray(deleted)) {
        if (deleted.length) action = 'DELETE_BULK';
        else action = 'DELETE_ALL';
      }
      try {
        await context.dispatch(action, deleted);
      } catch (err) {
        throw err;
      } finally {
        await context.dispatch('LOAD_DATA_LIST');

        /* if no items on current page after DELETE, move to prev page [WTEL-3793] */
        if (!context.items.length && context.getters.FILTERS.page > 1) {
          await context.dispatch('SET_FILTER', {
            name: 'page',
            value: context.getters.FILTERS.page - 1,
          });
        }
      }
    },

    DELETE_SINGLE: async (context, { id, etag }) => {
      try {
        await context.dispatch('api/DELETE_ITEM', { context, id, etag });
      } catch (err) {
        throw err;
      }
    },

    DELETE_BULK: async (
      context,
      deleted,
    ) => Promise.allSettled(deleted.map((item) => context.dispatch('DELETE_SINGLE', item))),

    SET_SELECTED: (context, selected) => {
      context.commit('SET', { path: 'selected', value: selected });
    },
  };

  mutations = {
    SET: (state, { path, value }) => {
      return set(state, path, value);
    },
  };

  constructor({ headers = [] }) {
    super();
    this.state.headers = headers;
  }
}

new TableStoreModule().setExtension(FiltersSm.EXT).getModule({

});
