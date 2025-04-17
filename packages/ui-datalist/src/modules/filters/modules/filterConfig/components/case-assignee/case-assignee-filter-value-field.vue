<template>
  <wt-select
    :close-on-select="false"
    :label="t('webitelUI.filters.filterValue')"
    :search-method="props.filterConfig.searchRecords"
    :v="v$.model.list"
    :value="model?.list"
    multiple
    track-by="id"
    use-value-from-options-by-prop="id"
    @input="model.list = $event"
  />
  <wt-checkbox
    :label="t('reusable.showUnassigned')"
    :selected="model?.unassigned"
    :v="v$.model.unassigned"
    @change="model.unassigned = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { WtCheckbox, WtSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {WtSysTypeFilterConfig} from "../../classes/FilterConfig";

type ModelValue = {
  list: string[];
  unassigned: boolean;
};

const model = defineModel<ModelValue>();

const props = defineProps<{
  filterConfig: WtSysTypeFilterConfig;
}>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
const { t } = useI18n();

const initModel = () => {
  if (!model.value) {
    model.value = {
      list: [],
      unassigned: false,
    };
  }
};
onMounted(() => initModel());

const v$ = useVuelidate(
  computed(() => ({
    model: {
      list: { required: requiredIf(() => !model.value.unassigned) },
      unassigned: { required: requiredIf(() => !model.value.list.length) },
    },
  })),
  { model },
  { $autoDirty: true },
);
v$.value.$touch();

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped></style>
