<template>
  <header class="wt-headline">
    <h2 class="wt-headline__title">
      <slot name="title"></slot>
    </h2>
    <div class="wt-headline__actions-wrapper">
      <slot name="search"></slot>
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'wt-headline',
  };
</script>

<style lang="scss" scoped>
  .wt-headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: var(--headline-min-height);
    padding: var(--headline-padding);
    box-sizing: border-box;
    background: var(--headline-background);
    border-radius: var(--border-radius);
  }

  .wt-headline__title {
    @extend %typo-heading-md;
    margin-right: var(--headline-title-margin);
  }

  .wt-headline__actions-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
</style>
