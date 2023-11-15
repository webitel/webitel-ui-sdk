import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import SearchFilter from '../filter-search.vue';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

describe('Search Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new BaseFilterSchema();
  const store = createStore({
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
    global: { plugins: [store, router] },
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
    const setValueMock = vi.fn();
    vi.spyOn(baseFilterMixin.methods, 'setValue').mockImplementationOnce(setValueMock);
    shallowMount(SearchFilter, mountOptions);
    expect(setValueMock).toHaveBeenCalledWith({ filter: filterQuery, value: search });
  });
});
