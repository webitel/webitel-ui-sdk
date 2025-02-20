<template>
  <wt-checkbox
    :label="t('reusable.showUnassigned')"
    :selected="model?.unassigned"
    @change="model.unassigned = $event"
  />
  <wt-select
    :close-on-select="false"
    :label="t('webitelUI.filters.filterValue')"
    :search-method="searchMethod"
    :v="v$.model.list"
    :value="model?.list"
    multiple
    track-by="id"
    use-value-from-options-by-prop="id"
    @input="model.list = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { searchMethod } from './config.js';
import WtCheckbox from "../../../../../../../components/wt-checkbox/wt-checkbox.vue";

type ModelValue = {
  list: string[];
  unassigned: boolean;
};

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      list: { required },
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

const initModel = () => {
  if(!model.value) {
    model.value = {
      list: [],
      unassigned: false,
    };
  }
}
onMounted(() => initModel());
</script>

<style lang="scss" scoped></style>
