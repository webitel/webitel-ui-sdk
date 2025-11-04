<template>
  <wt-select
    :close-on-select="false"
    :label="labelValue"
    :options="QueueTypeOptions"
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

import  { QueueTypeOptions } from '../../enums/options/QueueTypeOptions';
import { IQueueTypeFilterConfig } from './index';

const model = defineModel<string>();
const { t } = useI18n();

const props = defineProps<{
  filterConfig?: IQueueTypeFilterConfig;
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

onMounted(() => {
  if (!props?.disableValidation) v$.value.$touch();
});

const labelValue = computed(() =>
  t(`webitelUI.filters.${props?.filterConfig?.showNameFilter ?
    props?.filterConfig.name : 'filterValue'}`))

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped></style>
