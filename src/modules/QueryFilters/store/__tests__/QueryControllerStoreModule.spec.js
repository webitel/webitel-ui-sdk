import { createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import QueryContrllerStoreModule from '../QueryControllerStoreModule';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

const filterQuery = 'team';

describe('Query Controller Store Module Actions', () => {
  const store = new Vuex.Store({
    ...new QueryContrllerStoreModule({ router }).getModule(),
  });

  beforeEach(() => {
    router.replace('/');
  });

  it('Array of objects', async () => {
    const value = [{ name: 'team 1', id: '1' }, { name: 'team 2', id: '2' }];
    await store.dispatch('SET_VALUE_TO_QUERY', { filterQuery, value });
    const queryValue = await store.getters.GET_VALUE_FROM_QUERY({ filterQuery });
    expect(queryValue).toEqual(['1', '2']);
  });

  it('Array of values', async () => {
    const value = ['hello', '1'];
    await store.dispatch('SET_VALUE_TO_QUERY', { filterQuery, value });
    const queryValue = await store.getters.GET_VALUE_FROM_QUERY({ filterQuery });
    expect(queryValue).toEqual(value);
  });

  it('String value', async () => {
    const value = 'hello there';
    await store.dispatch('SET_VALUE_TO_QUERY', { filterQuery, value });
    const queryValue = await store.getters.GET_VALUE_FROM_QUERY({ filterQuery });
    expect(queryValue).toEqual(value);
  });
});
