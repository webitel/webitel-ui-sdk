import isEmpty from '../../../scripts/isEmpty.js';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule.js';

export default class QueryFiltersStoreModule extends BaseStoreModule {
  getters = {
    GET_FILTERS: (state, getters) =>
      Object.keys(state).reduce((filters, filterKey) => {
        const filterValue = getters.GET_FILTER(filterKey);
        return isEmpty(filterValue)
          ? filters
          : {
              ...filters,
              [filterKey]: filterValue,
            };
      }, {}),
    GET_FILTER: (state) => (filter) => {
      const { value, storedProp, multiple } = state[filter];
      if (multiple) return value.map((item) => item[storedProp]); // if arr, map
      if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
      return value; // else return val
    },
  };

  actions = {
    SET_FILTER: (context, { filter, value }) => {
      const { multiple, defaultValue } = context.state[filter];
      let newValue = value;
      if (newValue) {
        if (multiple && !Array.isArray(newValue)) newValue = [newValue];
      } else if (newValue === null || newValue === undefined)
        newValue = defaultValue;
      context.commit('SET_FILTER', { filter, value: newValue });
    },
    RESET_FILTERS: (context, payload) => {
      context.commit('RESET_FILTERS', payload);
    },
  };

  mutations = {
    SET_FILTER: (state, { filter, value }) => {
      state[filter].value = value;
    },
    RESET_FILTERS: (state, { excludeKeys = [] }) => {
      Object.keys(state).forEach((filter) => {
        if (!excludeKeys.includes(filter)) {
          state[filter].value = state[filter].defaultValue;
        }
      });
    },
  };

  /* FIXME REMOVE COMPLETELY AND USE GET_MODULE() INSERTION*/
  constructor({ state = {}, getters = {}, actions = {}, mutations = {} } = {}) {
    super();
    this.state = { ...this.state, ...state };
    this.getters = { ...this.getters, ...getters };
    this.actions = { ...this.actions, ...actions };
    this.mutations = { ...this.mutations, ...mutations };
  }
}
