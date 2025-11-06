<template>
  <wt-select
    :label="labelValue"
    :options="options"
    :value="model"
    :v="!disableValidation && v$.model"
    track-by="value"
    option-label="label"
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

import { useQueueTypeOptions } from '../../composables/useQueueTypeOptions';
import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

const model = defineModel<string>();
const { t } = useI18n();

const props = defineProps<{
  filterConfig?: WtSysTypeFilterConfig;
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
  t(`webitelUI.filters.${props?.filterConfig?.showFilterName ?
    props?.filterConfig.name : 'filterValue'}`));

const { options } = useQueueTypeOptions();

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
