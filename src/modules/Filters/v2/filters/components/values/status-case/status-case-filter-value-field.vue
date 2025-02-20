<template>
  <div>
    <wt-select
      :clearable="false"
      :label="t('cases.status')"
      :search-method="caseStatusesSearchMethod"
      :v="v$?.model?.selection"
      :value="model?.selection"
      track-by="id"
      use-value-from-options-by-prop="id"
      @input="changeSelection($event)"
    />

    <wt-select
      v-if="model?.selection"
      :clearable="false"
      :disabled="!model?.selection"
      :label="t('webitelUI.filters.filterValue')"
      :options="conditionList"
      :v="v$?.model?.conditions"
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
import {computed, onMounted, ref, watch} from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { caseStatusesSearchMethod, caseStatusConditionsSearchMethod } from './config.js';

type ModelValue = {
  selection: string;
  conditions: string;
};
const model = defineModel<ModelValue>();
const { t } = useI18n();

const initModel = () => {
  if(!model.value) {
    model.value = {
      selection: '',
      conditions: '',
    };
  } else {
    onSelectionUpdate(model.value.selection);
  }
}
onMounted(() => initModel());

const conditionList = ref([]);

const onSelectionUpdate = async (val: string) => {
  model.value.selection = val;

  if (val) {
    const { items } = await getConditionList();
    if (items.length) {
      conditionList.value = items;
    }
  }
};

const changeSelection = (value) => {
  onSelectionUpdate(value);
  model.value.conditions = '';
}

const getConditionList = async (params = undefined) => {
  return await caseStatusConditionsSearchMethod({
    parentId: model.value.selection,
    ...params,
  });
};

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
  { model, conditionList },
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
