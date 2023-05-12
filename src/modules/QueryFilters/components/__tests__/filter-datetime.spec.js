import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import DatetimeFilter from '../filter-datetime.vue';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

describe('DatetimeFilter Filter', () => {
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
    global: {
      plugins: [router, store],
    },
    props: {
      namespace,
      filterQuery,
    },
  };
  it('renders a component', () => {
    const wrapper = shallowMount(DatetimeFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('initial restoreValue() triggers setValue() method', async () => {
    const value = Date.now();
    await router.replace({ query: { [filterQuery]: value } });
    const setValueMock = jest.fn();
    jest.spyOn(baseFilterMixin.methods, 'setValue').mockImplementationOnce(setValueMock);
    shallowMount(DatetimeFilter, mountOptions);
    expect(setValueMock).toHaveBeenCalledWith({ filter: filterQuery, value });
  });
});
