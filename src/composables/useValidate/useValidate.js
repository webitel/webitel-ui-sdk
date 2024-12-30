import { useVuelidate } from '@vuelidate/core';

export const useValidate = (schema, data) => {
  const v$ = useVuelidate(schema, data, { $autoDirty: true });

  return {
    v$,
    invalid: v$.value?.$invalid,
  };
};
