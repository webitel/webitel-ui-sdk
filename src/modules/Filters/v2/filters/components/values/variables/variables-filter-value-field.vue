<template>
  <wt-input
    v-model="model"
    :v="v$.model"
    class="variables-filter-value-field"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, watch } from 'vue';

import variableSearchValidator from '../../../../../../../validators/variableSearchValidator/variableSearchValidator';

type ModelValue = string;

const model = defineModel<ModelValue>();
if (!model.value) {
  model.value = '';
}

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
