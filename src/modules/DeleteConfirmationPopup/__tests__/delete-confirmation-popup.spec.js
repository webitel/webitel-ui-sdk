import { mount, shallowMount } from '@vue/test-utils';
import DeleteConfirmationPopup from '../components/delete-confirmation-popup.vue';

describe('WtPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      stubs: { WtBtn: true, WtIcon: true },
    });
    expect(wrapper.classes('.delete-confirmation-popup').toBe(true));
  });

  it('renders delete popup message block', () => {
    const content = 'delete popup message';
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      stubs: { WtIcon: true },
      slots: { main: content },
    });
    expect(wrapper.find('.delete-confirmation-popup__message').text())
      .toBe(content);
  });

  it('delete event from child question emits update without passed question', async () => {
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      props: {
        callback: jest.fn(),
      },
    });
    const button = wrapper.getComponent({ name: 'wt-button' });
    expect(wrapper.button.text()).toContain('yes');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.props.callback).toBeCalled();
  });
});
