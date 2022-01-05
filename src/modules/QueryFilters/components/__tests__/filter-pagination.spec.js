import { shallowMount } from '@vue/test-utils';
import BaseFilterSchema from '../../classes/BaseFilterSchema';
import baseFilterMixin from '../../mixins/baseFilterMixin/baseFilterMixin';
import FilterPagination from '../filter-pagination.vue';

const pageDefaultValue = 1;
const page = 2;
const size = 20;

const pageFilterSchema = new BaseFilterSchema({ value: page, defaultValue: pageDefaultValue });
const sizeFilterSchema = new BaseFilterSchema({ value: size });

describe('Pagination filter mixin', () => {
  const setValue = jest.fn();
  const setValueToQuery = jest.fn();
  const getValueFromQuery = jest.fn(({ filterQuery }) => (filterQuery === 'page' ? page : size));

  let wrapper;

  jest.spyOn(baseFilterMixin.methods, 'setValue').mockImplementation(setValue);
  jest.spyOn(baseFilterMixin.methods, 'setValueToQuery').mockImplementation(setValueToQuery);
  jest.spyOn(baseFilterMixin.methods, 'getValueFromQuery').mockImplementation(getValueFromQuery);

  const computed = {
    pageFilterSchema() { return pageFilterSchema; },
    sizeFilterSchema() { return sizeFilterSchema; },
  };

  beforeEach(() => {
    setValue.mockClear();
    setValueToQuery.mockClear();
    getValueFromQuery.mockClear();
  });

  it('Correctly sets value from $route query', async () => {
    wrapper = shallowMount(FilterPagination, {
      computed,
    });
    expect(setValue).toHaveBeenNthCalledWith(1, { filter: 'page', value: page });
    expect(setValue).toHaveBeenNthCalledWith(2, { filter: 'size', value: size });
  });

  it('At "prev" page, changes query and emits event', async () => {
    wrapper = shallowMount(FilterPagination, { computed });
    wrapper.vm.prev();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(setValue).toHaveBeenLastCalledWith({ filter: 'page', value: page - 1 });
  });

  it('At "next" page, changes query and emits event', async () => {
    wrapper = shallowMount(FilterPagination, { computed });
    wrapper.vm.next();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(setValue).toHaveBeenLastCalledWith({ filter: 'page', value: page + 1 });
  });

  it('At "resetPage" method, changes query and emits event', async () => {
    wrapper = shallowMount(FilterPagination, { computed });
    wrapper.vm.resetPage();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(setValue).toHaveBeenLastCalledWith({ filter: 'page', value: pageDefaultValue });
  });

  it('At "sizeChange", changes query and emits event', async () => {
    const newSize = 40;
    wrapper = shallowMount(FilterPagination, { computed });
    wrapper.vm.sizeChange(newSize);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(setValue).toHaveBeenLastCalledWith({ filter: 'size', value: newSize });
  });
});
