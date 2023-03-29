import { shallowMount } from '@vue/test-utils';
import AuditFormQuestionScore from '../audit-form-question-score.vue';

describe('AuditFormQuestionScore', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestionScore, {
      props: {
        question: {
          min: 0,
          max: 10,
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
