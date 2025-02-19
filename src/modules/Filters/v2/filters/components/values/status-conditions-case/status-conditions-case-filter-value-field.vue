<template>
  <div>
    <wt-select
      :clearable="false"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="statusesSearchMethod"
      :value="caseStatus"
      :v="v$.caseStatus"
      track-by="id"
      use-value-from-options-by-prop="id"
      @input="onCaseStatusUpdate($event)"
    />

    <wt-select
      v-if="caseStatus"
      :clearable="false"
      :label="t('webitelUI.filters.filterValue')"
      :value="model"
      :v="v$.model"
      :disabled="!caseStatus"
      :options="statusesList"
      multiple
      use-value-from-options-by-prop="id"
      @input="model = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import {
  statusesConditionsSearchMethod,
  statusesSearchMethod,
} from './config.js';

const model = defineModel<string>();
const { t } = useI18n();

const caseStatus = ref(null);
const statusesList = ref([]);

const onCaseStatusUpdate = async (val: string) => {
  caseStatus.value = val;

  if (val) {
    const { items } = await statusesSearchMethodWrapper();
    if (items.length) {
      statusesList.value = items;
    }
  }
};

const statusesSearchMethodWrapper = async (params = undefined) => {
  return await statusesConditionsSearchMethod({
    parentId: caseStatus.value,
    ...params,
  });
};

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
    caseStatus: {
      required,
    },
  })),
  { model, caseStatus },
  { $autoDirty: true },
);

v$.value.$touch();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
