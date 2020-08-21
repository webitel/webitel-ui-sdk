<template>
  <section class="wt-page-wrapper">
    <div class="wt-page-wrapper__header">
      <slot name="header"></slot>
    </div>
    <div class="wt-page-wrapper__actions-panel">
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
};
</script>

<style lang="scss" scoped>
.wt-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  box-sizing: border-box;
  padding: var(--page-wrapper-padding);
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel,
.wt-page-wrapper__main {
  box-sizing: border-box;
  background: var(--main-primary-color);
  border-radius: var(--border-radius);
}

.wt-page-wrapper__header,
.wt-page-wrapper__actions-panel {
  margin-bottom: var(--page-wrapper-section-margin);
}

.wt-page-wrapper__actions-panel {
  padding: var(--page-wrapper-padding);
}

.wt-page-wrapper__main {
  flex: 1;
  display: flex;
  width: 100%;
  padding: var(--page-wrapper-main-section-padding);
}

</style>
