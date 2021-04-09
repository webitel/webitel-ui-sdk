import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AbstractEnumFilter from '../abstract-enum-filter.vue';
import EnumFilterSchema from '../../classes/EnumFilterSchema';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Abstract Enum Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new EnumFilterSchema({ locale: {} });
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
    propsData: {
      namespace,
      filterQuery,
    },
  };
  it('renders a component', () => {
    const wrapper = shallowMount(AbstractEnumFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
});
