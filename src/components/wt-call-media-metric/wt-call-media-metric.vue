<template>
  <wt-icon
    v-if="resolvedQuality"
    v-tooltip.bottom="showTooltip ? tooltip : undefined"
    :icon="`ws-signal-${resolvedQuality}`"
    :size="size"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentSize, type ConnectionQualityLevelsType } from '../../enums';
import { getConnectionQuality } from '../../scripts';

const props = withDefaults(
	defineProps<{
		quality?: ConnectionQualityLevelsType | null;
		mosAvg?: number | null;
		size?: (typeof ComponentSize)[keyof typeof ComponentSize];
		showTooltip?: boolean;
		tooltipTextPrefix?: string;
	}>(),
	{
		size: ComponentSize.MD,
		showTooltip: false,
		tooltipTextPrefix: 'connectionQuality',
	},
);

const { t } = useI18n();

const resolvedQuality = computed(() => {
	if (props.quality) return props.quality;
	return getConnectionQuality(props.mosAvg ?? undefined);
});

const tooltip = computed(() =>
	resolvedQuality.value
		? t(`${props.tooltipTextPrefix}.${resolvedQuality.value}`)
		: undefined,
);
</script>
