<template>
  <header class="wt-headline">
    <slot>
      <slot name="title-wrapper">
        <h1 class="wt-headline__title typo-heading-2">
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

<style scoped>
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
  margin-right: var(--headline-title-margin);
}

.wt-headline__actions-wrapper {
  display: flex;
  position: relative;
  align-items: center;
}
</style>
