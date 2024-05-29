import set from 'lodash/set.js';
import {
  queryToSortAdapter,
  sortToQueryAdapter,
} from '../../../scripts/sortQueryAdapters.js';
import BaseStoreModule
  from '../../../store/BaseStoreModules/BaseStoreModule.js';
import FilterEvent from '../../Filters/enums/FilterEvent.enum.js';

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

    // FIXME: maybe move to filters module?
    FILTERS: (state, getters) => getters['filters/GET_FILTERS'],

    FIELDS: (state) => {
      const fields = state.headers.reduce((fields, { show, field }) => {
        if (show) return [...fields, field];
        return fields;
      }, []);

      return [...new Set(['id', ...fields])];
    },

    // main GET_LIST params collector
    GET_LIST_PARAMS: (state, getters) => (overrides) => {
      const filters = getters.FILTERS();
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
    // FIXME: maybe move to filters module?
    SET_FILTER: (
      context,
      payload,
    ) => context.dispatch('filters/SET_FILTER', payload),

    // FIXME: maybe move to filters module?
    ON_FILTER_EVENT: async (context, { event, payload }) => {
      switch (event) {
        case FilterEvent.RESTORED:
          return context.dispatch('HANDLE_FILTERS_RESTORE', payload);
        case FilterEvent.FILTER_SET:
          return context.dispatch('HANDLE_FILTER_SET', payload);
        default:
          throw new Error(`Unknown filter event: ${event}`);
      }
    },

    // FIXME: maybe move to filters module?
    HANDLE_FILTERS_RESTORE: (context) => {
      return context.dispatch('LOAD_DATA_LIST');
    },

    // FIXME: maybe move to filters module?
    HANDLE_FILTER_SET: async (context, payload) => {
      if (payload.name === 'fields') {
        await context.dispatch('HANDLE_FIELDS_CHANGE', payload);
      } else if (payload.name === 'sort') {
        await context.dispatch('HANDLE_SORT_CHANGE', payload);
      }

      if (context.getters.FILTERS().page && payload.value !== 'page') {
        await context.dispatch('SET_FILTER', {
          name: 'page',
          value: 1,
          silent: true,
        });
      }

      return context.dispatch('LOAD_DATA_LIST');
    },

    // FIXME: maybe move to filters module?
    HANDLE_FIELDS_CHANGE: (context, payload) => {
      const headers = context.state.headers.map((header) => ({
        ...header,
        show: payload.value.includes(header.value),
      }));

      context.commit('SET', { path: 'headers', value: headers });
    },

    // FIXME: maybe move to filters module?
    HANDLE_SORT_CHANGE: (context, payload) => {
      const nextSort = queryToSortAdapter(payload.value?.slice(0, 1) || '');
      const field = nextSort ? payload.value.slice(1) : payload.value;

      const headers = context.state.headers.map(({
                                                   sort: currentSort,
                                                   ...header
                                                 }) => {
        let sort;

        if (field) {
          sort = field === header.field ? nextSort : currentSort;
        } else {
          sort = nextSort; // null
        }

        return { ...header, sort };
      });

      context.commit('SET', { path: 'headers', value: headers });
    },

    LOAD_DATA_LIST: async (context, query) => {
      context.commit('SET', { path: 'isLoading', value: true });
      context.commit('SET', { path: 'isNextPage', value: false }); // [WTEL-3560]

      const params = context.getters.GET_LIST_PARAMS(query);
      try {
        let {
          items = [],
          next = false,
        } = await context.dispatch('api/GET_LIST', { context, params });

        context.commit('SET', { path: 'dataList', value: items });
        context.commit('SET', { path: 'isNextPage', value: next });
      } catch (err) {
        context.commit('SET', { path: 'error', value: err });
        throw err;
      } finally {
        context.commit('SET', { path: 'isLoading', value: false });
      }
    },

    // FIXME: maybe move to filters module?
    SORT: (context, { header, nextSortOrder }) => {
      const sort = nextSortOrder
        ? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
        : nextSortOrder;
      return context.dispatch('SET_FILTER', {
        name: 'sort',
        value: sort,
      });
    },

    PATCH_ITEM_PROPERTY: async (context, {
      item: _item, index, prop, value,
    }) => {
      const item = _item || context.state.dataList[index];

      const { id, etag } = item;

      context.commit('SET', {
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
        if (!context.state.dataList.length && context.getters.FILTERS.page >
          1) {
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
