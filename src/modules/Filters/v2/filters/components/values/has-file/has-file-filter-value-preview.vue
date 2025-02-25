<template>
  <div>{{ localeValue }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  value: boolean;
}>();
const { t } = useI18n();

const localeValue = computed(() => {
  return props.value ? t('vocabulary.yes') : t('vocabulary.no');
});
</script>

<style lang="scss" scoped></style>
