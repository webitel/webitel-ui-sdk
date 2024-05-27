import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import sortFilterMixin from '../sortFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

const headers = [
  {
    value: 'queue',
    show: true,
    sort: null,
    field: 'queue',
  }, {
    value: 'agents',
    show: true,
    sort: null,
    field: 'online',
  },
];

const sortedHeaders = [
  {
    value: 'queue',
    show: true,
    sort: 'asc',
    field: 'queue',
  }, {
    value: 'agents',
    show: true,
    sort: null,
    field: 'online',
  },
];

describe('Sort filter mixin', () => {
  const setHeaders = vi.fn();
  const Component = {
    render() {},
    mixins: [sortFilterMixin],
    data: () => ({ headers }),
    methods: { setHeaders },
  };

  beforeEach(async () => {
    await router.replace('/');
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ path: '/', query: { sort: '+queue' } });
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });

  it('After "sort" trigger, header column sort value changes properly', () => {
    const wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    const queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    wrapper.vm.sort(queue);
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });
});
