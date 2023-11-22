<template>
  <header class="wt-headline">
    <slot>
      <slot name="title-wrapper">
        <h1 class="wt-headline__title">
          <slot name="title" />
        </h1>
      </slot>
      <div class="wt-headline__actions-wrapper">
        <slot name="search" />
        <slot name="actions" />
      </div>
    </slot>
  </header>
</template>

<script>
export default {
  name: 'WtHeadline',
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: var(--headline-min-height);
  box-sizing: border-box;
  background: var(--headline-background);
  border-radius: var(--border-radius);
}

.wt-headline__title {
  @extend %typo-heading-2;
  margin-right: var(--headline-title-margin);
}

.wt-headline__actions-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}
</style>
