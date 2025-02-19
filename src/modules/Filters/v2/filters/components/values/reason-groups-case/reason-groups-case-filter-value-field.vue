<template>
  <div>
    <wt-select
      :clearable="false"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="closeReasonsSearchMethod"
      :value="closeReason"
      :v="v$.closeReason"
      track-by="id"
      use-value-from-options-by-prop="id"
      @input="onCloseReasonUpdate($event)"
    />

    <wt-select
      v-if="closeReason"
      :clearable="false"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="statusesSearchMethodWrapper"
      :value="model"
      :v="v$.model"
      :disabled="!closeReason"
      :options="reasonsList"
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
  closeReasonsConditionsSearchMethod,
  closeReasonsSearchMethod,
} from './config.js';

const model = defineModel<string>();
const { t } = useI18n();

const closeReason = ref(null);
const reasonsList = ref([]);

const onCloseReasonUpdate = async (val: string) => {
  closeReason.value = val;

  if (val) {
    const { items } = await statusesSearchMethodWrapper();
    if (items.length) {
      reasonsList.value = items;
    }
  }
};

const statusesSearchMethodWrapper = async (params) => {
  return await closeReasonsConditionsSearchMethod({
    parentId: closeReason.value,
  });
};

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
    closeReason: {
      required,
    },
  })),
  { model, closeReason },
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
