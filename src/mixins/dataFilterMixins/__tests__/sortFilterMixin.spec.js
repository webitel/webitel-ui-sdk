import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import sortFilterMixin from '../sortFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

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

describe('Sort filter mixin', () => {
  let wrapper;
  const Component = {
    render() {},
    mixins: [sortFilterMixin],
    data: () => ({ headers }),
  };

  beforeEach(() => {
    router.replace('/');
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ path: '/', query: { sort: '+queue' } });
    const queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    expect(queue.sort).toEqual('asc');
  });

  it('After "sort" trigger, header column sort value changes properly', () => {
    let queue;
    queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    wrapper.vm.sort(queue);
    queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    expect(queue.sort).toEqual('asc');
  });

  it('After "sort" trigger, url query changes properly', async () => {
    await router.replace({ path: '/', query: { sort: '+queue' } });
    const queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    wrapper.vm.sort(queue);
    expect(wrapper.vm.$route.query.sort).toEqual('-queue');
  });
});
