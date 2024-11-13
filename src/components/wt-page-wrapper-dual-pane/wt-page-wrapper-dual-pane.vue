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
      <div class="wt-page-wrapper-dual-pane__side-pane">
        <slot name="side"/>
      </div>
      <div class="wt-page-wrapper-dual-pane__main-pane">
        <slot name="main" />
      </div>
    </div>
  </section>
</template>


<script setup>
const props = defineProps({
  actionsPanel: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-page-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  min-height: 100%;
  padding: var(--page-wrapper-dual-pane-padding);
  background: var(--wt-page-wrapper-dual-pane-background-color);
  gap: var(--page-wrapper-dual-pane-section-gap);
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel,
.wt-page-wrapper__main {
  box-sizing: border-box;
  padding: var(--page-wrapper-dual-pane-padding);
  border-radius: var(--border-radius);
  background: var(--wt-page-wrapper-dual-pane-content-wrapper-color);
}

.wt-page-wrapper__main {
  display: flex;
  flex: 1;
  width: 100%;
}

</style>
