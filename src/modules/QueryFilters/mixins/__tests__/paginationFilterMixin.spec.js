import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import paginationFilterMixin from '../paginationFilterMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

const page = 2;
const size = 20;

describe('Pagination filter mixin', () => {
  const setPage = vi.fn();
  const setSize = vi.fn();
  let wrapper;
  const Component = {
    render() {},
    mixins: [paginationFilterMixin],
    data: () => ({ page, size }),
    methods: { setPage, setSize },
  };

  beforeEach(async () => {
    setPage.mockClear();
    setSize.mockClear();
    await router.replace({ query: null });
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    expect(setPage).toHaveBeenCalledWith(page);
    expect(setSize).toHaveBeenCalledWith(size);
  });

  it('At "prev" page, changes query and emits event', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    await wrapper.vm.prev();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe(`${page - 1}`);
  });

  it('At "next" page, changes query and emits event', async () => {
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    await wrapper.vm.next();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe(`${page + 1}`);
  });

  it('At "restPage" method, changes query and emits event', async () => {
    await router.replace({ query: { page: 100, size } });
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    await wrapper.vm.resetPage();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.page).toBe('1');
  });

  it('At "sizeChange", changes query and emits event', async () => {
    const newSize = 40;
    await router.replace({ query: { page, size } });
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
    await wrapper.vm.sizeChange(newSize);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.vm.$route.query.size).toBe(`${newSize}`);
  });
});
