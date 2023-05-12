import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import _urlControllerMixin from '../_urlControllerMixin/_urlControllerMixin';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'jest' }],
});

const filterQuery = 'team';

describe('URL Controller mixin Set and Get operations', () => {
  let wrapper;
  const Component = {
    render() {},
    mixins: [_urlControllerMixin],
  };

  beforeEach(async () => {
    await router.replace('/');
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
    });
  });

  it('Array of objects', async () => {
    const value = [{ name: 'team 1', id: '1' }, { name: 'team 2', id: '2' }];
    await wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(['1', '2']);
  });

  it('Array of values', async () => {
    const value = ['hello', '1'];
    await wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(value);
  });

  it('String value', async () => {
    const value = 'hello there';
    await wrapper.vm.setValueToQuery({ filterQuery, value });
    const queryValue = wrapper.vm.getValueFromQuery({ filterQuery });
    expect(queryValue).toEqual(value);
  });
});
