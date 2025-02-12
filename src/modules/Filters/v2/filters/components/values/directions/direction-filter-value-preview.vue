<template>
  <div>
    {{ t(`calls.direction.${value}`) }}
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const props = defineProps<{
  value: number[];
}>();

const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
