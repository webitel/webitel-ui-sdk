// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';
// import queryFilters from '../queryFilters';
import QueryFiltersStoreModule from '../QueryFiltersStoreModule.js';

const valueFilter = 'search';
const arrayFilter = 'agent';
const state = {
  [valueFilter]: {
    value: 'jest',
    defaultValue: '',
  },
  [arrayFilter]: {
    value: [{ id: 1 }],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
};

describe('QueryFiltersStoreModule getters', () => {
  let module;
  beforeEach(() => {
    module = new QueryFiltersStoreModule().getModule();
  });
  it('GET_FILTER: single value filter', () => {
    expect(module.getters.GET_FILTER(state)(valueFilter))
    .toEqual('jest');
  });
  it('GET_FILTER: array value filter', () => {
    expect(module.getters.GET_FILTER(state)(arrayFilter))
    .toEqual([1]);
  });
  it('GET_FILTERS filters aggregator', () => {
    const { GET_FILTER } = module.getters;
    module.getters.GET_FILTER = vi.fn((filter) => GET_FILTER(state)(filter));
    expect(module.getters.GET_FILTERS(state, module.getters))
    .toEqual({ agent: [1], search: 'jest' });
  });
});

describe('QueryFiltersStoreModule actions', () => {
  const context = {
    state: { ...state },
    commit: vi.fn(),
  };
  const module = new QueryFiltersStoreModule().getModule();
  it('SET_FILTER: single value filter', () => {
    const filter = { filter: valueFilter, value: '3' };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit).toHaveBeenCalledWith('SET_FILTER', filter);
  });
  it('SET_FILTER: array value filter', () => {
    const filter = { filter: 'agent', value: [{ id: 3 }] };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit).toHaveBeenCalledWith('SET_FILTER', filter);
  });
  it('SET_FILTER: array value filter with single object value', () => {
    const filter = { filter: arrayFilter, value: { id: 3 } };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit)
    .toHaveBeenCalledWith('SET_FILTER', {
      filter: filter.filter,
      value: [filter.value],
    });
  });
  it('SET_FILTER: sets array value filter with null value to defaultValue', () => {
    const filter = { filter: arrayFilter, value: null };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit)
    .toHaveBeenCalledWith('SET_FILTER', { filter: filter.filter, value: [] });
  });
  it('SET_FILTER: sets "false" value filter', () => {
    const filter = { filter: valueFilter, value: false };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit)
    .toHaveBeenCalledWith('SET_FILTER', {
      filter: filter.filter,
      value: false,
    });
  });
  it('calls RESET_FILTERS mutation on RESET_FILTERS action call', () => {
    module.actions.RESET_FILTERS(context);
    expect(context.commit).toHaveBeenCalledWith('RESET_FILTERS');
  });
});

describe('QueryFiltersStoreModule mutations', () => {
  const module = new QueryFiltersStoreModule().getModule();
  it('correctly mutates state at RESET_FILTERS call', () => {
    expect(Object.values(state)
    .every((filter) => filter.value === filter.defaultValue)).toBeFalsy();
    module.mutations.RESET_FILTERS(state);
    expect(Object.values(state)
    .every((filter) => filter.value === filter.defaultValue)).toBeTruthy();
  });
});
