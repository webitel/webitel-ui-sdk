import deepEqual from 'deep-equal';
import debounce from '../../../scripts/debounce';
import isEmpty from '../../../scripts/isEmpty';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';

const SET_FILTER_SOURCE = Object.freeze({
  RESTORE: 'restore', // when filter is restored at session start
  DEFAULT: 'default',
});

export default class FiltersStoreModule extends BaseStoreModule {
  getters = {
    ROUTER: () => console.error('setup ROUTER getter for filters store'),
    TABLE_NAMESPACE: () => console.error('setup TABLE_NAMESPACE getter for filters store'),

    // get value of specific filter
    GET_FILTER: (state) => (filter) => {
      if (!state[filter]) return null;
      const { value, storedProp, multiple } = state[filter];
      if (multiple) return value.map((item) => item[storedProp]); // if arr, map
      if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
      return value; // else return val
    },

    // get all filters values
    GET_FILTERS: (state, getters) => Object.keys(state)
    .reduce((filters, filterKey) => {
      const filterValue = getters.GET_FILTER(filterKey);
      return isEmpty(filterValue) ? filters : {
        ...filters,
        [filterKey]: filterValue,
      };
    }, {}),

    // get value of filter from query string by query key
    GET_VALUE_FROM_QUERY: (state, getters) => ({ filterQuery }) => (
      getters.ROUTER.currentRoute.value.query[filterQuery]
    ),
  };

  actions = {
    SET_FILTER: async (context, {
      filter,
      value,
      source = SET_FILTER_SOURCE.DEFAULT,
      silent = false, // if true, don't call ON_FILTER_SET event
    }) => {
      const { multiple, defaultValue } = context.state[filter];

      let newValue = value;

      if (value) {
        if (multiple && !Array.isArray(value)) newValue = [value];
      } else if (value === null || value === undefined) {
        newValue = defaultValue;
      }

      await context.dispatch('SET_VALUE_TO_QUERY', {
        filterQuery: filter,
        value,
        storedProp: context.state[filter].storedProp,
      });
      context.commit('SET_FILTER', { filter, value: newValue });

      if (source !== SET_FILTER_SOURCE.RESTORE && filter !== 'page') {
        await context.dispatch('SET_FILTER', {
          filter: 'page',
          value: 1,
          silent: true,
        });
      }

      if (!silent) await context.dispatch('ON_FILTER_SET', { filter, value });
    },
    SET_VALUE_TO_QUERY: async (
      context,
      { filterQuery, value, storedProp = 'id' },
    ) => {
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

      return context.dispatch('CHANGE_ROUTE_QUERY', ({
        value: newValue,
        filterQuery,
      }));
    },

    CHANGE_ROUTE_QUERY: (context, { value, filterQuery }) => {
      if (deepEqual(context.getters.GET_VALUE_FROM_QUERY({ filterQuery }), value)) return;
      const query = { ...context.getters.ROUTER.currentRoute.value.query };
      query[filterQuery] = value;
      // eslint-disable-next-line consistent-return
      return context.getters.ROUTER.replace({
        name: context.getters.ROUTER.currentRoute.value.name,
        query,
      });
    },

    RESTORE_FILTER: async (context, { filter }) => {
      const query = context.getters.GET_VALUE_FROM_QUERY({ filterQuery: filter });
      // note: restore fn may still return value even if there's no query value
      // from localStorage, for instance
      const value = context.state[filter].restore
        ? context.state[filter].restore({ query })
        : query;
      if (value) {
        if (filter
          === 'sort') await context.dispatch('RESTORE_SORT', { value });
        else if (filter
          === 'fields') await context.dispatch('RESTORE_FIELDS', { value });
        await context.dispatch('SET_FILTER', ({
          filter,
          value,
          source: SET_FILTER_SOURCE.RESTORE,
        }));
        return true;
      }
      return false;
    },

    RESTORE_FILTERS: async (context) => {
      const restores = [];
      for (const filter of Object.keys(context.state)) {
        // collect restores in order to check if there were actually any restores
        // empty restore returns "false"
        const result = await context.dispatch('RESTORE_FILTER', { filter });
        restores.push(result);
      }

      // if no filters to restore, call LOAD_LIST manually
      if (restores.every((restore) => restore === false)) {
        context.dispatch('LOAD_DATA_LIST');
      }
    },

    RESET_FILTERS: (context) => Promise.allSettled(Object.keys(context.state)
    .map((filter) => {
      return context.dispatch('SET_FILTER', {
        filter,
        value: context.state[filter].defaultValue,
      });
    })),

    ON_FILTER_SET: (
      context,
      { filter, value },
    ) => context.dispatch('LOAD_DATA_LIST'),

    LOAD_DATA_LIST: (context) => context.dispatch(
      `${context.getters.TABLE_NAMESPACE}/LOAD_DATA_LIST`,
      { filters: context.getters.GET_FILTERS },
      { root: true },
    ),
    RESTORE_SORT: (context, { value }) => context.dispatch(
      `${context.getters.TABLE_NAMESPACE}/RESTORE_SORT_FROM_FILTER`,
      { value },
      { root: true },
    ),
    RESTORE_FIELDS: (context, { value }) => context.dispatch(
      `${context.getters.TABLE_NAMESPACE}/RESTORE_FIELDS_FROM_FILTER`,
      { value },
      { root: true },
    ),
  };

  mutations = {
    SET_FILTER: (state, { filter, value }) => {
      state[filter].value = value;
    },
  };
}
