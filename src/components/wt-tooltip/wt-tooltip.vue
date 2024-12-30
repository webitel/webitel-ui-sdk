<template>
  <div
    :class="{
      'wt-tooltip--visible': isVisible,
    }"
    class="wt-tooltip"
  >
    <div
      ref="activator"
      class="wt-tooltip__activator"
    >
      <slot name="activator" />
    </div>
    <wt-tooltip-floating
      v-if="isVisible"
      ref="floating"
      v-clickaway="hideTooltip"
      :class="[popperClass]"
      :style="floatingStyles"
      :triggers="popperTriggers"
      class="wt-tooltip__floating"
      @hide="hideTooltip"
      @show="showTooltip"
    >
      <slot v-bind="{ hide: hideTooltip }" />
    </wt-tooltip-floating>
  </div>
</template>

<script setup>
import {
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import debounce from '../../scripts/debounce.js';
import { useTooltipTriggerSubscriptions } from './_internals/useTooltipTriggerSubscriptions.js';
import WtTooltipFloating from './_internals/wt-tooltip-floating.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: 'auto',
  },
  popperTriggers: {
    type: Array,
    default: () => [],
  },
  triggers: {
    type: Array,
    default: () => ['hover', 'focus', 'touch'],
  },
  popperClass: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);

const activator = ref(null);
const floating = ref(null);
const isVisible = ref(props.visible);

const emitVisibilityChange = () => {
  emit('update:visible', isVisible.value);
};

const showTooltip = (event = {}) => {
  if (props.disabled || isVisible.value) return;
  isVisible.value = true;
  event.usedByTooltip = true; // https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/components/Popper.ts#L884
  emitVisibilityChange();
  setScrollListener();
};

const hideTooltip = (event = {}) => {
  if (!isVisible.value || event.usedByTooltip) return;
  isVisible.value = false;
  emitVisibilityChange();
  removeScrollListener();
};

const setScrollListener = () => {
  window.addEventListener('scroll', hideTooltip, true);
};
const removeScrollListener = () => {
  window.removeEventListener('scroll', hideTooltip, true);
};

// https://floating-ui.com/docs/misc#clipping
const { floatingStyles } = useFloating(activator, floating, {
  placement: props.placement === 'auto' ? null : props.placement,
  strategy: 'fixed', // https://floating-ui.com/docs/computeposition#strategy
  // https://floating-ui.com/docs/middleware

  /* WE SHOULD USE v-if INSTEAD OF OPACITY VISIBILITY
  TOGGLE BECAUSE OF PERFORMANCE ISSUES, RELATED TO USAGE OF AUTO_UPDATE OF POSITIONS
  */
  whileElementsMounted: autoUpdate, // https://floating-ui.com/docs/vue#anchoring
  middleware: [
    shift(),
    offset(4),
    props.placement === 'auto' ? autoPlacement() : flip(),
  ],
});

useTooltipTriggerSubscriptions({
  target: activator,
  triggers: props.triggers,
  show: showTooltip,
  hide: hideTooltip,
});

watch(
  () => props.visible,
  (value) => {
    if (value) showTooltip();
    else hideTooltip();
  },
);

onMounted(() => {
  if (props.visible) showTooltip();
});

onBeforeUnmount(() => {
  removeScrollListener();
});
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../../src/css/main.scss';

.wt-tooltip {
  display: inline-block;
  height: fit-content;

  &__activator {
    line-height: 0;
  }

  .wt-tooltip-floating {
    @extend %typo-body-2;
    z-index: 1000;
    padding: var(--spacing-2xs) var(--spacing-xs);
    color: var(--wt-tooltip-text-color);
    border-radius: var(--border-radius);
    background: var(--wt-tooltip-background-color);
    box-shadow: var(--elevation-10);
  }
}
</style>
