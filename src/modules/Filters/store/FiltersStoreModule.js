import mitt from 'mitt';

import isEmpty from '../../../scripts/isEmpty.js';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule.js';
import BaseFilterSchema from '../classes/BaseFilterSchema.js';
import FilterEvent from '../enums/FilterEvent.enum.js';

export default class FiltersStoreModule extends BaseStoreModule {
  state = {
    _emitter: mitt(),
  };

  getters = {
    ROUTER: (state, g, rootState) => {
      if (rootState.router === undefined) {
        console.warn(
          '"rootState.router" is needed for filters to work properly.' +
            ' Please, provide to root state, or setup it in filters module as getter "ROUTER"',
        );
      }
      return rootState.router;
    },

    _STATE_FILTER_NAMES: (state) => {
      return Object.values(state).reduce(
        (names, prop) =>
          prop.value || prop.name ? [...names, prop.name] : names,
        [],
      );
    },

    // get value of specific filter
    GET_FILTER: (state, getters) => (filterName) => {
      const filter = state[filterName];

      if (!filter) throw new Error(`Unknown filter: ${filterName}`);

      return filter.get({
        router: getters.ROUTER,
      });
    },

    // get all filters values
    GET_FILTERS: (state, getters) => () => {
      return getters._STATE_FILTER_NAMES.reduce((values, filterName) => {
        const filterValue = getters.GET_FILTER(filterName);
        return isEmpty(filterValue)
          ? values
          : {
              ...values,
              [filterName]: filterValue,
            };
      }, {});
    },
  };

  actions = {
    SET_FILTER: async (
      context,
      {
        name,
        value,
        silent = false, // if true, don't call ON_FILTER_SET event
      },
    ) => {
      const filter = context.state[name];

      await filter.set(value, {
        router: context.getters.ROUTER,
      });

      // upd reactivity
      context.commit('UPDATE_FILTER', {
        ...filter,
        value: context.getters.GET_FILTER(name),
      });

      if (!silent)
        await context.dispatch('EMIT', {
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
        await context.dispatch('SET_FILTER', {
          name,
          value,
          silent: true,
        });
      }
    },

    RESTORE_FILTERS: async (context) => {
      await Promise.allSettled(
        context.getters._STATE_FILTER_NAMES.map((name) => {
          return context.dispatch('RESTORE_FILTER', { name });
        }),
      );

      return context.dispatch('EMIT', {
        event: FilterEvent.RESTORED,
        payload: context.getters.GET_FILTERS(),
      });
    },

    RESET_FILTER: (context, { name }) => {
      const filter = context.state[name];

      return context.dispatch('SET_FILTER', {
        name,
        value: filter.defaultValue,
        silent: true,
      });
    },

    RESET_FILTERS: async (context) => {
      await Promise.allSettled(
        context.getters._STATE_FILTER_NAMES.map((name) => {
          return context.dispatch('RESET_FILTER', { name });
        }),
      );

      // clean up query params
      const router = context.getters.ROUTER;
      const query = Object.entries(router.currentRoute.query).reduce(
        (filteredQuery, [qKey, qValue]) => {
          if (context.state[qKey]) {
            return filteredQuery;
          }
          return { ...filteredQuery, [qKey]: qValue };
        },
        {},
      );

      await router.push({
        ...router.currentRoute,
        query,
      });

      return context.dispatch('EMIT', {
        event: FilterEvent.RESET,
        payload: context.getters.GET_FILTERS(),
      });
    },

    SUBSCRIBE: (context, { event, callback }) => {
      const subscribe = () => context.state._emitter.on(event, callback);
      if (Array.isArray(event)) event.forEach((e) => subscribe(e, callback));
      else subscribe(event, callback);
    },

    FLUSH_SUBSCRIBERS: (context) => {
      return context.state._emitter.all.clear();
    },

    EMIT: async (context, { event, payload }) => {
      const wildcardListeners = context.state._emitter.all.get('*');
      const eventListeners = context.state._emitter.all.get(event);

      const listeners = [
        ...(wildcardListeners || []),
        ...(eventListeners || []),
      ];

      if (!listeners) {
        console.info(`No listeners for ${event} event`);
        return;
      }

      for (const listener of listeners) {
        await listener({ event, payload });
      }
    },
  };

  mutations = {
    UPDATE_FILTER: (state, filter) => {
      state[filter.name] = filter;
    },
  };

  addFilter(filter) {
    const setup = (filter) => {
      this.state[filter.name] = new BaseFilterSchema(filter);

      this.getters[`FILTER_${filter.name}`] = (state, getters) => {
        // if is used as watcher for getter to recompute,
        // because GET_FILTER is function ==> it's not reactive
        if (state[filter.name].value) {
        }
        return getters.GET_FILTER(filter.name);
      };
    };

    if (Array.isArray(filter)) filter.forEach((f) => setup(f));
    else setup(filter);

    return this;
  }
}
