import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import SearchFilter from '../filter-search.vue';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Search Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new BaseFilterSchema();
  const store = new Vuex.Store({
    modules: {
      [namespace]: {
        namespaced: true,
        state: {
          [filterQuery]: filterSchema,
        },
      },
    },
  });

  const mountOptions = {
    localVue,
    store,
    router,
    props: {
      namespace,
      filterQuery,
    },
  };
  it('renders a component', () => {
    const wrapper = shallowMount(SearchFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('initial restoreValue() triggers setValue() method', async () => {
    const search = 'jest';
    await router.replace({ query: { [filterQuery]: search } });
    const setValueMock = jest.fn();
    jest.spyOn(baseFilterMixin.methods, 'setValue').mockImplementationOnce(setValueMock);
    shallowMount(SearchFilter, mountOptions);
    expect(setValueMock).toHaveBeenCalledWith({ filter: filterQuery, value: search });
  });
});
