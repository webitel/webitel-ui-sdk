<template>
  <div>{{ localeValue }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { BooleanOptions } from '../../../enums/boolean-options';

const props = defineProps<{
  value: boolean;
}>();
const { t } = useI18n();

const localeValue = computed(() => {
  const match = BooleanOptions.find(
    (el) => el.value === props.value.toString(),
  );
  return match ? t(match.locale) : '';
});
</script>

<style scoped></style>
