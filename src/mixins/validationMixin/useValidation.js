import { computed, isReactive } from 'vue';
import { useI18n } from 'vue-i18n';

export function useValidation({
                                v: inputV,
                                customValidators: inputCustomValidators,
                              }) {
  const { t } = useI18n();

  // support vue options api, where v is a reactive, not ref
  let v = inputV;
  let customValidators = inputCustomValidators;

  if (isReactive(v)) {
    v = computed(() => inputV);
    customValidators = computed(() => inputCustomValidators);
  }
  // end

  const isValidation = computed(() => !!v && !!v.value &&
    !!Object.keys(v.value).length);
  const invalid = computed(() => isValidation.value && v.value.$error);

  const validationText = computed(() => {
    let validationText = '';
    if (isValidation.value && invalid.value) {
      if (v.value.required?.$invalid) validationText = t('validation.required');
      else if (v.value.numeric?.$invalid) validationText = t('validation.numeric');
      else if (v.value.email?.$invalid) validationText = t('validation.email');
      else if (v.value.gatewayHostValidator?.$invalid) validationText = t('validation.gatewayHostValidator');
      else if (v.value.ipValidator?.$invalid) validationText = t('validation.ipValidator');
      else if (v.value.macValidator?.$invalid) validationText = t('validation.macValidator');
      else if (v.value.minValue?.$invalid) validationText = `${t('validation.minValue')} ${v.value.minValue.$params.min}`;
      else if (v.value.maxValue?.$invalid) validationText = `${t('validation.maxValue')} ${v.value.maxValue.$params.max}`;
      else if (v.value.sipAccountValidator?.$invalid) validationText = t('validation.sipAccountValidator');
      else if (v.value.minLength?.$invalid) validationText = `${t('validation.minLength')} ${v.value.minLength.$params.min}`;
      else if (v.value.url?.$invalid) validationText = `${t('validation.url')}`;
      else if (v.value.regExpValidator?.$invalid) validationText = `${t('validation.regExpValidator')}`;
      else if (v.value.sameAs?.$invalid) validationText = `${t('validation.sameAs')}`;
      else if (v.value.domainValidator?.$invalid) validationText = `${t('validation.domainValidator')}`;
      else if (v.value.decimalValidator?.$invalid) validationText = `${t('validation.decimalValidator')} ${v.value.decimalValidator.$params.count}`;
      else if (v.value.websocketValidator?.$invalid) validationText = `${t('validation.websocketValidator')}`;
      else if (v.value.integer?.$invalid) validationText = `${t('validation.integer')}`;
      else if (v.value.isRegExpMatched?.$invalid) validationText = v.value.isRegExpMatched?.$params?.errorMessage || `${t('validation.isRegExpMatched')} ${v.value.isRegExpMatched?.$params?.regExp}`;
    }

    if (customValidators && customValidators.value) {

      for (const { name, text } of customValidators.value) {
        if (v.value[name]?.$invalid) validationText = text;
      }
      return validationText;
    }
  });

  return {
    isValidation,
    invalid,
    validationText,
  };
}
