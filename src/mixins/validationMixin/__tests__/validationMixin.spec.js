import { shallowMount } from '@vue/test-utils';
import validationMixin from '../validationMixin';

describe('Validation mixin', () => {
  let wrapper;
  const Component = {
    render() {
    },
    mixins: [validationMixin],
  };

  it('detects validation prop', () => {
    wrapper = shallowMount(Component, {
      propsData: {
        v: {
          $error: true,
        },
      },
    });
    expect(wrapper.vm.isValidation).toBeTruthy();
    expect(wrapper.vm.invalid).toBeTruthy();
  });

  it('computes error message on validation error', () => {
    wrapper = shallowMount(Component, {
      propsData: {
        v: {
          $error: true,
          email: false,
        },
      },
    });
    expect(wrapper.vm.validationText).toBe('validation.email');
  });

  it('prioritizes error messages', () => {
    wrapper = shallowMount(Component, {
      propsData: {
        v: {
          $error: true,
          required: false,
        },
      },
    });
    expect(wrapper.vm.validationText).toBe('validation.required');
  });
});
