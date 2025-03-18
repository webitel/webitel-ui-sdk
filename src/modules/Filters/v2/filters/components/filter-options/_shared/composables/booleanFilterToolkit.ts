import { useVuelidate } from '@vuelidate/core';
import { computed, ModelRef, type Reactive, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { BooleanFilterModelValue } from '../types/BooleanFilter';

export const usePrettifyBooleanValuePreview = (
  value: Reactive<boolean>,
): { localeValue: Ref<string> } => {
  const { t } = useI18n();

  const localeValue = computed(() => {
    return value ? t('vocabulary.yes') : t('vocabulary.no');
  });

  return { localeValue };
};

export const useBooleanFilterValueValidation = <
  T extends BooleanFilterModelValue,
>(
  model: ModelRef<T>,
) => {
  const v$ = useVuelidate(
    computed(() => ({
      model: {
        required: (v: T) => !(!v && v !== false),
      },
    })),
    { model },
    { $autoDirty: true },
  );

  v$.value.$touch();

  return {
    v$,
  };
};
