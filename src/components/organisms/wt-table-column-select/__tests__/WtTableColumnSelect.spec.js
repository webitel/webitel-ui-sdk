import { mount, shallowMount } from '@vue/test-utils';
import WtTableColumnSelect from '../wt-table-column-select.vue';

describe('WtTableColumnSelect', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTableColumnSelect, {
      propsData: {
        headers: [],
      },
    });
    expect(wrapper.classes('wt-table-column-select')).toBe(true);
  });
  it('column select popup is invisible by default', () => {
    const wrapper = shallowMount(WtTableColumnSelect, {
      propsData: {
        headers: [],
      },
    });
    expect(wrapper.find('wt-table-column-select__popup').exists()).toBe(false);
  });
  it('column select popup is opening by icon-btn click', async () => {
    const wrapper = mount(WtTableColumnSelect, {
      propsData: {
        headers: [],
      },
    });
    wrapper.findComponent({ name: 'wt-icon-btn' }).vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.wt-table-column-select__popup').exists()).toBe(true);
  });
});
