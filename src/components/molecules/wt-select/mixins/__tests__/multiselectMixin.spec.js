import { shallowMount } from '@vue/test-utils';
import MultiselectMixin from '../multiselectMixin';

const Component = {
  mixins: [MultiselectMixin],
  render() {},
};

describe('MultiselectMixin', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.exists()).toBe(true);
  });

  it('Correctly computes internal search options', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(Component, {
      propsData: { options },
    });
    expect(wrapper.vm.selectOptions).toBe(options);
  });

  it('Correctly computes internal search options: search case', async () => {
    const options = ['1', '2'];
    const searchOptions = ['1'];
    const wrapper = shallowMount(Component, {
      propsData: { options, searchMethod: () => ({ items: searchOptions }) },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectOptions).toBe(searchOptions);
  });
});
