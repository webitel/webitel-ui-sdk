import mitt from 'mitt';
import isEmpty from '../../../scripts/isEmpty';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';
import BaseFilterSchema from '../classes/BaseFilterSchema';
import FilterEvent from '../enums/FilterEvent.enum';

export default class FiltersStoreModule extends BaseStoreModule {
  state = {
    _emitter: mitt(),
    _requireRouter: false,
  };

  getters = {
    ROUTER: (state, g, rootState) => {
      if (!state._requireRouter) return null;
      if (rootState.router === undefined) {
        throw new Error('"rootState.router" is needed for filters to work properly.' +
          ' Please, provide to root state, or setup it in filters module as getter "ROUTER"');
      }
      return rootState.router;
    },

    _STATE_FILTER_NAMES: (state) => {
      return Object.values(state)
      .reduce((names, prop) => prop.value || prop.name
        ? [...names, prop.name]
        : names, []);
    },

    // get value of specific filter
    GET_FILTER: (state, getters) => (filterName) => {
      const filter = state[filterName];

      if (!filter) throw new Error(`Unknown filter: ${filterName}`);

      if (state._requireRouter && !getters.ROUTER) {
        throw new Error(`Router is required for filter: ${filterName}`);
      }

      return filter.get({
        router: getters.ROUTER,
      });
    },

    // get all filters values
    GET_FILTERS: (state, getters) => () => {
      return getters._STATE_FILTER_NAMES
      .reduce((values, filterName) => {
        const filterValue = getters.GET_FILTER(filterName);
        return isEmpty(filterValue) ? values : {
          ...values,
          [filterName]: filterValue,
        };
      }, {});
    },
  };

  actions = {
    SET_FILTER: async (context, {
      name,
      value,
      silent = false, // if true, don't call ON_FILTER_SET event
    }) => {
      const filter = context.state[name];

      await filter.set(value, {
        router: context.getters.ROUTER,
      });

      // upd reactivity
      context.commit('UPDATE_FILTER', {
        ...filter,
        value: context.getters.GET_FILTER(name),
      });

      if (!silent) await context.dispatch('EMIT', {
        event: FilterEvent.FILTER_SET,
        payload: {
          name,
          value: context.getters.GET_FILTER(name),
        },
      });
    },

    RESTORE_FILTER: async (context, { name }) => {
      const filter = context.state[name];
      const value = filter.restore({
        router: context.getters.ROUTER,
      });

      if (value) {
        await context.dispatch('SET_FILTER', ({
          name,
          value,
          silent: true,
        }));
      }
    },

    RESTORE_FILTERS: async (context) => {
      await Promise.allSettled(context.getters._STATE_FILTER_NAMES.map((name) => {
        return context.dispatch('RESTORE_FILTER', { name });
      }));

      return context.dispatch('EMIT', {
        event: FilterEvent.RESTORED,
        payload: context.getters.GET_FILTERS,
      });
    },

    RESET_FILTERS: (context) => Promise.allSettled(
      context.getters._FILTER_NAMES.map((name) => {
        const filter = context.state[name];

        return context.dispatch('SET_FILTER', {
          filter,
          value: filter.defaultValue,
        });
      }),
    ),

    SUBSCRIBE: (context, { event, callback }) => {
      const subscribe = () => context.state._emitter.on(event, callback);
      if (Array.isArray(event)) event.forEach((e) => subscribe(e, callback));
      else subscribe(event, callback);
    },

    FLUSH_SUBSCRIBERS: (context) => {
      return context.state._emitter.off('*');
    },

    EMIT: async (context, { event, payload }) => {
      return new Promise(async (resolve, reject) => {
        const listeners = context.state._emitter.all.get(event);

        if (!listeners) {
          console.info(`No listeners for ${event} event`);
          resolve();
        }

        try {
          for (const listener of listeners) {
            await listener({ event, payload });
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
  };

  mutations = {
    UPDATE_FILTER: (state, filter) => {
      state[filter.name] = filter;
    },
  };

  addFilter(filter) {
    const setup = (filter) => {
      const stateFilter = new BaseFilterSchema(filter);
      if (stateFilter.requireRouter) this.state._requireRouter = true;
      this.state[filter.name] = stateFilter;
    };

    if (Array.isArray(filter)) filter.forEach((f) => setup(f));
    else setup(filter);

    return this;
  }
};
