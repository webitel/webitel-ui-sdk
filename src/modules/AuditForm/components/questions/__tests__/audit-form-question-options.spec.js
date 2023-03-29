import { shallowMount } from '@vue/test-utils';
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
});
