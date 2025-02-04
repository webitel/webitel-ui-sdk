<template>
  <section class="wt-dual-panel">
    <div class="wt-dual-panel__header">
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
        <slot name="side-panel" />
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
  actionsPanel: {
    type: Boolean,
    default: true,
  },
  disableResize: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:size']);

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
@use '../../css/main.scss';
$side-panel-md-width: 320px;

.wt-dual-panel {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  padding: var(--wt-dual-panel-padding);
  background: var(--wt-dual-panel-background-color);
  gap: var(--wt-dual-panel-section-gap);

  &__header,
  &__actions-panel,
  &__main {
    box-sizing: border-box;
    padding: var(--wt-dual-panel-section-padding);
    border-radius: var(--border-radius);
    background: var(--wt-dual-panel-content-wrapper-color);
  }

  &__main {
    @extend %wt-scrollbar;
    overflow: auto;
    flex: 1 1 auto;
  }

  &__header,
  &__actions-panel {
    flex: 0 0 auto;
  }

  &__content {
    display: flex;
    flex-grow: 1;
    min-height: 0;
    gap: var(--spacing-sm);
  }

  &__side-panel {
    @extend %wt-scrollbar;
    overflow: auto;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: var(--wt-dual-panel-section-padding);
    transition: var(--transition);
    background: var(--wt-dual-panel-content-wrapper-color);
    will-change: width;
    gap: var(--wt-dual-panel-section-gap);

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
