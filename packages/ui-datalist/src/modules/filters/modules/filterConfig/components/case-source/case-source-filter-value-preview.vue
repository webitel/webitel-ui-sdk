<template>
  <lookup-filter-value-preview v-bind="props" />
</template>

<script lang="ts" setup>
import { CasesSource } from 'webitel-sdk';

import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
  value: CasesSource[];
}>();
</script>

<style scoped></style>
