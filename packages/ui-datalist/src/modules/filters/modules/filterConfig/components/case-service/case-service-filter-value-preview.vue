<template>
  <lookup-filter-value-preview v-bind="props" />
</template>

<script lang="ts" setup>
import { CasesService } from 'webitel-sdk';

import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
  /**
   * would be great to use generated type for this
   * */
  value: CasesService[];
}>();
</script>

<style scoped></style>
