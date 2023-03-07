import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';
import FilterFromTo from '../filter-from-to.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('FilterFromTo Filter', () => {
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
    const wrapper = shallowMount(FilterFromTo, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('initial restoreValue() triggers setValue() method: From case', async () => {
    const value = 10;
    await router.replace({ query: { [`${filterQuery}From`]: value } });
    const setValueMock = jest.fn();
    jest.spyOn(baseFilterMixin.methods, 'setValue')
    .mockImplementation(setValueMock);
    shallowMount(FilterFromTo, mountOptions);
    expect(setValueMock).toHaveBeenNthCalledWith(1, {
      filter: filterQuery,
      value: { to: undefined, from: value },
    });
  });
  it('initial restoreValue() triggers setValue() method: To case', async () => {
    const value = 10;
    await router.replace({ query: { [`${filterQuery}To`]: value } });
    const setValueMock = jest.fn();
    jest.spyOn(baseFilterMixin.methods, 'setValue')
    .mockImplementation(setValueMock);
    shallowMount(FilterFromTo, mountOptions);
    expect(setValueMock).toHaveBeenNthCalledWith(2, {
      filter: filterQuery,
      value: { to: value, from: undefined },
    });
  });
});
