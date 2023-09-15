import { mount, shallowMount } from '@vue/test-utils';
import DeleteConfirmationPopup from '../components/delete-confirmation-popup.vue';

describe('DeleteConfirmationPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback: jest.fn(),
      },
    });
    expect(wrapper.classes('delete-confirmation-popup')).toBe(true);
  });

  it('delete event from child question emits update without passed question', async () => {
    const callback = jest.fn();
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback,
      },
    });
    const button = wrapper.findAllComponents({name: 'wt-button'}).find((btn) => btn.text().includes('Yes'));
    console.log('button:', button);
    expect(button.text()).toContain('Yes');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(callback).toHaveBeenCalled();
  });

  it('renders delete popup message block', () => {
    const deleteCount = 123;
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount,
      },
    });
    expect(wrapper.find('.delete-confirmation-popup__content').text())
      .toMatch(deleteCount.toString());
  });
});
