import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useValidation({ v, customValidators }) {
  const { t } = useI18n();
  const isValidation = computed(() => !!v.value && !!Object.keys(v.value).length);
  const invalid = computed(() => isValidation.value && v.value.$error);

  const validationText = computed(() => {
    let validationText = '';
    if (isValidation && invalid) {
      if (v.required?.$invalid) validationText = t('validation.required');
      else if (v.numeric?.$invalid) validationText = t('validation.numeric');
      else if (v.email?.$invalid) validationText = t('validation.email');
      else if (v.gatewayHostValidator?.$invalid) validationText = t('validation.gatewayHostValidator');
      else if (v.ipValidator?.$invalid) validationText = t('validation.ipValidator');
      else if (v.macValidator?.$invalid) validationText = t('validation.macValidator');
      else if (v.minValue?.$invalid) validationText = `${t('validation.minValue')} ${v.minValue.$params.min}`;
      else if (v.maxValue?.$invalid) validationText = `${t('validation.maxValue')} ${v.maxValue.$params.max}`;
      else if (v.sipAccountValidator?.$invalid) validationText = t('validation.sipAccountValidator');
      else if (v.minLength?.$invalid) validationText = `${t('validation.minLength')} ${v.minLength.$params.min}`;
      else if (v.url?.$invalid) validationText = `${t('validation.url')}`;
      else if (v.regExpValidator?.$invalid) validationText = `${t('validation.regExpValidator')}`;
      else if (v.sameAs?.$invalid) validationText = `${t('validation.sameAs')}`;
      else if (v.domainValidator?.$invalid) validationText = `${t('validation.domainValidator')}`;
      else if (v.decimalValidator?.$invalid) validationText = `${t('validation.decimalValidator')} ${v.decimalValidator.$params.count}`;
      else if (v.integer?.$invalid) validationText = `${t('validation.integer')}`;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const { name, text } of customValidators) {
      if (v[name]?.$invalid) validationText = text;
    }
    return validationText;
  });

  return {
    isValidation,
    invalid,
    validationText,
  };
}
