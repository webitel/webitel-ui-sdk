import { shallowMount } from '@vue/test-utils';
import WtTabs from '../wt-tabs.vue';

const tabs = [{ value: 'tab1', text: 'default' }];
describe('WtTabs', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTabs);
    expect(wrapper.classes('wt-tabs')).toBe(true);
  });

  it('renders tab default content', () => {
    const wrapper = shallowMount(WtTabs, {
      propsData: { tabs },
    });
    expect(wrapper.find('.wt-tab').text()).toBe(tabs[0].text);
  });

  it('renders tab custom content via default slot', () => {
    const custom = 'custom name';
    const wrapper = shallowMount(WtTabs, {
      propsData: { tabs },
      slots: {
        tab1: custom,
      },
    });
    expect(wrapper.find('.wt-tab').text()).toBe(custom);
  });
});
