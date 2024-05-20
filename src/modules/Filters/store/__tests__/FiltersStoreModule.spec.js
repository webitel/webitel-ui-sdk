import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import { valueGetter } from '../../scripts/getters';
import { queryRestore } from '../../scripts/restores';
import { querySetter, valueSetter } from '../../scripts/setters';
import FiltersStoreModule from '../FiltersStoreModule';

describe('FiltersStoreModule', () => {
  it('get/sets primitive type filter', async () => {
    const filters = new FiltersStoreModule().addFilter([
      {
        name: 'vi',
        value: 1,
        defaultValue: 1,
        get: ['value'],
        set: ['value'],
        restore: [],
      },
    ]).getModule();

    const store = createStore({
      modules: {
        filters,
      },
    });

    const newValue = 2;

    await store.dispatch('filters/SET_FILTER', {
      name: 'vi',
      value: newValue,
    });

    expect(store.getters['filters/GET_FILTER']('vi')).toBe(newValue);
  });

  it('sets/restores primitive type filter', async () => {
    const localStorageKey = 'vivivi';

    const filters = new FiltersStoreModule()
    .addFilter({
      name: 'vi',
      value: 1,
      localStorageKey,
      get: ['value'],
      set: ['value', 'localStorage'],
      restore: ['localStorage'],
    })
    .getModule();

    const store = createStore({
      modules: {
        filters,
      },
    });

    await store.dispatch('filters/SET_FILTER', {
      name: 'vi',
      value: '2',
    });

    expect(localStorage.getItem(localStorageKey)).toBe('2');

    await store.dispatch('filters/RESTORE_FILTER', { name: 'vi' });

    expect(store.getters['filters/GET_FILTER']('vi')).toBe('2');
  });

  it('sets/restores primitive value from query using getters/setters as functions', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          name: 'home',
          path: '/home',
          component: {},
        },
      ],
    });

    await router.push({ name: 'home' });

    const filters = new FiltersStoreModule()
    .addFilter({
      name: 'vi',
      value: 1,
      get: (context) => () => {
        return valueGetter(context)();
      },
      set: (context) => async (v) => {
        valueSetter(context)(v);
        await querySetter(context)(router)(v);
        return context;
      },
      restore: (context) => () => {
        return queryRestore(context)(router)();
      },
    })
    .getModule();

    const store = createStore({
      modules: {
        filters,
      },
    });

    await store.dispatch('filters/SET_FILTER', {
      name: 'vi',
      value: '2',
    });

    await store.dispatch('filters/RESTORE_FILTER', { name: 'vi' });

    expect(store.getters['filters/GET_FILTER']('vi')).toBe('2');
  });

  it('sets/restores primitive value from query using getters/setters as strings', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          name: 'home',
          path: '/home',
          component: {},
        },
      ],
    });

    await router.push({ name: 'home' });

    const filters = new FiltersStoreModule()
    .addFilter({
      name: 'vi',
      value: 1,
      get: ['value'],
      set: ['value', 'query'],
      restore: ['query'],
      router,
    })
    .getModule();

    const store = createStore({
      modules: {
        filters,
      },
    });

    await store.dispatch('filters/SET_FILTER', {
      name: 'vi',
      value: '2',
    });

    await store.dispatch('filters/RESTORE_FILTER', { name: 'vi' });

    expect(store.getters['filters/GET_FILTER']('vi')).toBe('2');
  });
});
