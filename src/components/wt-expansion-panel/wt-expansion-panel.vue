<template>
  <div
    :class="[`wt-expansion-panel--${props.size}`]"
    class="wt-expansion-panel"
  >
    <div
      class="wt-expansion-panel-header"
      tabindex="0"
      @click="toggle"
      @keypress.enter="toggle"
    >
      <slot name="title" />
      <div class="wt-expansion-panel-actions">
        <slot
          name="actions"
          v-bind="{ open, opened }"
        />
        <wt-icon
          :class="{ 'wt-expansion-panel-arrow--opened': opened }"
          class="wt-expansion-panel-arrow"
          icon="arrow-right"
        />
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

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['opened', 'closed']);

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

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-expansion-panel {
  display: flex;
  flex-direction: column;

  .wt-expansion-panel-header {
    @extend %typo-subtitle-1;
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

    &--opened {
      transform: rotate(90deg);
    }
  }

  &--sm {
    .wt-expansion-panel-header {
      @extend %typo-subtitle-2;
    }
  }
}
</style>
