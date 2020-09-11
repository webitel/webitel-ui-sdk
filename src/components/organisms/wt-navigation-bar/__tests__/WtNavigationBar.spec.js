import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
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

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('WtNavigationBar', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtNavigationBar);
    expect(wrapper.classes('wt-navigation-bar')).toBe(true);
  });

  it('renders navigation links', () => {
    const wrapper = shallowMount(WtNavigationBar, {
      localVue,
      router,
      propsData: { nav },
    });
    const navLinksLen = nav.filter((nav) => !nav.subNav).length;
    expect(wrapper.findAll('.wt-navigation-bar__nav-item-link').length).toBe(navLinksLen);
  });

  it('renders navigation expansions with subNav inside it', async () => {
    const wrapper = shallowMount(WtNavigationBar, {
      localVue,
      router,
      propsData: { nav },
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
    const wrapper = shallowMount(WtNavigationBar, {
      localVue,
      router,
      propsData: { nav },
    });
    wrapper.find('.wt-navigation-bar__nav-expansion').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.wt-navigation-bar__nav-item-link--subnav').attributes('to'))
      .toBe('/2/3');
  });
});
