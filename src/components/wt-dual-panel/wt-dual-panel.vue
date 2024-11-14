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
        :class="[
        `wt-dual-panel__side-panel--${sidePanelSize}`
      ]"
        class="wt-dual-panel__side-panel"
      >
        <wt-icon-action
          v-if="collapsible"
          :action="sidePanelCollapsed ? IconAction.EXPAND : IconAction.COLLAPSE"
          class="wt-dual-panel__icon-action"
          size="sm"
          @click="toggleSidePanel"
        />
        <slot name="side" />
      </div>
      <div class="wt-dual-panel__main-panel">
        <slot name="main" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue';
import IconAction from '../../enums/IconAction/IconAction.enum.js';

const props = defineProps({
  actionsPanel: {
    type: Boolean,
    default: true,
  },
  collapsible: {
    type: Boolean,
    default: true,
  },
});

const sidePanelCollapsed = ref(false);
const emit = defineEmits(['update:side-panel-size']);

const toggleSidePanel = () => {
  sidePanelCollapsed.value = !sidePanelCollapsed.value;
  emit('update:side-panel-size', sidePanelSize.value);
};

const sidePanelSize = computed(() => (sidePanelCollapsed.value ? 'sm' : 'md'));
</script>

<style lang="scss">
@import '../../../src/css/main.scss';
@import './variables.scss';
$side-panel-md-width: 320px;

.wt-dual-panel {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  padding: var(--dual-panel-padding);
  background: var(--wt-dual-panel-background-color);
  gap: var(--dual-panel-section-gap);

  &__header,
  &__actions-panel,
  &__main {
    box-sizing: border-box;
    padding: var(--dual-panel-padding);
    border-radius: var(--border-radius);
    background: var(--wt-dual-panel-content-wrapper-color);
  }

  &__header {
    flex: 0 0 auto;
  }

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
    padding: var(--dual-panel-padding);
    transition: var(--transition);
    background: var(--wt-dual-panel-content-wrapper-color);
    will-change: width;
    gap: var(--spacing-2xs);

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

  &__main-panel {
    flex: 1 1 auto;
    padding: var(--dual-panel-padding);
    background: var(--wt-dual-panel-content-wrapper-color);
  }
}
</style>
