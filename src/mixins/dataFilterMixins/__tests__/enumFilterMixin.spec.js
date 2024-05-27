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
  let wrapper;
  const Component = {
    render() {
    },
    mixins: [enumFilterMixin],
    data: () => ({
      filterQuery: 'type',
      options,
    }),
  };

  beforeEach(() => {
    router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { type: [options[0].value] } });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual([options[0]]);
  });

  it('Correctly sets single value from $route query', async () => {
    await router.replace({ query: { type: options[0].value } });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual([options[0]]);
  });

  it('Resets value after $route query reset', async () => {
    await router.replace({ query: { type: [options[0].value] } });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual([options[0]]);
    await wrapper.vm.$router.replace({ query: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual([]);
  });
});
