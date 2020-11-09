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
    const wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    expect(setValue).not.toHaveBeenCalled();
  });
});
