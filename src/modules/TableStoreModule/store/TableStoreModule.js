import {
  queryToSortAdapter,
  SortSymbols,
  sortToQueryAdapter,
} from '../../../scripts/sortQueryAdapters';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

export default class TableStoreModule extends BaseStoreModule {
  state = {
    headers: [],
    dataList: [],
    error: {},
    isLoading: false,
    isNextPage: false,
  };

  getters = {
    GET_FILTERS: (state, getters) => getters['filters/GET_FILTERS'],

    // required fields to send as "fields" param with GET_LIST
    REQUIRED_FIELDS: () => ['id'],

    FIELDS: (state, getters) => {
      const filtersFields = getters.GET_FILTERS.filters;

      const defaultFields = state.headers.filter((header) => header.show)
      .map((header) => header.field);

      const getFieldsByFieldValues = (values) => {
        values.map((passedValue) => state.headers.find(({ value }) => passedValue ===
          value).field);
      };

      return [
        ...new Set(filtersFields
          ? getFieldsByFieldValues(filtersFields)
          : defaultFields),
      ].concat(getters.REQUIRED_FIELDS);
    },

    // main GET_LIST params collector
    GET_LIST_PARAMS: (state, getters) => (overrideFilters) => {
      const filters = getters.GET_FILTERS;
      const fields = getters.FIELDS;

      return {
        ...filters,
        fields,
        ...overrideFilters,
      };
    },
  };

  actions = {
    // HOOKS TO BE OVERRIDEN, IF NEEDED
    BEFORE_SET_DATA_LIST_HOOK: (context, { items, next }) => ({ items, next }),
    AFTER_SET_DATA_LIST_HOOK: (context, { items, next }) => ({ items, next }),

    LOAD_DATA_LIST: async (context, query) => {
      const params = context.getters.GET_LIST_PARAMS(query);
      try {
        context.commit('SET_LOADING', true);
        let {
          items = [],
          next = false,
        } = await context.dispatch('api/GET_LIST', { context, params });
        /* we should set _isSelected property to all items in tables cause their checkbox selection
        * is based on this property. Previously, this prop was set it api consumers, but now
        * admin-specific were replaced by webitel-sdk consumers and i supposed it will be
        * weird to set this property in each api file through defaultListObject */
        items = items.map((item) => ({ ...item, _isSelected: false }));
        const afterHook = await context.dispatch('BEFORE_SET_DATA_LIST_HOOK', {
          items,
          next,
        });
        context.commit('SET_DATA_LIST', afterHook.items);
        context.commit('SET_IS_NEXT', afterHook.next);
        context.dispatch('AFTER_SET_DATA_LIST_HOOK', afterHook);
      } catch (err) {
        console.error(err);
        context.commit('SET_ERROR', err);
      } finally {
        context.commit('SET_LOADING', false);
      }
    },
    SET_SIZE: async (context, size) => {
      context.commit('SET_SIZE', size);
      await context.dispatch('RESET_PAGE');
    },
    SET_SEARCH: async (context, search) => {
      context.commit('SET_SEARCH', search);
      await context.dispatch('RESET_PAGE');
    },
    NEXT_PAGE: (context) => {
      const page = context.state.page + 1;
      context.commit('SET_PAGE', page);
      context.dispatch('LOAD_DATA_LIST');
    },
    PREV_PAGE: (context) => {
      if (context.state.page > 1) {
        const page = context.state.page - 1;
        context.commit('SET_PAGE', page);
        context.dispatch('LOAD_DATA_LIST');
      }
    },
    RESET_PAGE: (context) => {
      const page = 1;
      context.commit('SET_PAGE', page);
    },
    RESTORE_FIELDS_FROM_FILTER: (context, { value }) => {
      const headers = context.state.headers.map((header) => ({
        ...header,
        show: value.includes(header.value),
      }));
      return context.dispatch('SET_HEADERS', headers);
    },
    SET_HEADERS: (context, headers) => context.commit('SET_HEADERS', headers),
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
    RESTORE_SORT_FROM_FILTER: (context, { value }) => {
      const sort = queryToSortAdapter(value.slice(0, 1));
      const field = sort ? value.slice(1) : value;
      return context.dispatch('UPDATE_HEADER_SORT', {
        header: { field },
        nextSortOrder: sort,
      });
    },
    UPDATE_HEADER_SORT: (context, { header, nextSortOrder }) => {
      const headers = context.state.headers.map((oldHeader) => {
        return {
          ...oldHeader,
          sort: oldHeader.field === header.field
            ? nextSortOrder
            : SortSymbols.NONE,
        };
      });
      context.commit('SET_HEADERS', headers);
    },
    PATCH_ITEM_PROPERTY: async (context, {
      item, index, prop, value,
    }) => {
      await context.commit('PATCH_ITEM_PROPERTY', { index, prop, value });
      const id = item?.id || context.state.dataList[index].id;
      const changes = { [prop]: value };
      try {
        await context.dispatch('api/PATCH_ITEM', { context, id, changes });
        context.commit('PATCH_ITEM_PROPERTY', {
          item, index, prop, value,
        });
      } catch {
        context.dispatch('LOAD_DATA_LIST');
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
      }
    },
    DELETE_SINGLE: async (context, { id }) => {
      try {
        await context.dispatch('api/DELETE_ITEM', { context, id });
      } catch (err) {
        throw err;
      }
    },
    DELETE_BULK: async (
      context,
      deleted,
    ) => Promise.allSettled(deleted.map((item) => context.dispatch('DELETE_SINGLE', item))),
    // REMOVE_ITEM: async (context, index) => {
    //   const id = context.state.dataList[index].id;
    //   context.commit('REMOVE_ITEM', index);
    //   try {
    //     await context.dispatch('DELETE_ITEM', id);
    //   } catch (err) {
    //     throw err;
    //   }
    // },
  };

  mutations = {
    SET_DATA_LIST: (state, items) => {
      state.dataList = items;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
    },
    SET_SEARCH: (state, search) => {
      state.search = search;
    },
    SET_PAGE: (state, page) => {
      state.page = page;
    },
    SET_IS_NEXT: (state, next) => {
      state.isNextPage = next;
    },
    SET_HEADERS: (state, headers) => {
      state.headers = headers;
    },
    PATCH_ITEM_PROPERTY: (state, { index, prop, value }) => {
      state.dataList[index][prop] = value;
    },
    SET_LOADING: (state, value) => {
      state.isLoading = value;
    },
    SET_ERROR: (state, value) => {
      state.error = value;
    },
  };

  constructor({ headers = [] }) {
    super();
    this.state.headers = headers;
  }
}
