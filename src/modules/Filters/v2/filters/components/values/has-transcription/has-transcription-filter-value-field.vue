<template>
  <has-option-filter-value-field
    :model-value="model"
    :v="v$.model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { computed, watch } from 'vue';

import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';
import {HasTranscriptionFilterModelValue} from "./HasTranscriptionFilter";

const model = defineModel<HasTranscriptionFilterModelValue>();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required: (v: HasTranscriptionFilterModelValue) => !(!v && v !== false),
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
