<template>
  <wt-select
    :label="labelValue"
    :search-method="props.filterConfig.searchRecords"
    :v="!disableValidation && v$?.model"
    :value="model"
    multiple
    option-label="label"
    track-by="label"
    v-bind="$attrs"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted,watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

const props = defineProps<{
  filterConfig: WtSysTypeFilterConfig;
  disableValidation?: boolean;
  hideLabel?: boolean;
}>();

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
const { t } = useI18n();

const labelValue = computed(() => props?.hideLabel ? null : t('webitelUI.filters.filterValue'));

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);

onMounted(() => {
  if (!props?.disableValidation) v$.value.$touch();
});

watch(
  () => v$?.value?.$invalid,
  (invalid) => {
    if (v$?.value) {
      emit('update:invalid', invalid);
    }
  },
  { immediate: true });

const handleInput = (value: ModelValue) => {
  model.value = value;
};
</script>

<style scoped></style>
