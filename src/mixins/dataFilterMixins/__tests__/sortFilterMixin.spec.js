import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import sortFilterMixin from '../sortFilterMixin';

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

const $t = () => {};

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
      localVue,
      router,
      mocks: { $t },
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
