import { shallowMount } from '@vue/test-utils';
import sortFilterMixin from '../sortFilterMixin';

const headers = [{
  value: 'queue',
  show: true,
  sort: null,
  field: 'queue',
}, {
  value: 'agents',
  show: true,
  sort: null,
  field: 'online',
}];

const sortedHeaders = [{
  value: 'queue',
  show: true,
  sort: 'asc',
  field: 'queue',
}, {
  value: 'agents',
  show: true,
  sort: null,
  field: 'online',
}];

const queryValue = '+queue';

describe('Sort filter mixin', () => {
  const setHeaders = jest.fn();
  const setValueToQuery = jest.fn();
  const getValueFromQuery = jest.fn(() => queryValue);

  const Component = {
    render() {},
    mixins: [sortFilterMixin],
    data: () => ({ headers }),
    methods: {
      setHeaders,
      setValueToQuery,
      getValueFromQuery,
    },
  };

  beforeEach(() => {
    setHeaders.mockClear();
    setValueToQuery.mockClear();
    getValueFromQuery.mockClear();
  });

  it('Correctly sets value from $route query', async () => {
    const wrapper = shallowMount(Component);
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });

  it('After "sort" trigger, header column sort value changes properly', () => {
    const wrapper = shallowMount(Component);
    const queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    wrapper.vm.sort(queue);
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });
});
