import { shallowMount } from '@vue/test-utils';
import AuditFormQuestionReadWrapper
  from '../audit-form-question-read-wrapper.vue';

describe('AuditFormQuestionReadWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionReadWrapper, {
      props: {
        question: {},
        result: {},
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
