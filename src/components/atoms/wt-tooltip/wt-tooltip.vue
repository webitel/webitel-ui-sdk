<template>
  <div
    :class="{
      'wt-tooltip--contrast': contrast,
      'wt-tooltip--visible': isVisible,
     }"
    class="wt-tooltip"
  >
    <div
      ref="activator"
      class="wt-tooltip__activator"
    >
      <slot name="activator"></slot>
    </div>
    <wt-tooltip-floating
      v-if="isVisible"
      ref="floating"
      class="wt-tooltip__floating"
      v-clickaway="hideTooltip"
      :class="[popperClass]"
      :style="floatingStyles"
      :triggers="popperTriggers"
      @show="showTooltip"
      @hide="hideTooltip"
    >
      <slot v-bind="{ hide: hideTooltip }"></slot>
    </wt-tooltip-floating>
  </div>
</template>

<script setup>
import {
  ref, onMounted, watch,
} from 'vue';
import {
  useFloating, autoPlacement, shift, flip, offset, autoUpdate,
} from '@floating-ui/vue';
import { useTooltipTriggerSubscriptions } from './_internals/useTooltipTriggerSubscriptions';
import WtTooltipFloating from './_internals/wt-tooltip-floating.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  contrast: {
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
});

const activator = ref(null);
const floating = ref(null);

const isVisible = ref(false);

const showTooltip = (event = {}) => {
  if (isVisible.value) return;
  isVisible.value = true;

  // https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/components/Popper.ts#L884
  event.usedByTooltip = true;
};

const hideTooltip = (event = {}) => {
  if (event.usedByTooltip) return;
  isVisible.value = false;
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
    shift(), offset(4),
    props.placement === 'auto' ? autoPlacement() : flip(),
  ],
});

useTooltipTriggerSubscriptions({
  target: activator,
  triggers: props.triggers,
  show: showTooltip,
  hide: hideTooltip,
});

watch(props.visible, (value) => {
  if (value) showTooltip();
  else hideTooltip();
});

onMounted(() => {
  if (props.visible) showTooltip();
});
</script>

<style lang="scss" scoped>
.wt-tooltip {
  display: inline-block;
  height: fit-content;

  &__activator {
    line-height: 0;
  }

  .wt-tooltip-floating {
    @extend %typo-body-2;
    padding: var(--spacing-2xs) var(--spacing-xs);
    color: var(--contrast-color);
    background: var(--main-color);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-10);
    z-index: 1000;
  }

  &--contrast {
    .wt-tooltip-floating {
      color: var(--main-color);
      background: var(--contrast-color);
    }
  }
}
</style>
