import { shallowMount } from '@vue/test-utils';
import ErrorPage from '../wt-error-page.vue';

describe('Error Page', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ErrorPage, { props: { type: '' } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders a component with 404 type', () => {
    const wrapper = shallowMount(ErrorPage, { props: { type: '404' } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders a component with 403 type', () => {
    const wrapper = shallowMount(ErrorPage, { props: { type: '403' } });
    expect(wrapper.exists()).toBe(true);
  });
});
