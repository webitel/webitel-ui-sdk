import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ApiFilterSchema from '../../classes/ApiFilterSchema';
import apiFilterMixin from '../apiFilterMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const team = ['1', '2'];
const filterSchema = new ApiFilterSchema();

describe('API filter mixin', () => {
  const setValue = jest.fn();
  const Component = {
    render() {},
    mixins: [apiFilterMixin],
    data: () => ({
      filterQuery: 'team',
    }),
    computed: {
      filterSchema() { return filterSchema; },
    },
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
    expect(setValue).toHaveBeenCalledWith({ filter: 'team', value: [{ id: team[0] }, { id: team[1] }] });
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
