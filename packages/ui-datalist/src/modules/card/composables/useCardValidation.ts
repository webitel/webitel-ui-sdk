import {
  RegleSchema,
} from '@regle/schemas';
import { computed, Ref } from 'vue';

export const useCardValidation = <TState, TSchema>({
        validationSchema,
                              }: {
  validationSchema: Ref<RegleSchema<TState, TSchema>>,
}) => {
  const modelValue = computed(() => {
    return validationSchema.value.r$.$value;
  });

  const validationFields = computed(() => {
    return validationSchema.value.r$.$fields;
  });

  const hasValidationErrors = computed(() => {
    return validationSchema.value.r$.$error;
  });

  const validate = () => {
    return validationSchema.value.r$.$validate();
  };

  return {
    modelValue,
    validationFields,
    hasValidationErrors,

    validate,
  };
};
