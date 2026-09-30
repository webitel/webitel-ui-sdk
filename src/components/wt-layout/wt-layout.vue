<template>
  <section
    ref="root"
    :class="{
      'wt-layout--fixed': width !== undefined,
      'wt-layout--resizing': resizing,
    }"
    :style="width !== undefined ? { flexBasis: `${width}px` } : undefined"
    class="wt-layout"
  >
    <slot />
    <div
      v-if="resizable"
      :aria-valuenow="Math.round(renderedWidth)"
      :class="`wt-layout__resizer--${resizeEdge}`"
      aria-orientation="vertical"
      class="wt-layout__resizer"
      role="separator"
      tabindex="0"
      @keydown="handleResizerKeydown"
      @pointerdown="startResize"
    />
  </section>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';

/**
 * Structural container inside `wt-page` body. Fills available width
 * (min 320px) unless `defaultWidth` is set; can be resized by dragging
 * its edge, the adjacent layout compensates. To hide a layout, the parent
 * (i.e. its sibling's owner) removes it with `v-if` / `v-show` — the rest
 * redistribute the space automatically.
 */
interface Props {
	/** Initial width in px. Without it, the layout is fluid. */
	defaultWidth?: number;
	/** Allows the user to change the width by dragging the edge. */
	resizable?: boolean;
	/** Which edge carries the resize handle. The neighbor on that side compensates. */
	resizeEdge?: 'start' | 'end';
}

const props = withDefaults(defineProps<Props>(), {
	defaultWidth: undefined,
	resizable: false,
	resizeEdge: 'end',
});

const emit = defineEmits<{
	/** Emitted once a resize is finished, with the new width in px. */
	resize: [
		width: number,
	];
}>();

const KEYBOARD_STEP = 16;
const KEY_DIRECTION: Partial<Record<string, 1 | -1>> = {
	ArrowLeft: -1,
	ArrowRight: 1,
};

const root = useTemplateRef<HTMLElement>('root');
/**
 * Preferred width: what the user dragged to. A fixed layout may still render
 * narrower (it shrinks with its container) and returns to this width once
 * there is room again.
 */
const width = ref<number | undefined>(props.defaultWidth);
/** Width actually on screen, kept in sync with container resizes. */
const { width: renderedWidth } = useElementSize(root, undefined, {
	box: 'border-box',
});
const resizing = ref(false);

watch(
	() => props.defaultWidth,
	(value) => {
		width.value = value;
	},
);

const getWidthBounds = () => {
	const el = root.value as HTMLElement;
	const current = el.getBoundingClientRect().width;
	const min = Number.parseFloat(getComputedStyle(el).minWidth) || 0;
	const neighbor =
		props.resizeEdge === 'end'
			? el.nextElementSibling
			: el.previousElementSibling;
	if (!(neighbor instanceof HTMLElement)) {
		return {
			current,
			min,
			max: Number.POSITIVE_INFINITY,
		};
	}
	const neighborMin =
		Number.parseFloat(getComputedStyle(neighbor).minWidth) || 0;
	const max = current + neighbor.getBoundingClientRect().width - neighborMin;
	return {
		current,
		min,
		max: Math.max(min, max),
	};
};

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

let stopResize: (() => void) | null = null;

const startResize = (event: PointerEvent) => {
	if (!root.value || event.button !== 0) return;
	event.preventDefault();

	const { current, min, max } = getWidthBounds();
	const startX = event.clientX;
	const direction = props.resizeEdge === 'end' ? 1 : -1;
	width.value = current;
	resizing.value = true;

	const onMove = (moveEvent: PointerEvent) => {
		const delta = (moveEvent.clientX - startX) * direction;
		width.value = clamp(current + delta, min, max);
	};

	const onUp = () => {
		stopResize?.();
		emit('resize', width.value as number);
	};

	stopResize = () => {
		window.removeEventListener('pointermove', onMove);
		window.removeEventListener('pointerup', onUp);
		window.removeEventListener('pointercancel', onUp);
		resizing.value = false;
		stopResize = null;
	};

	window.addEventListener('pointermove', onMove);
	window.addEventListener('pointerup', onUp);
	window.addEventListener('pointercancel', onUp);
};

const handleResizerKeydown = (event: KeyboardEvent) => {
	if (!root.value) return;
	const keyDirection = KEY_DIRECTION[event.key];
	if (!keyDirection) return;
	event.preventDefault();

	const { current, min, max } = getWidthBounds();
	const direction = props.resizeEdge === 'end' ? 1 : -1;
	width.value = clamp(
		current + keyDirection * direction * KEYBOARD_STEP,
		min,
		max,
	);
	emit('resize', width.value);
};

onBeforeUnmount(() => stopResize?.());
</script>

<style scoped>
.wt-layout {
  display: flex;
  position: relative;
  flex: 1 1 0;
  flex-direction: column;
  gap: var(--wt-layout-gap);
  box-sizing: border-box;
  border-radius: var(--wt-layout-border-radius);
  background: var(--wt-layout-background-color);
  padding: var(--wt-layout-padding);
  min-width: var(--wt-layout-min-width);
  min-height: 0;
}

.wt-layout--fixed {
  flex-grow: 0;
}

.wt-layout--resizing {
  user-select: none;
}

.wt-layout__resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  cursor: col-resize;
  width: var(--wt-layout-resizer-width);
  touch-action: none;
}

.wt-layout__resizer--end {
  right: calc(var(--wt-layout-resizer-width) * -1);
}

.wt-layout__resizer--start {
  left: calc(var(--wt-layout-resizer-width) * -1);
}

.wt-layout__resizer::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - var(--wt-layout-resizer-line-width) / 2);
  transition: var(--transition);
  background: transparent;
  width: var(--wt-layout-resizer-line-width);
  content: '';
}

.wt-layout__resizer:hover::after,
.wt-layout__resizer:focus-visible::after,
.wt-layout--resizing .wt-layout__resizer::after {
  background: var(--wt-layout-resizer-active-color);
}

.wt-layout__resizer:focus-visible {
  outline: none;
}
</style>
