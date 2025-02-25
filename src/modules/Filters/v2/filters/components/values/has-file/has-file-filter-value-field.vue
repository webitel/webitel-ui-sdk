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
import {HasFileFilterModelValue} from "./HasFileFilter";

const model = defineModel<HasFileFilterModelValue>();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required: (v: HasFileFilterModelValue) => !(!v && v !== false),

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
