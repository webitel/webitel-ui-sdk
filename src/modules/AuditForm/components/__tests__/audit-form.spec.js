import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import { useDestroyableSortable } from '../../../../composables/useDestroyableSortable/useDestroyableSortable.js';
import { generateQuestionSchema } from '../../schemas/AuditFormQuestionSchema.js';
import AuditForm from '../audit-form.vue';

vi.mock(
  '../../../../composables/useDestroyableSortable/useDestroyableSortable.js',
);

useDestroyableSortable.mockImplementation(() => ({
  reloadSortable: ref(false),
}));

describe('AuditForm', () => {
  it('renders a component', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: '',
        questions: [],
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('add question button triggers update question event', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [],
      },
    });
    await wrapper.findComponent('.audit-form__add-button').vm.$emit('click');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    console.info(wrapper.html());
    expect(wrapper.emitted()['update:questions'][0][0]).toEqual([
      generateQuestionSchema({ required: true }),
    ]);
  });
  it('delete event from child question emits update without passed question', async () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [generateQuestionSchema()],
      },
    });
    await wrapper
      .findComponent({ name: 'audit-form-question' })
      .vm.$emit('delete', { key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0]).toEqual([]);
  });
  it('copy event from child question emits update with duplicated questions', async () => {
    const question = generateQuestionSchema();
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'create',
        questions: [question],
      },
    });
    await wrapper
      .findComponent({ name: 'audit-form-question' })
      .vm.$emit('copy', { question, key: 0 });
    expect(wrapper.emitted()['update:questions'][0][0]).toEqual([
      question,
      question,
    ]);
  });
  it('initializes result depending on passed questions', () => {
    const wrapper = mount(AuditForm, {
      props: {
        mode: 'fill',
        questions: [
          generateQuestionSchema(),
          generateQuestionSchema(),
          generateQuestionSchema(),
        ],
      },
    });
    expect(wrapper.emitted()['update:result'][0][0]).toEqual([{}, {}, {}]);
  });
});
