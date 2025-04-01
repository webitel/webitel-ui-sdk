<template>
  <wt-select
    :close-on-select="false"
    :label="t('webitelUI.filters.filterValue')"
    :search-method="searchMethod"
    :v="v$.model"
    :value="model"
    multiple
    use-value-from-options-by-prop="id"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSelect } from '@webitel/ui-sdk/src/components/index';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { searchMethod } from './config.js';

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const { t } = useI18n();

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

<style lang="scss" scoped></style>
