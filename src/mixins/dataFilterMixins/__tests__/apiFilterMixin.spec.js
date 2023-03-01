import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import apiFilterMixin from '../apiFilterMixin';

const router = new createRouter({
  history: createWebHistory(),
  routes: [],
});
const team = ['1', '2'];

describe('API filter mixin', () => {
  let wrapper;
  const Component = {
    render() {},
    mixins: [apiFilterMixin],
    data: () => ({
      filterQuery: 'team',
    }),
  };

  beforeEach(() => {
    if (Object.keys(router.currentRoute.value.query).length) router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { team } });
    wrapper = shallowMount(Component, {
      plugins: [router],
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual(team);
  });

  it('Sets empty array value if $route query is empty', async () => {
    wrapper = shallowMount(Component, {
      localVue,
      router,
      data: () => ({
        filterQuery: 'queue',
      }),
    });
    expect(wrapper.vm.value).toEqual([]);
  });

  it('Resets value after $route query reset', async () => {
    await router.replace({ query: { team } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual(team);
    await wrapper.vm.$router.replace({ query: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.value).toEqual([]);
  });
});
