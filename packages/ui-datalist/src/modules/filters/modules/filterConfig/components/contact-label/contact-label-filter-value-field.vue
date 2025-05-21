<template>
  <wt-tags-input
    :label="t('webitelUI.filters.filterValue')"
    :search-method="props.filterConfig.searchRecords"
    :v="v$?.model"
    :value="model"
    option-label="label"
    track-by="label"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { IContactLabelFilterConfig} from './index';

const props = defineProps<{
  filterConfig: IContactLabelFilterConfig;
}>();

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
const { t } = useI18n();

const v$ = computed(() => {
  if (props.filterConfig?.noValidation) return null;
  return useVuelidate(
    computed(() => ({
      model: { required },
    })),
    { model },
    { $autoDirty: true }
  );
});

// Автоматический touch
watch(
  v$,
  (v) => {
    if (v) v.value.$touch();
  },
  { immediate: true }
);

// Эмит ошибки валидации, если валидация активна
watch(
  () => v$.value?.$invalid,
  (invalid) => {
    if (v$?.value) emit('update:invalid', invalid);
  },
  { immediate: true }
);

const handleInput = (value: ModelValue) => {
  model.value = value;
};
</script>

<style scoped></style>
