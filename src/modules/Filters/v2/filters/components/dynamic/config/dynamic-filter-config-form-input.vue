<template>
  <wt-input
    v-model="localValue"
    :label="t('webitelUI.filters.filterLabel')"
    :v="v$"
  />
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { maxLength, required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import WtInput from '../../../../../../../components/wt-input/wt-input.vue';

const MAX_STRING_LENGTH = 5;

interface Props {
  value: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:value', val: string): void;
  (e: 'update:invalid', val: boolean): void;
}
const emit = defineEmits<Emits>();

const { t } = useI18n();

const localValue = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit('update:value', val);
  },
});

const v$ = useVuelidate(
  computed(() => ({
    localValue: {
      // maybe make maxLength value by props
      maxLength: maxLength(MAX_STRING_LENGTH),
      required,
    },
  })),
  { localValue },
  { $autoDirty: true },
);

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped lang="scss"></style>
