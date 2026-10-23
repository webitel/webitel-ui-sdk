<template>
  <!-- [Claude] WTEL-10755: WTEL-10657 is not part of the 26.10 release, tooltip hidden; restore :disabled="!tooltipLabel" -->
  <wt-tooltip
    v-if="text"
    class="wt-time-tooltip"
    disabled
  >
    <template #activator>
      <span class="wt-time-tooltip__value">{{ text }}</span>
    </template>
    {{ tooltipLabel }}
  </wt-tooltip>
</template>

<script setup lang="ts">
import { getUserTimeZone } from '@webitel/api-services/utils';
import { computed } from 'vue';

import { formatTimeZoneLabel } from '../../utils/timeZoneLabel';

const props = defineProps<{
	text?: string | null;
	label?: string;
}>();

const tooltipLabel = computed(() =>
	formatTimeZoneLabel(
		props.label === undefined ? getUserTimeZone() : props.label,
	),
);
</script>

<style scoped>
.wt-time-tooltip__value {
  line-height: normal;
}
</style>
