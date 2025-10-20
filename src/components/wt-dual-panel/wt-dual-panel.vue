<template>
  <section class="wt-dual-panel">
    <div v-if="!hideHeader" class="wt-dual-panel__header">
      <slot name="header" />
    </div>
    <div
      v-if="actionsPanel"
      class="wt-dual-panel__actions-panel"
    >
      <slot name="actions-panel" />
    </div>
    <div class="wt-dual-panel__content">
      <div
        :class="[`wt-dual-panel__side-panel--${sidePanelSize}`]"
        class="wt-dual-panel__side-panel"
      >
        <wt-icon-action
          v-if="!disableResize"
          :action="sidePanelCollapsed ? IconAction.EXPAND : IconAction.COLLAPSE"
          class="wt-dual-panel__icon-action"
          size="sm"
          @click="toggleSidePanel"
        />
        <slot
          v-if="!sidePanelCollapsed"
          name="side-panel"
        />
      </div>
      <div class="wt-dual-panel__main">
        <slot name="main" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineEmits, ref } from 'vue';

import { ComponentSize, IconAction } from '../../enums';

const props = defineProps({
  hideHeader: {
    type: Boolean,
    default: false,
  },
  actionsPanel: {
    type: Boolean,
    default: true,
  },
  disableResize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:side-panel-size']);

const sidePanelCollapsed = ref(false);

const toggleSidePanel = () => {
  sidePanelCollapsed.value = !sidePanelCollapsed.value;
  emit('update:side-panel-size', sidePanelSize.value);
};

const sidePanelSize = computed(() =>
  sidePanelCollapsed.value ? ComponentSize.SM : ComponentSize.MD,
);
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/scroll' as *;
$side-panel-md-width: 320px;

.wt-dual-panel {
  display: flex;
  flex-direction: column;
  gap: var(--wt-dual-panel-section-gap);
  box-sizing: border-box;
  background: var(--wt-dual-panel-background-color);
  padding: var(--wt-dual-panel-padding);
  max-width: 100%;
  height: 100%;

  &__header,
  &__actions-panel,
  &__main {
    box-sizing: border-box;
    border-radius: var(--border-radius);
    background: var(--wt-dual-panel-content-wrapper-color);
    padding: var(--wt-dual-panel-section-padding);
  }

  &__main {
    @extend %wt-scrollbar;
    flex: 1 1 auto;
    overflow-x: auto;
  }

  &__header,
  &__actions-panel {
    flex: 0 0 auto;
  }

  &__content {
    display: flex;
    flex-grow: 1;
    gap: var(--spacing-sm);
    min-height: 0;
  }

  &__side-panel {
    @extend %wt-scrollbar;
    display: flex;
    flex-direction: column;
    gap: var(--wt-dual-panel-section-gap);
    transition: var(--transition);
    will-change: width;
    background: var(--wt-dual-panel-content-wrapper-color);
    padding: var(--wt-dual-panel-section-padding);
    min-width: 0;
    // overflow: auto;

    &--md {
      flex: 0 0 $side-panel-md-width;
    }

    &--sm {
      flex: 0 0 min-content;
    }
  }

  &__icon-action {
    width: fit-content;
    line-height: 0;
  }
}
</style>
