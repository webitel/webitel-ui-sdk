import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import EnumFilterSchema from '../../classes/EnumFilterSchema.js';
import AbstractEnumFilter from '../abstract-enum-filter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Abstract Enum Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new EnumFilterSchema({
    locale: { label: '' },
  });
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
    const wrapper = shallowMount(AbstractEnumFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
});
