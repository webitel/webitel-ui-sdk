import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
export function useValidation(props) {
  const isValidation = computed(() => !!props.v && !!Object.keys(props.v).length);
  const invalid = computed(() => isValidation.value && props.v.$error);

  const validationText = computed(() => {
    let validationText = '';
    if (isValidation && invalid) {
      if (props.v.required?.$invalid) validationText = t('validation.required');
      else if (props.v.numeric?.$invalid) validationText = t('validation.numeric');
      else if (props.v.email?.$invalid) validationText = t('validation.email');
      else if (props.v.gatewayHostValidator?.$invalid) validationText = t('validation.gatewayHostValidator');
      else if (props.v.ipValidator?.$invalid) validationText = t('validation.ipValidator');
      else if (props.v.macValidator?.$invalid) validationText = t('validation.macValidator');
      else if (props.v.minValue?.$invalid) validationText = `${t('validation.minValue')} ${props.v.minValue.$params.min}`;
      else if (props.v.maxValue?.$invalid) validationText = `${t('validation.maxValue')} ${props.v.maxValue.$params.max}`;
      else if (props.v.sipAccountValidator?.$invalid) validationText = t('validation.sipAccountValidator');
      else if (props.v.minLength?.$invalid) validationText = `${t('validation.minLength')} ${props.v.minLength.$params.min}`;
      else if (props.v.url?.$invalid) validationText = `${t('validation.url')}`;
      else if (props.v.regExpValidator?.$invalid) validationText = `${t('validation.regExpValidator')}`;
      else if (props.v.sameAs?.$invalid) validationText = `${t('validation.sameAs')}`;
      else if (props.v.domainValidator?.$invalid) validationText = `${t('validation.domainValidator')}`;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const { name, text } of props.customValidators) {
      if (props.v[name]?.$invalid) validationText = text;
    }
    return validationText;
  });

  return {
    isValidation,
    invalid,
    validationText,
  };
}
