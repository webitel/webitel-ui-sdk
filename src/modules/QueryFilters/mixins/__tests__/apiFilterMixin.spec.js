import { shallowMount } from '@vue/test-utils';
import ApiFilterSchema from '../../classes/ApiFilterSchema';
import apiFilterMixin from '../apiFilterMixin';

const filterQuery = 'team';
const team = ['1', '2'];
const filterSchema = new ApiFilterSchema();

describe('API filter mixin', () => {
  const setValue = jest.fn();
  const setValueToQuery = jest.fn();
  const getValueFromQuery = jest.fn(() => team);

  const Component = {
    render() {},
    mixins: [apiFilterMixin],
    data: () => ({
      filterQuery,
    }),
    computed: {
      filterSchema() { return filterSchema; },
    },
    methods: {
      setValue,
      setValueToQuery,
      getValueFromQuery,
    },
  };

  beforeEach(() => {
    setValue.mockClear();
    setValueToQuery.mockClear();
    getValueFromQuery.mockClear();
  });

  it('Correctly sets value from $route query', async () => {
    const wrapper = shallowMount(Component, {
    });
    expect(setValue).toHaveBeenCalledWith({ filter: 'team', value: [{ id: team[0] }, { id: team[1] }] });
  });

  it('Sets empty array value if $route query is empty', async () => {
    getValueFromQuery.mockImplementationOnce(() => []);
    const wrapper = shallowMount(Component, {
      data: () => ({ filterQuery }),
    });
    expect(setValue).not.toHaveBeenCalled();
  });
});
