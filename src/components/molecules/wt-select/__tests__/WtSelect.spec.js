import { shallowMount } from '@vue/test-utils';
import WtSelect from '../wt-select.vue';
import WtLabel from '../../wt-label/wt-label.vue';

describe('WtSelect', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
    });
    expect(wrapper.classes('wt-select')).toBe(true);
  });

  it('renders label text when passed', () => {
    const label = 'Hello there';
    const wrapper = shallowMount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
      propsData: { label },
    });
    expect(wrapper.find('.wt-label').text()).toBe(label);
  });

  it('Correctly computes internal search options', () => {
    const options = ['1', '2'];
    const wrapper = shallowMount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
      propsData: { options },
    });
    expect(wrapper.vm.selectOptions).toBe(options);
  });

  it('Correctly computes internal search options', async () => {
    const options = ['1', '2'];
    const searchOptions = ['1'];
    const wrapper = shallowMount(WtSelect, {
      stubs: {
        WtLabel,
        WtIcon: true,
      },
      propsData: { options, searchMethod: () => ({ items: searchOptions }) },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectOptions).toBe(searchOptions);
  });
});
