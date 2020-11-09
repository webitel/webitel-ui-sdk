// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';
import queryFilters from '../queryFilters';

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

describe('queryFilters getters', () => {
  let module;
  beforeEach(() => {
    module = queryFilters();
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
    module.getters.GET_FILTER = jest.fn((filter) => GET_FILTER(state)(filter));
    expect(module.getters.GET_FILTERS(state, module.getters))
      .toEqual({ agent: [1], search: 'jest' });
  });
});

describe('queryFilters actions', () => {
  const context = {
    state: { ...state },
    commit: jest.fn(),
  };
  const module = queryFilters();
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
      .toHaveBeenCalledWith('SET_FILTER', { filter: filter.filter, value: [filter.value] });
  });
  it('SET_FILTER: sets array value filter with null value to defaultValue', () => {
    const filter = { filter: arrayFilter, value: null };
    module.actions.SET_FILTER(context, filter);
    expect(context.commit)
      .toHaveBeenCalledWith('SET_FILTER', { filter: filter.filter, value: [] });
  });
  it('calls RESET_FILTERS mutation on RESET_FILTERS action call', () => {
    module.actions.RESET_FILTERS(context);
    expect(context.commit).toHaveBeenCalledWith('RESET_FILTERS');
  });
});

describe('queryFilters mutations', () => {
  const module = queryFilters();
  it('correctly mutates state at RESET_FILTERS call', () => {
    expect(Object.values(state).every((filter) => filter.value === filter.defaultValue)).toBeFalsy();
    module.mutations.RESET_FILTERS(state);
    expect(Object.values(state).every((filter) => filter.value === filter.defaultValue)).toBeTruthy();
  });
});
