<template>
  <lookup-filter-value-preview v-bind="props" />
</template>

<script lang="ts" setup>
import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
  /**
   * would be great to use generated type for this
   * */
  value: Record<string, unknown>[];
}>();
</script>

<style scoped></style>
