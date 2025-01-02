import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import enumFilterMixin from '../enumFilterMixin.js';

const options = [
  {
    name: 'Inbound',
    value: 'inbound',
  },
  {
    name: 'Outbound',
    value: 'outbound',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

describe('Enum filter mixin', () => {
  const setValue = vi.fn();
  const Component = {
    render() {},
    mixins: [enumFilterMixin],
    data: () => ({
      filterQuery: 'direction',
      storedProp: 'value',
      options,
    }),
    methods: { setValue },
  };

  beforeEach(async () => {
    setValue.mockClear();
    await router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { direction: options[0].value } });
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    await wrapper.vm.$nextTick();
    expect(setValue).toHaveBeenCalledWith({
      filter: 'direction',
      value: options[0],
    });
  });

  it('Sets empty array value if $route query is empty', async () => {
    shallowMount(Component, {
      global: { plugins: [router] },
    });
    expect(setValue).not.toHaveBeenCalled();
  });

  it('Attaches locales to options, if they have "locale" key', async () => {
    const options = [
      {
        locale: 'vi.locale',
      },
    ];
    const expectedOptions = [
      {
        locale: options[0].locale,
        name: options[0].locale,
      },
    ];
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
      data: () => ({ options }),
    });
    expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
  });
});
