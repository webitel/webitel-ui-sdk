import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import paginationFilterMixin from '../paginationFilterMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const page = 2;
const size = 20;

describe('Pagination filter mixin', () => {
  const setPage = jest.fn();
  const setSize = jest.fn();
  let wrapper;
  const Component = {
    render() {},
    mixins: [paginationFilterMixin],
    data: () => ({ page, size }),
    methods: { setPage, setSize },
  };

  beforeEach(() => {
    setPage.mockClear();
    setSize.mockClear();
    if (Object.keys(router.currentRoute.query).length) router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    expect(setPage).toHaveBeenCalledWith(page);
    expect(setSize).toHaveBeenCalledWith(size);
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
    expect(wrapper.vm.$route.query.page).toBe(`${page + 1}`);
  });

  it('At "restPage" method, changes query and emits event', async () => {
    await router.replace({ query: { page: 100, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    wrapper._emitted.input = []; // reset emitted events
    wrapper.vm.resetPage();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe('1');
  });

  it('At "sizeChange", changes query and emits event', async () => {
    const newSize = 40;
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
    wrapper._emitted.input = []; // reset emitted events
    wrapper.vm.sizeChange(newSize);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.size).toBe(`${newSize}`);
  });
});
