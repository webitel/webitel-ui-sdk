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
    <div
      ref="floating"
      class="wt-tooltip__floating"
      :class="[popperClass]"
      :style="floatingStyles"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  useFloating, autoPlacement, shift, flip, offset,
} from '@floating-ui/vue';

// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/util/events.ts
const SHOW_EVENT_MAP = {
  hover: 'mouseenter',
  focus: 'focus',
  click: 'click',
  touch: 'touchstart',
  pointer: 'pointerdown',
};

// https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/util/events.ts
const HIDE_EVENT_MAP = {
  hover: 'mouseleave',
  focus: 'blur',
  click: 'click',
  touch: 'touchend',
  pointer: 'pointerup',
};

const props = defineProps({
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

const showTooltip = (event) => {
  if (isVisible.value) return;
  isVisible.value = true;

  // https://github.com/Akryum/floating-vue/blob/main/packages/floating-vue/src/components/Popper.ts#L884
  event.usedByTooltip = true;
};

const hideTooltip = (event) => {
  if (event.usedByTooltip) return;
  isVisible.value = false;
};

const subscribeTriggers = () => {
  const setEventListeners = (target, triggers) => {
    triggers.forEach((trigger) => {
      const showEvent = SHOW_EVENT_MAP[trigger];
      if (showEvent) {
        target.addEventListener(showEvent, showTooltip);
      } else {
        console.log(`No Tooltip Show event for ${trigger} trigger`);
      }
      const hideEvent = HIDE_EVENT_MAP[trigger];
      if (hideEvent) {
        target.addEventListener(hideEvent, hideTooltip);
      } else {
        console.log(`No Tooltip Hide event for ${trigger} trigger`);
      }
    });
  };

  setEventListeners(activator.value, props.triggers);
  setEventListeners(floating.value, props.popperTriggers);
};
const unsubscribeTriggers = () => {
  const unsetEventListeners = (target, triggers) => {
    triggers.forEach((trigger) => {
      const showEvent = SHOW_EVENT_MAP[trigger];
      if (showEvent) {
        target.removeEventListener(showEvent, showTooltip);
      } else {
        console.log(`No Tooltip Show event for ${trigger} trigger`);
      }
      const hideEvent = HIDE_EVENT_MAP[trigger];
      if (hideEvent) {
        target.removeEventListener(hideEvent, hideTooltip);
      } else {
        console.log(`No Tooltip Hide event for ${trigger} trigger`);
      }
    });
  };

  unsetEventListeners(activator.value, props.triggers);
  unsetEventListeners(floating.value, props.popperTriggers);
};

const { floatingStyles } = useFloating(activator, floating, {
  // https://floating-ui.com/docs/middleware
  middleware: [autoPlacement(), shift(), flip(), offset(8)],
});

onMounted(() => subscribeTriggers());
onBeforeUnmount(() => unsubscribeTriggers());
</script>

<style lang="scss" scoped>
.wt-tooltip {
  display: inline-block;
  height: fit-content;

  &__activator {
    line-height: 0;
  }

  &__floating {
    @extend %typo-body-2;
    padding: var(--spacing-2xs) var(--spacing-xs);
    color: var(--contrast-color);
    background: var(--main-color);
    border-radius: var(--border-radius);
    box-shadow: var(--elevation-10);
    z-index: 1000;
    transition: var(--transition);
  }

  &--contrast {
    .wt-tooltip__floating {
      color: var(--main-color);
      background: var(--contrast-color);
    }
  }
}

.wt-tooltip {
  .wt-tooltip__floating {
    opacity: 0;
    pointer-events: none;
  }

  &--visible {
    .wt-tooltip__floating {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
