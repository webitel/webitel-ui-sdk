import { useVuelidate } from '@vuelidate/core';

export const useValidate = (schema, data) => {
  const v$ = useVuelidate(schema, { itemInstance: data  }, { $autoDirty: true });

  return {
    v$,
    invalid: v$.$invalid,
  };
}
