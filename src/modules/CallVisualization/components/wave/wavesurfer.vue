<template>
  <div
    ref="containerRef"
    class="wavesurfer-mount"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import type { WaveSurferOptions } from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js';
import { useWaveSurferResizeStabilizer } from '../../composables/useWaveSurferResizeStabilizer';

// `container` is always provided by this component itself — callers must not set it.
type WaveSurferExternalOptions = Omit<WaveSurferOptions, 'container'>;

const props = withDefaults(
	defineProps<{
		src: string;
		options?: WaveSurferExternalOptions;
	}>(),
	{
		options: () => ({}),
	},
);

const containerRef = ref<HTMLDivElement | null>(null);
const waveSurfer = shallowRef<WaveSurfer | null>(null);

let removeMountResizeObserver: (() => void) | null = null;

onMounted(() => {
	const mountElement = containerRef.value;
	if (!mountElement) {
		return;
	}
	waveSurfer.value = WaveSurfer.create({
		container: mountElement,
		url: props.src,
		...props.options,
	});
	const waveSurferInstance = waveSurfer.value;
	if (waveSurferInstance) {
		removeMountResizeObserver = useWaveSurferResizeStabilizer(
			waveSurferInstance,
			mountElement,
		);
	}
});

watch(
	() => props.src,
	(url) => {
		const instance = waveSurfer.value;
		if (instance && url) {
			instance.load(url).catch((error: unknown) => {
				console.warn('[wavesurfer] audio load failed', error);
			});
		}
	},
);

onBeforeUnmount(() => {
	removeMountResizeObserver?.();
	removeMountResizeObserver = null;
	if (waveSurfer.value) {
		waveSurfer.value.destroy();
		waveSurfer.value = null;
	}
});

defineExpose({
	get waveSurfer() {
		return waveSurfer.value;
	},
});
</script>

<style scoped>
.wavesurfer-mount {
	position: relative;
}
</style>
