<template>
  <wt-input
    v-model="model"
    :label="t('webitelUI.filters.filterValue')"
    :v="v$.model"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import variableSearchValidator from '@webitel/ui-sdk/validators/variableSearchValidator/variableSearchValidator';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

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

<style scoped></style>
