import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';

import FiltersStoreModule from '../../store/FiltersStoreModule.js';
import FilterTableFields from '../filter-table-fields.vue';

const filterSchema = {
  name: 'fields',
  value: ['field2'],
  get: ['value'],
  set: ['value'],
  restore: () => {},
};

describe('FilterTableFields', () => {
  it('renders a component', () => {
    const store = createStore({
      modules: {
        filters: new FiltersStoreModule().addFilter(filterSchema).getModule(),
      },
    });

    const headers = [
      { value: 'f1', field: 'field1', show: false },
      { value: 'f2', field: 'field2', show: true },
    ];

    const wrapper = mount(FilterTableFields, {
      props: {
        namespace: 'filters',
        headers,
      },
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('fields change dispatches SET_FILTER action', async () => {
    const store = createStore({
      modules: {
        filters: new FiltersStoreModule().addFilter(filterSchema).getModule(),
      },
    });

    const headers = [
      { value: 'f1', field: 'field1', show: false },
      { value: 'f2', field: 'field2', show: true },
    ];

    const wrapper = mount(FilterTableFields, {
      shallow: true,
      props: {
        namespace: 'filters',
        headers,
      },
      global: {
        plugins: [store],
      },
    });

    wrapper.findComponent({ name: 'WtTableColumnSelect' }).vm.$emit('change', [
      { value: 'f1', field: 'field1', show: true },
      { value: 'f2', field: 'field2', show: false },
    ]);

    await wrapper.vm.$nextTick();

    expect(store.getters['filters/GET_FILTER']('fields')).toEqual(['f1']);
  });
});
