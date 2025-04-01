<template>
  <wt-input
    :value="model"
    :label="t('webitelUI.filters.filterLabel')"
    :v="v$.model"
    @input="model = $event"
  />
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxLength } from '@vuelidate/validators';
import WtInput from '@webitel/ui-sdk/src/components/wt-input/wt-input.vue';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const MAX_STRING_LENGTH = 50;

const model = defineModel<string>();

interface Emits {
  'update:invalid': [boolean];
}
const emit = defineEmits<Emits>();

const { t } = useI18n();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      // maybe make maxLength value by props
      maxLength: maxLength(MAX_STRING_LENGTH),
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

<style scoped lang="scss"></style>
