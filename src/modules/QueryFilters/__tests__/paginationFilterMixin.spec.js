import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import paginationFilterMixin from '../mixins/paginationFilterMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const page = '2';
const size = '20';

describe('Pagination filter mixin', () => {
  let wrapper;
  const Component = {
    render() {},
    mixins: [paginationFilterMixin],
  };

  beforeEach(() => {
    if (Object.keys(router.currentRoute.query).length) router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.page).toEqual(page);
    expect(wrapper.vm.size).toEqual(size);
  });

  it('Sets initial value if $route query is empty', async () => {
    wrapper = shallowMount(Component, {
      localVue,
      router,
      data: () => ({
        filterQuery: 'queue',
      }),
    });
    expect(wrapper.vm.page).toEqual('1');
    expect(wrapper.vm.size).toEqual('10');
  });

  it('Resets value after $route query reset', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    await wrapper.vm.$router.replace({ query: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.page).toEqual('1');
    expect(wrapper.vm.size).toEqual('10');
  });

  it('At "prev" page, changes query and emits event', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    wrapper._emitted.input = []; // reset emitted events
    wrapper.vm.prev();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe(`${page - 1}`);
  });

  it('At "next" page, changes query and emits event', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    wrapper._emitted.input = []; // reset emitted events
    wrapper.vm.next();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe(`${+page + 1}`);
  });

  it('At "sizeChange", changes query and emits event', async () => {
    const newSize = '40';
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    wrapper._emitted.input = []; // reset emitted events
    wrapper.vm.sizeChange(newSize);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.size).toBe(newSize);
  });
});
