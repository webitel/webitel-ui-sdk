import { shallowMount } from '@vue/test-utils';
import WtTextarea from '../wt-textarea.vue';
import WtLabel from '../../../atoms/wt-label/wt-label.vue';

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
});
