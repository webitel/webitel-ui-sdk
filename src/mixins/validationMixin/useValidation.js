import { computed } from 'vue';

export function useValidation(v) {
  const isValidation = computed(() => !!v && !!Object.keys(v).length);
  const invalid = computed(() => isValidation.value && v.$error);
  return {
    isValidation,
    invalid,
  };
}
