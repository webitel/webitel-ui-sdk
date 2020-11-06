import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import sortFilterMixin from '../mixins/sortFilterMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

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

const sortedHeaders = [{
  value: 'queue',
  show: true,
  sort: 'asc',
  field: 'queue',
}, {
  value: 'agents',
  show: true,
  sort: null,
  field: 'online',
}];

describe('Sort filter mixin', () => {
  const setHeaders = jest.fn();
  const Component = {
    render() {},
    mixins: [sortFilterMixin],
    data: () => ({ headers }),
    methods: { setHeaders },
  };

  beforeEach(() => {
    router.replace('/');
  });

  it('Correctly sets value from $route query', async () => {
    await router.replace({ path: '/', query: { sort: '+queue' } });
    const wrapper = shallowMount(Component, { localVue, router });
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });

  it('After "sort" trigger, header column sort value changes properly', () => {
    const wrapper = shallowMount(Component, { localVue, router });
    const queue = wrapper.vm.headers.find((header) => header.value === 'queue');
    wrapper.vm.sort(queue);
    expect(setHeaders).toHaveBeenCalledWith(sortedHeaders);
  });
});
