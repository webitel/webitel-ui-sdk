import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import apiFilterMixin from '../mixins/apiFilterMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const team = ['1', '2'];

describe('API filter mixin', () => {
  const setValue = jest.fn();
  const Component = {
    render() {},
    mixins: [apiFilterMixin],
    data: () => ({
      filterQuery: 'team',
    }),
    methods: { setValue },
  };

  beforeEach(() => {
    setValue.mockClear();
    if (Object.keys(router.currentRoute.query).length) router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { team } });
    const wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    expect(setValue).toHaveBeenCalledWith({ filter: 'team', value: { id: team } });
  });

  it('Sets empty array value if $route query is empty', async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      router,
      data: () => ({ filterQuery: 'queue' }),
    });
    expect(setValue).not.toHaveBeenCalled();
  });
});
