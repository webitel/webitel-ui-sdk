import { shallowMount } from '@vue/test-utils';
import AuditFormQuestionWriteWrapper from '../audit-form-question-write-wrapper.vue';

describe('AuditFormQuestionWriteWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionWriteWrapper, {
      props: {
        question: {},
        v: {
          question: {},
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
