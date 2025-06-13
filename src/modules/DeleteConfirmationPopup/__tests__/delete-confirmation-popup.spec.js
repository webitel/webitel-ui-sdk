import { mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

import { useValidation } from '../../../mixins/validationMixin/useValidation';
import DeleteConfirmationPopup from '../components/delete-confirmation-popup.vue';

vi.mock('../../../mixins/validationMixin/useValidation.js');

useValidation.mockImplementation(() => ({
  isValidation: ref(false),
  invalid: ref(false),
  validationText: ref(''),
}));

describe('DeleteConfirmationPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback: vi.fn(),
      },
    });
    expect(wrapper.classes('delete-confirmation-popup')).toBe(true);
  });

  it('yes button called props callback', async () => {
    const callback = vi.fn();
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback,
      },
    });
    const button = wrapper
      .findAllComponents({ name: 'wt-button' })
      .find((btn) => btn.text().includes('Yes'));
    expect(button.text()).toContain('Yes');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(callback).toHaveBeenCalled();
  });

  it('popup message block have delete count', () => {
    const deleteCount = 123;
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount,
        callback: vi.fn(),
      },
    });
    expect(
      wrapper.find('.delete-confirmation-popup__content').text(),
    ).toContain(deleteCount.toString());
  });

  it('yes button emitted close', async () => {
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback: vi.fn(),
      },
    });
    const button = wrapper
      .findAllComponents({ name: 'wt-button' })
      .find((btn) => btn.text().includes('Yes'));
    await button.vm.$emit('close');
    await wrapper.vm.$nextTick();
    expect(button.emitted('close')).toBeTruthy();
  });

  it('no button emitted close', async () => {
    const wrapper = mount(DeleteConfirmationPopup, {
      props: {
        deleteCount: 1,
        callback: vi.fn(),
      },
    });
    const button = wrapper
      .findAllComponents({ name: 'wt-button' })
      .find((btn) => btn.text().includes('No'));
    await button.vm.$emit('close');
    await wrapper.vm.$nextTick();
    expect(button.emitted('close')).toBeTruthy();
  });
});
