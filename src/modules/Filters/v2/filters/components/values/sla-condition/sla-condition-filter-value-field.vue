<template>
  <div>
    <wt-select
      :clearable="false"
      :label="t('cases.appliedSLA')"
      :search-method="slasSearchMethod"
      :v="v$.model.selection"
      :value="model?.selection"
      track-by="id"
      use-value-from-options-by-prop="id"
      @input="updateSelected"
    />

    <wt-select
      v-if="model?.selection"
      :key="model.selection"
      :clearable="false"
      :disabled="!model.selection"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="getConditionList"
      :v="v$.model.conditions"
      :value="model?.conditions"
      multiple
      track-by="id"
      use-value-from-options-by-prop="id"
      @input="model.conditions = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { slasConditionsSearchMethod, slasSearchMethod } from './config.js';

type ModelValue = {
  selection: string;
  conditions: string;
};
const model = defineModel<ModelValue>();
const { t } = useI18n();

const updateSelected = (value) => {
  model.value.selection = value;
  model.value.conditions = '';
};

const getConditionList = async (params) => {
  return await slasConditionsSearchMethod({
    parentId: model.value.selection,
    ...params,
  });
};

const initModel = () => {
  if (!model.value) {
    model.value = {
      selection: '',
      conditions: '',
    };
  }
};
onMounted(() => initModel());
const v$ = useVuelidate(
  computed(() => ({
    model: {
      selection: {
        required,
      },
      conditions: {
        required,
      },
    },
  })),
  { model },
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
