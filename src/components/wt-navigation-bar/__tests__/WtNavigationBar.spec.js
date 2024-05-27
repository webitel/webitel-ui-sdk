import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import WtNavigationBar from '../wt-navigation-bar.vue';

const nav = [
  { value: '1', route: '/1' },
  {
    value: '2',
    route: '/2',
    subNav: [
      { value: '3', route: '3' },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('WtNavigationBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtNavigationBar);
    expect(wrapper.classes('wt-navigation-bar')).toBe(true);
  });

  it('renders navigation links', () => {
    const wrapper = shallowMount(WtNavigationBar, {
      global: {
        plugins: [router],
      },
      props: { nav },
    });
    const navLinksLen = nav.filter((nav) => !nav.subNav).length;
    expect(wrapper.findAll('.wt-navigation-bar__nav-item-link').length)
    .toBe(navLinksLen);
  });

  it('renders navigation expansions with subNav inside it', async () => {
    const wrapper = mount(WtNavigationBar, {
      global: {
        plugins: [router],
      },
      props: { nav },
    });
    wrapper.find('.wt-navigation-bar__nav-expansion').trigger('click');
    await wrapper.vm.$nextTick();
    const navExpansion = nav
    .find((nav) => nav.subNav)
      .subNav.length;
    expect(wrapper
    .findAll('.wt-navigation-bar__nav-item-link--subnav')
      .length)
    .toBe(navExpansion);
  });

  it('correctly computes subNav nested routes', async () => {
    const wrapper = mount(WtNavigationBar, {
      global: {
        plugins: [router],
      },
      props: { nav },
    });
    await wrapper.find('.wt-navigation-bar__nav-expansion').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent('.wt-navigation-bar__nav-item-link--subnav')
    .attributes('href'))
    .toBe('/2/3');
  });
});
