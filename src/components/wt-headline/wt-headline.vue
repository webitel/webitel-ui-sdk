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
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--breadcrumb-gap);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  background: var(--wt-headline-background-color);
  min-height: var(--headline-min-height);
}

.wt-headline__title {
  @extend %typo-heading-2;
  margin-right: var(--headline-title-margin);
}

.wt-headline__actions-wrapper {
  display: flex;
  position: relative;
  align-items: center;
}
</style>
