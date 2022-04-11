import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AbstractApiFilter from '../abstract-api-filter.vue';
import ApiFilterSchema from '../../classes/ApiFilterSchema';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Abstract Api Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new ApiFilterSchema({ locale: {} });
  const searchMock = jest.fn();
  const fetchSelectedMock = jest.fn(() => ({ items: [] }));
  jest.spyOn(filterSchema, 'search').mockImplementation(searchMock);
  jest.spyOn(filterSchema, 'fetchSelected').mockImplementation(fetchSelectedMock);
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
    const wrapper = shallowMount(AbstractApiFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('calls filter schema API search()', () => {
    const wrapper = shallowMount(AbstractApiFilter, mountOptions);
    wrapper.vm.search();
    expect(searchMock).toHaveBeenCalled();
  });
  it(' filter schema API fetchSelected()', () => {
    const wrapper = shallowMount(AbstractApiFilter, mountOptions);
    wrapper.vm.fetchSelected();
    expect(fetchSelectedMock).toHaveBeenCalled();
  });
});
