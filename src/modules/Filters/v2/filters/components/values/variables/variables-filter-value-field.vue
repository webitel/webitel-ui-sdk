<template>
  <wt-input
    v-model="model"
    :v="v$.model"
    :label="t('webitelUI.filters.filterValue')"
    class="variables-filter-value-field"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import variableSearchValidator from '../../../../../../../validators/variableSearchValidator/variableSearchValidator.js';

type ModelValue = string;

const model = defineModel<ModelValue>();
if (!model.value) {
  model.value = '';
}

const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required: variableSearchValidator(),
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

<style lang="scss" scoped>
.variables-filter-value-field {
}
</style>
