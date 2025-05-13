<template>
  <lookup-filter-value-preview v-bind="props" />
</template>

<script lang="ts" setup>
import { CasesSLA } from 'webitel-sdk';

import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
  value: CasesSLA[];
}>();
</script>

<style scoped></style>
