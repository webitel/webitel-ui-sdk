import { shallowMount } from '@vue/test-utils';
import WtLabel from '../../wt-label.vue';

describe('WtLabel', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtLabel);
    expect(wrapper.classes('wt-label')).toBe(true);
  });
});
