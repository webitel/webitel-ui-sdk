import { shallowMount } from '@vue/test-utils';
import WtHeaderActions from '../wt-header-actions.vue';

describe('WtHeaderActions', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtHeaderActions);
    expect(wrapper.classes('wt-header-actions')).toBe(true);
  });

  it('renders user data', () => {
    const user = {
      name: 'user nanme',
      account: 'acc@ou.nt',
    };
    const wrapper = shallowMount(WtHeaderActions, {
      props: { user },
    });
    expect(wrapper.find('.wt-header-actions__name').text()).toBe(user.name);
    expect(wrapper.find('.wt-header-actions__account').text()).toBe(user.account);
  });
});
