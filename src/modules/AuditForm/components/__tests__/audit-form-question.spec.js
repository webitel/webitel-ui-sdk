import { shallowMount } from '@vue/test-utils';

import AuditFormQuestion from '../audit-form-question.vue';

describe('AuditFormQuestion', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(AuditFormQuestion, {
      props: {
        question: {},
        result: {},
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
