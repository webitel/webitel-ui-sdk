import type { RegleFieldStatus } from '@regle/core';
import { computed, ComputedRef, Ref } from 'vue';

export type UseFieldValidationParams = {
  field: Ref<RegleFieldStatus<string>>;
};

export type UseFieldValidationReturn = {
  invalid: ComputedRef<boolean | null>; // null if is not validated
  validationText?: ComputedRef<string>;
};

export const useFieldValidation = ({
  field: fieldRef,
}: UseFieldValidationParams): UseFieldValidationReturn => {

  const invalid = computed(() => {
    return fieldRef.value.$error;
  });

  const validationText = computed(() => {
    return fieldRef.value?.$errors?.at(0);
  });

  return {
    invalid,
    validationText,
  };
};
