<template>
  <div ref="rootEl" class="time-group">
    <template v-if="props.countdown">
      {{ remainingTimeFormatted }}
    </template>

    <template v-else>
      <media-time type="current" />
      /
      <media-time type="duration" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {
	computed,
	defineProps,
	onMounted,
	onUnmounted,
	ref,
	useTemplateRef,
	withDefaults,
} from 'vue';
import { formatTime } from 'vidstack';

const props = withDefaults(
	defineProps<{
		countdown?: boolean;
	}>(),
	{
		countdown: false,
	},
);

const rootEl = useTemplateRef<HTMLElement>('rootEl');
const currentTime = ref(0);
const mediaDuration = ref(0);

let playerElement: Element | null = null;

const remainingTimeFormatted = computed(() =>
	formatTime(Math.max(0, mediaDuration.value - currentTime.value), {
		showHrs: mediaDuration.value >= 3600,
	}),
);

const syncPlayerState = () => {
	const player = playerElement as any;
	currentTime.value = player.currentTime ?? 0;
	mediaDuration.value = player.duration ?? 0;
};

onMounted(() => {
	playerElement = rootEl.value?.closest('media-player') ?? null;
	if (!playerElement) return;

	playerElement.addEventListener('can-play', syncPlayerState);
	playerElement.addEventListener('time-update', syncPlayerState);
});

onUnmounted(() => {
	playerElement?.removeEventListener('can-play', syncPlayerState);
	playerElement?.removeEventListener('time-update', syncPlayerState);
});
</script>

<style  scoped>
.time-group {
  font-family: 'Montserrat', monospace;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-transform: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
  color: var(--wt-player-video-control-bar-color);
}
</style>
