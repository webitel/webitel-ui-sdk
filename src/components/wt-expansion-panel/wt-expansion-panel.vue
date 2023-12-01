<template>
  <div
    :class="[{'wt-expansion-panel--opened':open},
             `wt-expansion-panel--${props.size}`]"
    class="wt-expansion-panel"
  >
    <div
      class="wt-expansion-panel-header"
      tabindex="0"
      @click="open = !open"
      @keypress.enter="open = !open"
    >
      <slot name="title" />
      <wt-icon
        icon="arrow-right"
      />
    </div>
    <wt-expand-transition>
      <div
        class="wt-expansion-panel-body"
        v-show="open"
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
    padding: var(--spacing-2xs) var(--spacing-xs);
    cursor: pointer;
    color: var(--wt-expansion-panel-header-text-color);
    border-radius: var(--spacing-2xs);
    background-color: var(--wt-expansion-panel-header-background-color);
  }

  .wt-expansion-panel-body {
    color: var(--wt-expansion-panel-body-text-color);
    background-color: var(--wt-expansion-panel-body-background-color);
  }

  .wt-icon {
    margin-left: auto;
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
