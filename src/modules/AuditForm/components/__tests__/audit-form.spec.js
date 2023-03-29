import { shallowMount } from '@vue/test-utils';
import AuditForm from '../audit-form.vue';

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
  it('adds new question', () => {
    const wrapper = shallowMount(AuditForm, {
      props: {
        mode: '',
        questions: [],
      },
    });
    wrapper.vm.addQuestion();
    expect(wrapper.emitted()['update:questions']).toBeTruthy();
  });
});
