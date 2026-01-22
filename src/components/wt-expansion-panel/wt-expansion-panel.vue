<template>
  <div :class="[`wt-expansion-panel--${props.size}`]" class="wt-expansion-panel">
    <div :class="[props.size === 'sm' ? 'typo-subtitle-2' : 'typo-subtitle-1']" class="wt-expansion-panel-header"
      tabindex="0" @click="toggle" @keypress.enter="toggle">
      <slot name="title" />
      <div class="wt-expansion-panel-actions">
        <slot name="actions" v-bind="{ open, opened }" />
        <wt-icon :class="{ 'wt-expansion-panel-arrow--opened': opened }" class="wt-expansion-panel-arrow"
          icon="arrow-right" />
      </div>
    </div>
    <wt-expand-transition v-show="opened">
      <div class="wt-expansion-panel-body">
        <slot />
      </div>
    </wt-expand-transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import WtExpandTransition from '../transitions/wt-expand-transition.vue';

/**
 * @emits {void} opened - Emitted when the expansion panel is opened
 * @emits {void} closed - Emitted when the expansion panel is closed
 * 
 * @slot default - Content of the expansion panel
 * @slot title - Title of the expansion panel
 * @slot actions - Actions of the expansion panel
 * @slot-scope {function} open - Function to open the panel
 * @slot-scope {boolean} opened - Whether the panel is currently opened
 */
const props = defineProps({
  /**
   * Size of the expansion panel
   * @type {string}
   * @default 'md'
   * @options ['sm', 'md']
   */
  size: {
    type: String,
    default: 'md',
  },
  /**
   * Whether the expansion panel is initially collapsed. Also, can force expansion state, if changed
   * @type {boolean}
   * @default false
   */
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'opened',
  'closed',
]);

const opened = ref(!props.collapsed);

function open() {
  if (!opened.value) {
    opened.value = true;
    emit('opened');
  }
}

function close() {
  if (opened.value) {
    opened.value = false;
    emit('closed');
  }
}

function toggle() {
  return opened.value ? close() : open();
}

watch(
  () => props.collapsed,
  (newVal) => {
    if (newVal) {
      close();
    } else {
      open();
    }
  },
);
</script>

<style scoped>
.wt-expansion-panel {
  display: flex;
  flex-direction: column;
}

.wt-expansion-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: var(--spacing-2xs);
  background-color: var(--wt-expansion-panel-header-background-color);
  padding: var(--spacing-2xs) var(--spacing-xs);
  color: var(--wt-expansion-panel-header-title-color);
}

.wt-expansion-panel-body {
  background-color: var(--wt-expansion-panel-content-background-color);
  color: var(--wt-expansion-panel-content-text-color);
}

.wt-expansion-panel-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.wt-expansion-panel-arrow {
  transition: var(--transition);
}

.wt-expansion-panel-arrow--opened {
  transform: rotate(90deg);
}
</style>
