import { shallowMount, mount } from '@vue/test-utils';
import WtTagsInput from '../wt-tags-input.vue';
import WtLabel from '../../wt-label/wt-label.vue';

describe('WtTagsInput', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTagsInput);
    expect(wrapper.classes('wt-tags-input')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = mount(WtTagsInput, {
      stubs: { WtLabel },
      props: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('by default emits "input" event at native "tag" event', () => {
    const tag = '123';
    const wrapper = mount(WtTagsInput, {
      props: {
        value: [],
      },
    });
    wrapper.findComponent({ name: 'vue-multiselect' }).vm.$emit('tag', tag);
    expect(wrapper.emitted().input[0][0]).toEqual(tag);
  });

  it('in manual mode doesnt emit "input" event at native "tag" event', () => {
    const tag = '123';
    const wrapper = mount(WtTagsInput, {
      props: {
        value: [],
        manualTagging: true,
      },
    });
    wrapper.findComponent({ name: 'vue-multiselect' }).vm.$emit('tag', tag);
    expect(wrapper.emitted().input).toBeFalsy();
  });
});
