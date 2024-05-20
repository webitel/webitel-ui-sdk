import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { localStorageRestore, queryRestore } from '../../scripts/restores';
import FiltersStoreModule from '../FiltersStoreModule';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import { valueGetter } from '../../scripts/getters';
import {
  localStorageSetter,
  querySetter,
  valueSetter,
} from '../../scripts/setters';

describe('FiltersStoreModule', () => {
  it('get/sets primitive type filter', async () => {
    const filters = new FiltersStoreModule().getModule({
      state: {
        vi: new BaseFilterSchema({
          name: 'vi',
          value: 1,
          defaultValue: 1,
          get: ['value'],
          set: ['value'],
          restore: [],
        }),
      },
    });

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

    const filters = new FiltersStoreModule().getModule({
      state: {
        vi: new BaseFilterSchema({
          name: 'vi',
          value: 1,
          localStorageKey,
          get: ['value'],
          set: ['value', 'localStorage'],
          restore: ['localStorage'],
        }),
      },
    });

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

    const filters = new FiltersStoreModule().getModule({
      state: {
        vi: new BaseFilterSchema({
          name: 'vi',
          value: 1,
          router,
          get: function() {
            return valueGetter(this)();
          },
          set: async function(v) {
            valueSetter(this)(v);
            await querySetter(this)(router)(v);
            return this;
          },
          restore: function() {
            return queryRestore(this)(router)();
          },
        }),
      },
    });

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

    const filters = new FiltersStoreModule().getModule({
      state: {
        vi: new BaseFilterSchema({
          name: 'vi',
          value: 1,
          router,
          get: ['value'],
          set: ['value', 'query'],
          restore: ['query'],
        }),
      },
    });

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
