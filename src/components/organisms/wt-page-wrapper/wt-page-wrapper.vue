<template>
  <section class="wt-page-wrapper">
    <div class="wt-page-wrapper__header">
      <slot name="header"></slot>
    </div>
    <div v-if="actionsPanel" class="wt-page-wrapper__actions-panel">
      <slot name="actions-panel"></slot>
    </div>
    <div class="wt-page-wrapper__main">
      <slot name="main"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'wt-page-wrapper',
  props: {
    actionsPanel: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-page-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100%;
  padding: var(--page-wrapper-padding);
  gap: var(--page-wrapper-section-gap);
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel,
.wt-page-wrapper__main {
  box-sizing: border-box;
  padding: var(--page-wrapper-section-padding);
  border-radius: var(--border-radius);
  background: var(--main-color);
}

.wt-page-wrapper__main {
  display: flex;
  flex: 1;
  width: 100%;
}

</style>
