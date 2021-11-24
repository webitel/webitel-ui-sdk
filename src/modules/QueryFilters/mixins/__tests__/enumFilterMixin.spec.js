import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import enumFilterMixin from '../enumFilterMixin';

const options = [{
    name: 'Inbound',
    value: 'inbound',
  },
  {
    name: 'Outbound',
    value: 'outbound',
  }];

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Enum filter mixin', () => {
  const setValue = jest.fn();
  const Component = {
    render() {
    },
    mixins: [enumFilterMixin],
    data: () => ({
      filterQuery: 'direction',
      storedProp: 'value',
      options,
    }),
    methods: { setValue },
  };

  beforeEach(() => {
    setValue.mockClear();
    if (Object.keys(router.currentRoute.query).length) router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { direction: options[0].value } });
    const wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    await wrapper.vm.$nextTick();
    expect(setValue).toHaveBeenCalledWith({ filter: 'direction', value: options[0] });
  });

  it('Sets empty array value if $route query is empty', async () => {
    shallowMount(Component, {
      localVue,
      router,
    });
    expect(setValue).not.toHaveBeenCalled();
  });

  it('Attaches locales to options, if they have "locale" key', async () => {
    const options = [{
      locale: 'jest.locale',
    }];
    const expectedOptions = [{
      locale: options[0].locale,
      name: options[0].locale,
    }];
    const wrapper = shallowMount(Component, {
      localVue,
      router,
      data: () => ({ options }),
    });
    expect(wrapper.vm.localizedOptions).toEqual(expectedOptions);
  });
});
