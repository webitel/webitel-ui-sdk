import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import { SortSymbols } from '../../../../scripts/sortQueryAdapters.js';
import FilterEvent from '../../../Filters/enums/FilterEvent.enum.js';
import FiltersStoreModule from '../../../Filters/store/FiltersStoreModule.js';
import TableStoreModule from '../TableStoreModule.js';

describe('TableStoreModule', () => {
  it('correctly computes FIELDS getter', () => {
    const headers = [
      { show: true, field: 'id' },
      { show: false, field: 'name' },
      { show: true, field: 'age' },
    ];

    const state = { headers };

    expect(new TableStoreModule({}).getters.FIELDS(state)).toEqual(['id', 'age']);
  });
});

describe('TableStoreModule integration with FiltersStoreModule', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  it('filters restore event triggers LOAD_DATA_LIST', async () => {
    const filters = new FiltersStoreModule()
      .addFilter({
        name: 'vi',
        value: 23,
        defaultValue: 23,
        get: ['value'],
        set: ['value'],
        restore: () => 'vivi',
      })
      .getModule();

    const table = new TableStoreModule({}).getModule({
      modules: { filters },
    });

    const mock = vi.fn();
    vi.spyOn(table.actions, 'LOAD_DATA_LIST').mockImplementationOnce(mock);

    const store = createStore({
      state: { router },
      modules: { table },
    });

    await store.dispatch('table/filters/SUBSCRIBE', {
      event: FilterEvent.RESTORED,
      callback: (payload) => store.dispatch('table/ON_FILTER_EVENT', payload),
    });

    await store.dispatch('table/filters/RESTORE_FILTERS');

    expect(mock).toHaveBeenCalledTimes(1);

    await store.dispatch('table/filters/FLUSH_SUBSCRIBERS');
  });

  it('FILTER_SET event triggers LOAD_DATA_LIST', async () => {
    const filters = new FiltersStoreModule()
      .addFilter({
        name: 'vi',
        value: 23,
        defaultValue: 23,
        get: ['value'],
        set: ['value'],
        restore: () => {},
      })
      .getModule();

    const table = new TableStoreModule({}).getModule({
      modules: { filters },
    });

    const mock = vi.fn();
    vi.spyOn(table.actions, 'LOAD_DATA_LIST').mockImplementationOnce(mock);

    const store = createStore({
      state: { router },
      modules: { table },
    });

    await store.dispatch('table/filters/SUBSCRIBE', {
      event: FilterEvent.FILTER_SET,
      callback: (payload) => store.dispatch('table/ON_FILTER_EVENT', payload),
    });

    await store.dispatch('table/filters/SET_FILTER', {
      name: 'vi',
      value: 24,
    });

    expect(store.getters['table/filters/GET_FILTER']('vi')).toBe(24);

    expect(mock).toHaveBeenCalledTimes(1);

    await store.dispatch('table/filters/FLUSH_SUBSCRIBERS');
  });

  it('FILTER_SET with not-page filter name resets page filter', async () => {
    const filters = new FiltersStoreModule()
      .addFilter([
        {
          name: 'vi',
          value: 23,
          defaultValue: 23,
          get: ['value'],
          set: ['value'],
          restore: () => {},
        },
        {
          name: 'page',
          value: 12,
          defaultValue: 12,
          get: ['value'],
          set: ['value'],
          restore: () => {},
        },
      ])
      .getModule();

    const table = new TableStoreModule({}).getModule({
      modules: { filters },
    });

    vi.spyOn(table.actions, 'LOAD_DATA_LIST').mockImplementationOnce(vi.fn());

    const store = createStore({
      state: { router },
      modules: { table },
    });

    await store.dispatch('table/filters/SUBSCRIBE', {
      event: FilterEvent.FILTER_SET,
      callback: (payload) => store.dispatch('table/ON_FILTER_EVENT', payload),
    });

    expect(store.getters['table/FILTERS']().page).toBe(12);

    await store.dispatch('table/filters/SET_FILTER', {
      name: 'vi',
      value: 24,
    });

    expect(store.getters['table/FILTERS']().page).toBe(1);

    await store.dispatch('table/filters/FLUSH_SUBSCRIBERS');
  });

  it('SORT changes both headers and sort filter', async () => {
    const filters = new FiltersStoreModule()
      .addFilter({
        name: 'sort',
        value: '',
        get: ['value'],
        set: ['value'],
        restore: () => {},
      })
      .getModule();

    const headers = [{ value: 'id', field: 'sort_me', sort: SortSymbols.NONE }];

    const table = new TableStoreModule({ headers }).getModule({
      modules: { filters },
    });

    vi.spyOn(table.actions, 'LOAD_DATA_LIST').mockImplementationOnce(vi.fn());

    const store = createStore({
      state: { router },
      modules: { table },
    });

    await store.dispatch('table/filters/SUBSCRIBE', {
      event: FilterEvent.FILTER_SET,
      callback: (payload) => store.dispatch('table/ON_FILTER_EVENT', payload),
    });

    await store.dispatch('table/SORT', {
      header: headers[0],
      nextSortOrder: SortSymbols.ASC,
    });

    expect(store.getters['table/filters/GET_FILTER']('sort')).toBe('+sort_me');

    expect(store.state.table.headers[0].sort).toBe(SortSymbols.ASC);

    await store.dispatch('table/filters/FLUSH_SUBSCRIBERS');
  });

  it('fields filter change changes headers', async () => {
    const filters = new FiltersStoreModule()
      .addFilter({
        name: 'fields',
        value: [],
        get: ['value'],
        set: ['value'],
        restore: () => {},
      })
      .getModule();

    const headers = [
      { value: 'surname', field: 'included', show: false },
      { value: 'name', field: 'excluded', show: true },
    ];

    const table = new TableStoreModule({ headers }).getModule({
      modules: { filters },
    });

    vi.spyOn(table.actions, 'LOAD_DATA_LIST').mockImplementationOnce(vi.fn());

    const store = createStore({
      state: { router },
      modules: { table },
    });

    await store.dispatch('table/filters/SUBSCRIBE', {
      event: FilterEvent.FILTER_SET,
      callback: (payload) => store.dispatch('table/ON_FILTER_EVENT', payload),
    });

    await store.dispatch('table/filters/SET_FILTER', {
      name: 'fields',
      value: ['surname'],
    });

    expect(store.getters['table/filters/GET_FILTER']('fields')).toEqual(['surname']);

    expect(store.getters['table/FIELDS']).toEqual(['id', 'included']);

    await store.dispatch('table/filters/FLUSH_SUBSCRIBERS');
  });
});
