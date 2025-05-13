<template>
  <section class="wt-page-wrapper">
    <div v-if="!hideHeader" class="wt-page-wrapper__header">
      <slot name="header" />
    </div>
    <div
      v-if="actionsPanel"
      class="wt-page-wrapper__actions-panel"
    >
      <slot name="actions-panel" />
    </div>
    <div class="wt-page-wrapper__main">
      <slot name="main" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'WtPageWrapper',
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
    actionsPanel: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-page-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--page-wrapper-section-gap);
  box-sizing: border-box;
  background: var(--wt-page-wrapper-background-color);
  padding: var(--page-wrapper-padding);
  max-width: 100%;
  min-height: 100%;
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel,
.wt-page-wrapper__main {
  box-sizing: border-box;
  border-radius: var(--border-radius);
  background: var(--wt-page-wrapper-content-wrapper-color);
  padding: var(--page-wrapper-section-padding);
}

.wt-page-wrapper__main {
  display: flex;
  flex: 1;
  width: 100%;
}
</style>
