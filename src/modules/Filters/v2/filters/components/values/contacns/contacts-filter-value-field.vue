<template>
  <wt-select
    :close-on-select="false"
    :search-method="searchMethod"
    :value="model"
    multiple
    use-value-from-options-by-prop="id"
    class="contacts-filter-value-field"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';

import WtSelect from '../../../../../../../components/wt-select/wt-select.vue';
import { searchMethod } from './config.js';

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
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

const handleInput = (value: ModelValue) => {
  model.value = value;
};
</script>

<style lang="scss" scoped>
.contacts-filter-value-field {
}
</style>
