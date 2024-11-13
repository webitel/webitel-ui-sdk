<template>
  <section class="wt-page-wrapper-dual-pane">
    <div class="wt-page-wrapper-dual-pane__header">
      <slot name="header" />
    </div>
    <div
      v-if="actionsPanel"
      class="wt-page-wrapper-dual-pane__actions-panel"
    >
      <slot name="actions-panel" />
    </div>
    <div class="wt-page-wrapper-dual-pane__content">
      <div
        :class="[
        `wt-page-wrapper-dual-pane__side-pane--${sidePanelSize}`
      ]"
        class="wt-page-wrapper-dual-pane__side-pane"
      >
        <wt-collapse-action
          v-if="collapsible"
          :collapsed="sidePanelCollapsed"
          @click="toggleSidePanel"
        />
        <slot name="side" />
      </div>
      <div class="wt-page-wrapper-dual-pane__main-pane">
        <slot name="main" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue';

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
const emit = defineEmits(['update:size']);

const toggleSidePanel = () => {
  sidePanelCollapsed.value = !sidePanelCollapsed.value;
  emit('update:size', sidePanelSize.value);
};

const sidePanelSize = computed(() => (sidePanelCollapsed.value ? 'sm' : 'md'));
</script>

<style lang="scss">
@import './variables.scss';
.wt-page-wrapper-dual-pane {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  min-height: 100%;
  padding: var(--page-wrapper-dual-pane-padding);
  background: var(--wt-page-wrapper-dual-pane-background-color);
  gap: var(--page-wrapper-dual-pane-section-gap);

  &__header,
  &__actions-panel,
  &__main {
    box-sizing: border-box;
    padding: var(--page-wrapper-dual-pane-padding);
    border-radius: var(--border-radius);
    background: var(--wt-page-wrapper-dual-pane-content-wrapper-color);
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

  &__side-pane {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: var(--page-wrapper-dual-pane-padding);
    transition: var(--transition);
    background: var(--wt-page-wrapper-dual-pane-content-wrapper-color);
    will-change: width;
    gap: var(--spacing-2xs);

    &--md {
      flex: 0 0 320px;
    }

    &--sm {
      flex: 0 0 min-content;
    }
  }

  &__main-pane {
    flex: 1 1 auto;
    padding: var(--page-wrapper-dual-pane-padding);
    background: var(--wt-page-wrapper-dual-pane-content-wrapper-color);
  }
}
</style>
