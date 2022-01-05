import { shallowMount } from '@vue/test-utils';
import EnumFilterSchema from '../../classes/EnumFilterSchema';
import enumFilterMixin from '../enumFilterMixin';

const filterQuery = 'direction';
const options = [
  {
    name: 'Inbound',
    value: 'inbound',
  }, {
    name: 'Outbound',
    value: 'outbound',
  },
];

const queryValue = options[0].value;

const filterSchema = new EnumFilterSchema({
  options,
  storedProp: 'value',
});

describe('Enum filter mixin', () => {
  const setValue = jest.fn();
  const setValueToQuery = jest.fn();
  const getValueFromQuery = jest.fn(() => queryValue);

  const Component = {
    render() {
    },
    mixins: [enumFilterMixin],
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
    const wrapper = shallowMount(Component, {});
    expect(setValue)
      .toHaveBeenCalledWith({ filter: filterQuery, value: options[0] });
  });

  it('Sets empty array value if $route query is empty', async () => {
    getValueFromQuery.mockImplementationOnce(() => []);

    shallowMount(Component, {});
    expect(setValue).not.toHaveBeenCalled();
  });

  it('Attaches locales to options, if they have "locale" key', async () => {
    const options = [
      {
        locale: 'jest.locale',
      },
    ];
    const expectedOptions = [
      {
        locale: options[0].locale,
        name: options[0].locale,
      },
    ];
    const wrapper = shallowMount(Component, {
      computed: {
        options() {
          return options;
        },
      },
    });
    expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
  });
});
