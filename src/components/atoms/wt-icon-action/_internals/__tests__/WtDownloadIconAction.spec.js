import { shallowMount } from '@vue/test-utils';
import WtDownloadIconAction from '../wt-download-icon-action.vue';

describe('WtDownloadIconAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtDownloadIconAction);
    expect(wrapper.exists()).toBe(true);
  });
});
