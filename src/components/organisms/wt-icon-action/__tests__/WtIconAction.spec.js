import { shallowMount } from '@vue/test-utils';
import WtIconAction from '../wt-icon-action.vue';

describe('WtIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIconAction, { props: { action: 'edit' } });
    expect(wrapper.isVisible()).toBe(true);
  });
});
