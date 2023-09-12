import {mount, shallowMount} from '@vue/test-utils';
import DeleteConfirmationPopup from '../components/delete-confirmation-popup.vue';
import WtPopup from "@/components/wt-popup/wt-popup";
import AuditForm from "@/modules/AuditForm/components/audit-form";
import {generateQuestionSchema} from "@/modules/AuditForm/schemas/AuditFormQuestionSchema";

describe('WtPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      stubs: { WtBtn: true, WtIcon: true },
    });
    expect(wrapper.classes('.delete-confirmation-popup').isVisible()).toBe(true);
  });

  it('renders delete popup message block', () => {
    const content = 'delete popup message';
    const wrapper = shallowMount(DeleteConfirmationPopup, {
      stubs: { WtIcon: true },
      slots: { main: content },
    });
    expect(wrapper.find('.delete-confirmation-popup__message').text()).toBe(content);
  });
  it('delete event from child question emits update without passed question', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        deleteCount: [generateQuestionSchema()],
      },
    });
    await wrapper.findComponent({ name: 'audit-form-question' }).vm.$emit('delete', { key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0])
      .toEqual([]);
  });
});
