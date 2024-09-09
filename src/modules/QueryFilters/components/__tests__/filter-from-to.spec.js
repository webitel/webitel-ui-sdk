import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import BaseFilterSchema from '../../classes/BaseFilterSchema.js';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin.js';
import FilterFromTo from '../filter-from-to.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

describe('FilterFromTo Filter', () => {
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
    const wrapper = shallowMount(FilterFromTo, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('initial restoreValue() triggers setValue() method: From case', async () => {
    const value = 10;
    await router.replace({ query: { [`${filterQuery}From`]: value } });
    const setValueMock = vi.fn();
    vi.spyOn(baseFilterMixin.methods, 'setValue').mockImplementation(setValueMock);
    shallowMount(FilterFromTo, mountOptions);
    expect(setValueMock).toHaveBeenNthCalledWith(1, {
      filter: filterQuery,
      value: { to: undefined, from: value },
    });
  });
  it('initial restoreValue() triggers setValue() method: To case', async () => {
    const value = 10;
    await router.replace({ query: { [`${filterQuery}To`]: value } });
    const setValueMock = vi.fn();
    vi.spyOn(baseFilterMixin.methods, 'setValue').mockImplementation(setValueMock);
    shallowMount(FilterFromTo, mountOptions);
    expect(setValueMock).toHaveBeenNthCalledWith(2, {
      filter: filterQuery,
      value: { to: value, from: undefined },
    });
  });
});
