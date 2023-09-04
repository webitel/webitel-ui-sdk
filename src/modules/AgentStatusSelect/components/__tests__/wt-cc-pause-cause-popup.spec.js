import { shallowMount, mount } from '@vue/test-utils';
import WtCcPauseCausePopup from '../_internals/wt-cc-pause-cause-popup.vue';

describe('Pause cause popup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtCcPauseCausePopup);
    expect(wrapper.exists())
      .toBe(true);
  });
  it('at option input event, sets "selected" its value', () => {
    const value = 'jest';
    const wrapper = mount(WtCcPauseCausePopup, {
      props: { options: [{ value }] },
    });
    wrapper.findComponent({ name: 'wt-radio' }).vm.$emit('input');
    expect(wrapper.vm.selected.value).toEqual(value);
  });
});
