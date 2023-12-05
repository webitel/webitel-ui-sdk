<template>
  <div
    :class="[{'wt-expansion-panel--opened':open},
             `wt-expansion-panel--${props.size}`]"
    class="wt-expansion-panel"
  >
    <div
      class="wt-expansion-panel-header"
      tabindex="0"
      @click="toggleOpen"
      @keypress.enter="toggleOpen"
    >
      <slot name="title" />
      <div class="wt-expansion-panel-actions">
        <slot
          name="actions"
          v-bind="{ open, toggleOpen }"
        />
        <wt-icon
          icon="arrow-right"
        />
      </div>
    </div>
    <wt-expand-transition>
      <div
        v-show="open"
        class="wt-expansion-panel-body"
      >
        <slot />
      </div>
    </wt-expand-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'md',
  },
});

const open = ref(true);
const toggleOpen = () => open.value = !open.value;
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-expansion-panel {
  .wt-expansion-panel-header {
    @extend %typo-subtitle-1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2xs) var(--spacing-xs);
    cursor: pointer;
    color: var(--wt-expansion-panel-header-title-color);
    border-radius: var(--spacing-2xs);
    background-color: var(--wt-expansion-panel-header-background-color);
  }

  .wt-expansion-panel-body {
    color: var(--wt-expansion-panel-content-text-color);
    background-color: var(--wt-expansion-panel-content-background-color);
  }

  .wt-expansion-panel-actions {
    display: flex;
    gap: var(--spacing-xs);
  }

  &--sm {
    .wt-expansion-panel-header {
      @extend %typo-subtitle-2;
    }
  }

  &--opened {
    .wt-icon {
      transform: rotate(90deg);
    }
  }
}
</style>
