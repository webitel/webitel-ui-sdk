import { shallowMount, mount } from '@vue/test-utils';
import AuditFormQuestionOptionsWriteRow from '../audit-form-question-options-write-row.vue';

describe('AuditFormQuestionOptionsWriteRow', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionOptionsWriteRow, {
      props: {
        option: {},
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('emits "delete" event at "delete" icon-btn click', () => {
    const wrapper = mount(AuditFormQuestionOptionsWriteRow, {
      props: {
        option: {},
      },
    });
    const deleteBtn = wrapper.findComponent('.audit-form-question-options-write-row__tooltip').findComponent({ name: 'wt-icon-btn' });
    expect(deleteBtn.attributes().icon).toBe('bucket');
    deleteBtn.vm.$emit('click');
    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
