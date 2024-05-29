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
@import 'src/css/main.scss';

.wt-headline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: var(--headline-min-height);
  border-radius: var(--border-radius);
  background: var(--wt-headline-background-color);
}

.wt-headline__title {
  @extend %typo-heading-2;
  margin-right: var(--headline-title-margin);
}

.wt-headline__actions-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
