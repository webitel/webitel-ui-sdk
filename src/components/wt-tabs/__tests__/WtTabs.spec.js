import { shallowMount } from '@vue/test-utils';
import WtTabs from '../wt-tabs.vue';

const tabs = [{ value: 'tab1', text: 'default' }];
describe('WtTabs', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtTabs);
    expect(wrapper.classes('wt-tabs')).toBe(true);
  });

  it('component emits change at tab click', () => {
    const wrapper = shallowMount(WtTabs, {
      props: { tabs },
    });
    wrapper.find('.wt-tab').trigger('click');
    expect(wrapper.emitted().change.pop()).toEqual([tabs[0]]);
  });

  it('renders tab default content', () => {
    const wrapper = shallowMount(WtTabs, {
      props: { tabs },
    });
    expect(wrapper.find('.wt-tab').text()).toBe(tabs[0].text);
  });

  it('renders tab custom content via default slot', () => {
    const custom = 'custom name';
    const wrapper = shallowMount(WtTabs, {
      props: { tabs },
      slots: {
        tab1: custom,
      },
    });
    expect(wrapper.find('.wt-tab').text()).toBe(custom);
  });
});
