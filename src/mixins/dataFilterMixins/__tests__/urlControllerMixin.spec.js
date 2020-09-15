import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const $t = () => {};
const filterQuery = 'team';

describe('URL Controller mixin Set and Get operations', () => {
  let wrapper;
  const Component = {
    render() {},
    mixins: [_urlControllerMixin],
  };

  beforeEach(() => {
    router.replace('/');
    wrapper = shallowMount(Component, {
      localVue,
      router,
      mocks: { $t },
    });
  });

  it('Array of objects', async () => {
    const value = [{ name: 'team 1', id: '1' }, { name: 'team 2', id: '2' }];
    wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(['1', '2']);
  });

  it('Array of values', async () => {
    const value = ['hello', '1'];
    wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(value);
  });

  it('String value', async () => {
    const value = 'hello there';
    wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(value);
  });
});
