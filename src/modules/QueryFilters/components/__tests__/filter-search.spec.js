import { shallowMount } from '@vue/test-utils';
import SearchFilter from '../filter-search.vue';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';

const namespace = 'jest';
const filterQuery = 'jest';
const filterSchema = new BaseFilterSchema();
const searchValue = 'jest-search';

describe('Search Filter', () => {
  const setValue = jest.fn();
  const setValueToQuery = jest.fn();
  const getValueFromQuery = jest.fn(() => searchValue);

  const mountOptions = {
    propsData: {
      namespace,
      filterQuery,
    },
    computed: {
      filterSchema() { return filterSchema; },
    },
  };

  jest.spyOn(baseFilterMixin.methods, 'setValue').mockImplementation(setValue);
  jest.spyOn(baseFilterMixin.methods, 'setValueToQuery').mockImplementation(setValueToQuery);
  jest.spyOn(baseFilterMixin.methods, 'getValueFromQuery').mockImplementation(getValueFromQuery);

  beforeEach(() => {
    setValue.mockClear();
    setValueToQuery.mockClear();
    getValueFromQuery.mockClear();
  });

  it('renders a component', () => {
    const wrapper = shallowMount(SearchFilter, mountOptions);
    expect(wrapper.exists()).toBe(true);
  });
  it('initial restoreValue() triggers setValue() method', async () => {
    shallowMount(SearchFilter, mountOptions);
    expect(setValue).toHaveBeenCalledWith({ filter: filterQuery, value: searchValue });
  });
});
