import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import AbstractApiFilter from '../abstract-api-filter.vue';
import ApiFilterSchema from '../../classes/ApiFilterSchema';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Abstract Api Filter', () => {
  const namespace = 'jest';
  const filterQuery = 'jest';
  const filterSchema = new ApiFilterSchema({
    locale: { label: '' }
  });
  const searchMock = vi.fn();
  const fetchSelectedMock = vi.fn(() => ({ items: [] }));
  vi.spyOn(filterSchema, 'search').mockImplementation(searchMock);
  vi.spyOn(filterSchema, 'fetchSelected').mockImplementation(fetchSelectedMock);
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
