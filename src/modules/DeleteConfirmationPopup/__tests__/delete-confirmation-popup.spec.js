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
    expect(button.text()).toContain('Yes');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(callback).toHaveBeenCalled();
  });

  it('renders delete popup message block have', () => {
    const deleteCount = 123;
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount,
        callback: jest.fn(),
      },
    });
    expect(wrapper.find('.delete-confirmation-popup__content').text())
      .toContain(deleteCount.toString());
  });

  it('renders delete popup message block', async() => {
    const wrapper = mount(DeleteConfirmationPopup);
    const button = wrapper.findAllComponents({name: 'wt-button'}).find((btn) => btn.text().includes('Yes'));
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('renders delete popup message block', async() => {
    const wrapper = mount(DeleteConfirmationPopup);
    const button = wrapper.findAllComponents({name: 'wt-button'}).find((btn) => btn.text().includes('No'));
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
