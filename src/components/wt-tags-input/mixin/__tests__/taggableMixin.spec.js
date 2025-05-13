import { mount, shallowMount } from '@vue/test-utils';

import taggableMixin from '../taggableMixin.js';

describe('taggableMixin', () => {
  const Component = {
    render() {},
    mixins: [taggableMixin],
  };

  it('renders a component', () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.exists()).toBe(true);
  });

  it('Methods are called correctly', () => {
    const searchQuery = '123';
    const wrapper = mount(Component);

    wrapper.vm.$emit('tag', searchQuery);

    expect(wrapper.emitted().tag).toBeTruthy();
    expect(wrapper.emitted().input).toBeFalsy();
  });
});
