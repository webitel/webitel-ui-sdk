import { shallowMount } from '@vue/test-utils';
import WtPlayer from '../wt-player.vue';

describe('WtPlayer', () => {
  xit('renders a component', () => {
    const wrapper = shallowMount(WtPlayer);
    expect(wrapper.classes('wt-player')).toBe(true);
  });
});
