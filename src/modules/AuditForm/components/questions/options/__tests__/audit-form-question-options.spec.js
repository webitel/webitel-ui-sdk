import { shallowMount, mount } from '@vue/test-utils';
import AuditFormQuestionOptions from '../audit-form-question-options.vue';

describe('AuditFormQuestionOptions', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionOptions, {
      props: {
        question: {},
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('adds new question option at "add" button click', () => {
    const wrapper = shallowMount(AuditFormQuestionOptions, {
      props: {
        question: { options: [{}] },
        mode: 'write',
      },
    });
    wrapper.findComponent('.audit-form-question-options-write__add-button').vm.$emit('click');
    expect(wrapper.emitted()['change:question'][0][0].options.length).toBe(2);
  });
  it('deletes existing question option at "delete" icon-btn click', () => {
    const wrapper = mount(AuditFormQuestionOptions, {
      props: {
        question: { options: [{}] },
        mode: 'write',
      },
    });
    const writeRow = wrapper.findComponent({ name: 'audit-form-question-options-write-row' });
    writeRow.vm.$emit('delete');
    expect(wrapper.emitted()['change:question'][0][0].options.length).toBe(0);
  });
  it('emits result change with selected radio option score', () => {
    const score = 11;
    const wrapper = shallowMount(AuditFormQuestionOptions, {
      props: {
        question: { options: [{ score }] },
        mode: 'read',
      },
    });
    wrapper.findComponent({ name: 'wt-radio' }).vm.$emit('input', { score });
    expect(wrapper.emitted()['change:result'][0][0]).toEqual({ score });
  });
});
