import { shallowMount } from '@vue/test-utils';
import WtTextarea from '../wt-textarea.vue';
import WtLabel from '../../wt-label/wt-label.vue';

describe('WtTextarea', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTextarea, {
      stubs: {
        WtLabel,
      },
    });
    expect(wrapper.classes('wt-textarea')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtTextarea, {
      stubs: {
        WtLabel,
      },
      propsData: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('emits "Enter" event if chat-mode prop is passed', () => {
    const wrapper = shallowMount(WtTextarea, {
      stubs: {
        WtLabel,
      },
      propsData: { chatMode: true },
    });
    wrapper.find('.wt-textarea__textarea').trigger('keypress', { key: 'Enter' });
    expect(wrapper.emitted().enter).toBeTruthy();
  });

  it('do not emit "Enter" event if chat-mode prop is not passed', () => {
    const wrapper = shallowMount(WtTextarea, {
      stubs: {
        WtLabel,
      },
    });
    wrapper.find('.wt-textarea__textarea').trigger('keypress', { key: 'Enter' });
    expect(wrapper.emitted().enter).toBeFalsy();
  });
});
