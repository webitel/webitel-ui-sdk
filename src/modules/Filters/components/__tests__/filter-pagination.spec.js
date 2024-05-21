import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import FiltersStoreModule from '../../store/FiltersStoreModule';
import FilterPagination from '../filter-pagination.vue';

const filtersSchema = [
  {
    name: 'page',
    value: 1,
    get: ['value'],
    set: ['value'],
    restore: () => {},
  },
  {
    name: 'size',
    value: 11,
    get: ['value'],
    set: ['value'],
    restore: () => {},
  },
];

describe('FilterPagination', () => {
  it('renders a component', () => {
    const store = createStore({
      modules: {
        filters: new FiltersStoreModule().addFilter(filtersSchema).getModule(),
      },
    });

    const wrapper = mount(FilterPagination, {
      props: {
        namespace: 'filters',
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('size change dispatches SET_FILTER action', async () => {
    const store = createStore({
      modules: {
        filters: new FiltersStoreModule().addFilter(filtersSchema).getModule(),
      },
    });

    const wrapper = mount(FilterPagination, {
      shallow: true,
      props: {
        namespace: 'filters',
      },
      global: {
        plugins: [store],
        stubs: {
          WtPagination: false,
        },
      },
    });

    const pagination = wrapper.findComponent('.wt-pagination');
    pagination.vm.$emit('input', 321);
    pagination.vm.$emit('change');
    await wrapper.vm.$nextTick();
    expect(store.getters['filters/GET_FILTER']('size')).toBe(321);
  });

  it('page change dispatches SET_FILTER action', async () => {
    const store = createStore({
      modules: {
        filters: new FiltersStoreModule().addFilter(filtersSchema).getModule(),
      },
    });

    const wrapper = mount(FilterPagination, {
      shallow: true,
      props: {
        namespace: 'filters',
      },
      global: {
        plugins: [store],
        stubs: {
          WtPagination: false,
        },
      },
    });

    const pagination = wrapper.findComponent('.wt-pagination');
    pagination.vm.$emit('next');
    await wrapper.vm.$nextTick();
    expect(store.getters['filters/GET_FILTER']('page')).toBe(2);
  });
});
