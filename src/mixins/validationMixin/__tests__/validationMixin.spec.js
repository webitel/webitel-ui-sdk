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
      props: {
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
      props: {
        v: {
          $error: true,
          email: { $invalid: true },
        },
      },
    });
    expect(wrapper.vm.validationText).toBe('Should look like email');
  });

  it('prioritizes error messages', () => {
    wrapper = shallowMount(Component, {
      props: {
        v: {
          $error: true,
          required: { $invalid: true },
        },
      },
    });
    expect(wrapper.vm.validationText).toBe('Field is required');
  });
});
