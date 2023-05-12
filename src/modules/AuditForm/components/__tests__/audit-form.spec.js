import { shallowMount } from '@vue/test-utils';
import AuditForm from '../audit-form.vue';
import { generateQuestionSchema } from '../../schemas/AuditFormQuestionSchema';

import {
  useDestroyableSortable,
} from '../../composables/useDestroyableSortable';

jest.mock('../../composables/useDestroyableSortable');

useDestroyableSortable.mockImplementation(() => ({}));

describe('AuditForm', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: '',
        questions: [],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('add question button triggers update question event', () => {
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: 'create',
        questions: [],
      },
    });
    wrapper.findComponent('.audit-form__add-button').vm.$emit('click');
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([generateQuestionSchema({ required: true })]);
  });
  it('delete event from child question emits update without passed question', () => {
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: 'create',
        questions: [generateQuestionSchema()],
      },
    });
    wrapper.findComponent({ name: 'audit-form-question' }).vm.$emit('delete', { key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([]);
  });
  it('copy event from child question emits update with duplicated questions', () => {
    const question = generateQuestionSchema();
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: 'create',
        questions: [question],
      },
    });
    wrapper.findComponent({ name: 'audit-form-question' }).vm.$emit('copy', { question, key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0])
    .toEqual([question, question]);
  });
  it('initializes result depending on passed questions', () => {
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: 'fill',
        questions: [generateQuestionSchema(), generateQuestionSchema(), generateQuestionSchema()],
      },
    });
    expect(wrapper.emitted()['update:result'][0][0]).toEqual([null, null, null]);
  });
});
