import { shallowMount } from '@vue/test-utils';
import WtAppNavigator from '../wt-app-navigator.vue';

const apps = {
  admin: { href: '' },
  agent: { href: '' },
  history: { href: '' },
};
describe('WtAppNavigator', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtAppNavigator);
    expect(wrapper.classes('wt-app-navigator')).toBe(true);
  });
  it('renders specified app cards', () => {
    const wrapper = shallowMount(WtAppNavigator, {
      propsData: {
        apps,
      },
    });
    expect(wrapper.findAll('.wt-app-navigator__card').length).toBe(3);
  });
});
