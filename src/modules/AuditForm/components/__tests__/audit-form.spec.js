import { mount } from '@vue/test-utils';
import AuditForm from '../audit-form.vue';
import { generateQuestionSchema } from '../../schemas/AuditFormQuestionSchema';

import {
  useDestroyableSortable,
} from '../../composables/useDestroyableSortable';

jest.mock('../../composables/useDestroyableSortable');

useDestroyableSortable.mockImplementation(() => ({}));

describe('AuditForm', () => {
  it('renders a component', () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: '',
        questions: [],
      },
    });
     wrapper.vm.$refs.auditQuestions.value.at(0).activateQuestion = jest.fn()
    expect(wrapper.isVisible()).toBe(true);
  });
  it('add question button triggers update question event', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [],
      },
    });
    wrapper.vm.$refs.auditQuestions.value.at(0).activateQuestion = jest.fn()
    await wrapper.findComponent('.audit-form__add-button').vm.$emit('click');
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([generateQuestionSchema({ required: true })]);
  });
  it('delete event from child question emits update without passed question', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [generateQuestionSchema()],
      },
    });
    wrapper.vm.$refs.auditQuestions.value.at(0).activateQuestion = jest.fn()
    await wrapper.findComponent({ name: 'audit-form-question' }).vm.$emit('delete', { key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([]);
  });
  it('copy event from child question emits update with duplicated questions', async () => {
    const question = generateQuestionSchema();
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [question],
      },
    });
    wrapper.vm.$refs.auditQuestions.value.at(0).activateQuestion = jest.fn()
    await wrapper.findComponent({ name: 'audit-form-question' }).vm.$emit('copy', { question, key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([question, question]);
  });
  it('initializes result depending on passed questions',() => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'fill',
        questions: [generateQuestionSchema(), generateQuestionSchema(), generateQuestionSchema()],
      },
    });
    wrapper.vm.$refs.auditQuestions.value.at(0).activateQuestion = jest.fn()
    expect(wrapper.emitted()['update:result'][0][0]).toEqual([null, null, null]);
  });
});
