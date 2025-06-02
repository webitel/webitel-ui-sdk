import {
  RegleSchema
} from '@regle/schemas';
import { computed } from 'vue';

export const useValidation = <TState, TSchema>({
        validationSchema,
                              }: {
  validationSchema: RegleSchema<TState, TSchema>,
}) => {
  const disabledSave = computed(() => {
    return validationSchema.r$.$error;
  });

  const isEdited = computed(() => {
    return validationSchema.r$.$anyEdited;
  });

  const touch = () => {
    validationSchema.r$.$touch();
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
