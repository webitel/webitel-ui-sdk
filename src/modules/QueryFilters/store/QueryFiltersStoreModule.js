import isEmpty from '../../../scripts/isEmpty';

export default class QueryFiltersStoreModule {
  namespaced = true;

  state = {}

  getters = {
    GET_FILTERS: (state, getters) => Object.keys(state)
      .reduce((filters, filterKey) => {
        const filterValue = getters.GET_FILTER(filterKey);
        return isEmpty(filterValue) ? filters : { ...filters, [filterKey]: filterValue };
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
      } else {
        newValue = defaultValue;
      }
      context.commit('SET_FILTER', { filter, value: newValue });
    },
    RESET_FILTERS: (context) => {
      context.commit('RESET_FILTERS');
    },
  };

  mutations = {
    SET_FILTER: (state, { filter, value }) => {
      state[filter].value = value;
    },
    RESET_FILTERS: (state) => {
      Object.keys(state).forEach((filter) => {
        state[filter].value = state[filter].defaultValue;
      });
    },
  };

  constructor({ state = {} } = {}) {
    this.state = state;
  }

  getModule({
              namespaced, getters, actions, mutations,
            } = {}) {
    return {
      state: this.state,
      getters: { ...this.getters, ...getters },
      actions: { ...this.actions, ...actions },
      mutations: { ...this.mutations, ...mutations },
      namespaced: typeof namespaced === 'boolean' ? namespaced : this.namespaced,
    };
  }
}
