import WtCollapseAction from '../wt-collapse-action.vue';
import { mount } from '@vue/test-utils';

describe('WtCollapseAction', () => {
  it('renders the correct icon when collapsed is true', () => {
    const wrapper = mount(WtCollapseAction, {
      props: {
        collapsed: true,
      },
    });
    expect(wrapper.findComponent({ name: 'wt-icon-btn' }).attributes('icon')).toBe('expand');
  });

  it('renders the correct icon when collapsed is false', () => {
    const wrapper = mount(WtCollapseAction, {
      props: {
        collapsed: false,
      },
    });
    expect(wrapper.findComponent({ name: 'wt-icon-btn' }).attributes('icon')).toBe('collapse');
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(WtCollapseAction);
    await wrapper.findComponent({ name: 'wt-icon-btn' }).trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
