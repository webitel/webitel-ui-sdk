import { shallowMount } from '@vue/test-utils';
import WtSaveFailedPopup from '../wt-save-failed-popup.vue';

describe('WtSaveFailedPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSaveFailedPopup);
    expect(wrapper.classes('wt-save-failed-popup')).toBe(true);
  });
});
