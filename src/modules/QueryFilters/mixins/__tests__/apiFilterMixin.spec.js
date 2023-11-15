import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import ApiFilterSchema from '../../classes/ApiFilterSchema';
import apiFilterMixin from '../apiFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

const team = ['1', '2'];
const filterSchema = new ApiFilterSchema();

describe('API filter mixin', () => {
  const setValue = vi.fn();
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

  beforeEach(async () => {
    setValue.mockClear();
    await router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { team } });
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    expect(setValue).toHaveBeenCalledWith({ filter: 'team', value: [{ id: team[0] }, { id: team[1] }] });
  });

  it('Sets empty array value if $route query is empty', async () => {
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
      data: () => ({ filterQuery: 'queue' }),
    });
    expect(setValue).not.toHaveBeenCalled();
  });
});
