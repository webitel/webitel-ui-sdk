import Emitter from 'tiny-emitter';
import isEmpty from '../../../scripts/isEmpty';
import BaseStoreModule from '../../../store/BaseStoreModules/BaseStoreModule';
import FilterEvent from '../enums/FilterEvent.enum';

export default class FiltersStoreModule extends BaseStoreModule {
  state = {
    _emitter: new Emitter(),
  };

  getters = {
    _STATE_FILTER_NAMES: (state) => Object.keys(state)
    .filter((key) => !key.startsWith('_')),

    // get value of specific filter
    GET_FILTER: (state) => (filterName) => {
      const filter = state[filterName];
      if (!filter) throw new Error(`Unknown filter: ${filterName}`);

      return filter.get();
    },

    // get all filters values
    GET_FILTERS: (state, getters) => context.getters._STATE_FILTER_NAMES
    .reduce((values, filterName) => {
      const filterValue = getters.GET_FILTER(filterName);
      return isEmpty(filterValue) ? filters : {
        ...values,
        [filterName]: filterValue,
      };
    }, {}),
  };

  actions = {
    SET_FILTER: async (context, {
      name,
      value,
      silent = false, // if true, don't call ON_FILTER_SET event
    }) => {
      const filter = context.state[name];

      await filter.set(value);

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
      const value = filter.restore();

      if (value) {
        await context.dispatch('SET_FILTER', ({
          name,
          value,
        }));
        return true;
      }
      return false;
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
      })
    ),

    SUBSCRIBE: (context, { event, callback }) => {
      return context.state._emitter.on(event, callback);
    },

    UNSUBSCRIBE: (context, { event, callback }) => {
      return context.state._emitter.off(event, callback);
    },

    EMIT: (context, { event, payload }) => {
      return context.state._emitter.emit(event, payload);
    },
  };
}
