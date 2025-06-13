import {
  RegleSchema,
} from '@regle/schemas';
import { computed, Ref } from 'vue';

export const useValidation = <TState, TSchema>({
        validationSchema,
                              }: {
  validationSchema: Ref<RegleSchema<TState, TSchema>>,
}) => {
  const disabledSave = computed(() => {
    return validationSchema.value.r$.$error;
  });

  const isEdited = computed(() => {
    return validationSchema.value.r$.$anyEdited;
  });

  const touch = () => {
    validationSchema.value.r$.$touch();
  };

  const checkIfInvalid = () => {
    touch();
    return disabledSave.value;
  };

  return {
    disabledSave,
    isEdited,
    touch,
    checkIfInvalid,
  };
};
