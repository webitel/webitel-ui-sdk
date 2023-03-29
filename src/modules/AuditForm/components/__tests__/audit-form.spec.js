import { shallowMount, mount } from '@vue/test-utils';
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
  it('add question button triggers addQuestion method', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [],
      },
    });
    // const mock = jest.fn();
    const mock = (wrapper.vm.addQuestion = jest.fn());
    // jest.spyOn(wrapper.vm, 'addQuestion').mockImplementationOnce(mock);
    wrapper.findComponent('.audit-form__add-button').vm.$emit('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(mock).toHaveBeenCalled();
  });
  it('addQuestion method emits update event', () => {
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
