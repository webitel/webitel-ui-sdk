<template>
  <section class="wt-page-wrapper">
    <div class="wt-page-wrapper__header">
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
  box-sizing: border-box;
  max-width: 100%;
  min-height: 100%;
  padding: var(--page-wrapper-padding);
  background: var(--wt-page-wrapper-background-color);
  gap: var(--page-wrapper-section-gap);
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel,
.wt-page-wrapper__main {
  box-sizing: border-box;
  padding: var(--page-wrapper-section-padding);
  border-radius: var(--border-radius);
  background: var(--wt-page-wrapper-content-wrapper-color);
}

.wt-page-wrapper__main {
  display: flex;
  flex: 1;
  width: 100%;
}

</style>
