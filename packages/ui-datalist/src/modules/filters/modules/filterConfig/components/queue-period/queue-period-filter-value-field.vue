<template>
  <wt-select
    :label="labelValue"
    :options="QueuePeriodOptions"
    :value="model"
    :v="!disableValidation && v$.model"
    multiple
    track-by="value"
    use-value-from-options-by-prop="value"
    @input="model = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { QueuePeriodOptions } from '../../enums/options/QueuePeriodOptions';
import { IQueuePeriodFilterConfig } from '../queue-period';

const model = defineModel<string>();
const { t } = useI18n();

const props = defineProps<{
  filterConfig?: IQueuePeriodFilterConfig;
  disableValidation?: boolean;
}>();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);

v$.value.$touch();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const labelValue = computed(() =>
  t(`webitelUI.filters.${props?.filterConfig?.showNameFilter ?
    props?.filterConfig.name : 'filterValue'}`))

onMounted(() => {
  if (!props?.disableValidation) v$.value.$touch();
});

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped></style>
