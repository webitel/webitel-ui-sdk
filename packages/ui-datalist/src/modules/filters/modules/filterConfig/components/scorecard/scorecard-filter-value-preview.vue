<template>
  <lookup-filter-value-preview v-bind="props" />
</template>

<script lang="ts" setup>
import type { EngineAuditForm } from '@webitel/api-services/gen/models';

import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
	value: EngineAuditForm[];
}>();
</script>
