import { shallowMount } from '@vue/test-utils';
import { EngineAuditQuestionType } from 'webitel-sdk';
import {
  generateQuestionOptionsSchema,
} from '../../schemas/AuditFormQuestionOptionsSchema.js';
import { generateQuestionSchema } from '../../schemas/AuditFormQuestionSchema.js';
import {
  generateQuestionScoreSchema,
} from '../../schemas/AuditFormQuestionScoreSchema.js';
import AuditFormQuestionWriteWrapper
  from '../audit-form-question-write-wrapper.vue';

const v = { question: {} };

describe('AuditFormQuestionWriteWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionWriteWrapper, {
      props: {
        question: {},
        v,
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('correctly changes question', () => {
    const question = generateQuestionSchema();
    const wrapper = shallowMount(AuditFormQuestionWriteWrapper, {
      props: {
        question,
        v,
      },
    });
    wrapper.findComponent({ name: 'wt-switcher' })
    .vm
    .$emit('change', !question.required);
    expect(wrapper.emitted()['change:question'][0][0].required)
    .toBe(!question.required);
  });
  it('correctly changes question type to Score', () => {
    const question = {};
    const wrapper = shallowMount(AuditFormQuestionWriteWrapper, {
      props: {
        question,
        v,
      },
    });
    wrapper.find('.audit-form-question-write-content-question')
    .findComponent({ name: 'wt-select' })
    .vm
    .$emit('input', { value: EngineAuditQuestionType.Score });
    expect(wrapper.emitted()['change:question'][0][0])
    .toEqual(generateQuestionScoreSchema());
  });
  it('correctly changes question type to Options', () => {
    const question = {};
    const wrapper = shallowMount(AuditFormQuestionWriteWrapper, {
      props: {
        question,
        v,
      },
    });
    wrapper.find('.audit-form-question-write-content-question')
    .findComponent({ name: 'wt-select' })
    .vm
    .$emit('input', { value: EngineAuditQuestionType.Option });
    expect(wrapper.emitted()['change:question'][0][0])
    .toEqual(generateQuestionOptionsSchema());
  });
});
