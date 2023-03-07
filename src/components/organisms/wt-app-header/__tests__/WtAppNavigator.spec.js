import { shallowMount } from '@vue/test-utils';
import WebitelApplications from '../../../../enums/WebitelApplications/WebitelApplications.enum';
import WtAppNavigator from '../wt-app-navigator.vue';

const apps = [
  { name: WebitelApplications.ADMIN, href: '' },
  { name: WebitelApplications.HISTORY, href: '' },
  { name: WebitelApplications.SUPERVISOR, href: '' },
];
describe('WtAppNavigator', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtAppNavigator);
    expect(wrapper.classes('wt-app-navigator')).toBe(true);
  });
  it('renders specified app cards', () => {
    const wrapper = shallowMount(WtAppNavigator, {
      props: {
        apps,
      },
    });
    expect(wrapper.findAll('.wt-app-navigator__card').length).toBe(3);
  });
});
