import { mount, shallowMount } from '@vue/test-utils';

import WtLabel from '../../wt-label/wt-label.vue';
import WtTagsInput from '../wt-tags-input.vue';

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
    expect(wrapper.emitted().input[0][0]).toEqual([tag]);
  });

  it('by default when input taggable initialize options should set from value', () => {
    const wrapper = mount(WtTagsInput, {
      props: {
        value: [
          { label: 'Vue.js', text: 'JavaScript' },
          { label: 'Vue2.js', text: 'JavaScript' },
          { label: 'Vue3.js', text: 'JavaScript' },
        ],
        options: [{ label: 'Vue.js', text: 'JavaScript' }],
      },
    });
    expect(
      wrapper.findComponent({ name: 'vue-multiselect' }).vm.$props.options
        .length,
    ).toEqual(3);
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
