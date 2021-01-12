import { shallowMount } from '@vue/test-utils';
import WtTagsInput from '../wt-tags-input.vue';
import WtLabel from '../../../atoms/wt-label/wt-label.vue';

describe('WtTagsInput', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTagsInput);
    expect(wrapper.classes('wt-tags-input')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtTagsInput, {
      stubs: { WtLabel },
      propsData: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('emits "input" event at native "tags-changed" event', () => {
    const tags = [{ text: '123' }];
    const wrapper = shallowMount(WtTagsInput);
    wrapper.findComponent({ name: 'vue-tags-input' }).vm.$emit('tags-changed', tags);
    expect(wrapper.emitted().input[0][0]).toEqual(tags);
  });

  it('correctly computes autocomplete options', () => {
    const autocompleteItems = [{ name: '123' }, { name: '321' }];
    const autocompleteOptions = [{ name: '123', text: '123' }, { name: '321', text: '321' }];
    const wrapper = shallowMount(WtTagsInput, {
      propsData: { autocompleteItems },
    });
    expect(wrapper.vm.autocompleteOptions).toEqual(autocompleteOptions);
  });

  it('correctly filters autocomplete options with search', () => {
    const autocompleteItems = [{ name: '123' }, { name: '456' }];
    const filteredAutocompleteOptions = [{ name: '123', text: '123' }];
    const wrapper = shallowMount(WtTagsInput, {
      data: () => ({ input: '1' }),
      propsData: { autocompleteItems },
    });
    expect(wrapper.vm.autocompleteOptions).toEqual(filteredAutocompleteOptions);
  });
});
