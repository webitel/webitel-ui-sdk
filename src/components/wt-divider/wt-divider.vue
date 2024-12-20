<template>
  <hr class="wt-divider" :class="`wt-divider-${variant}`">
</template>

<script>
export default {
  name: 'WtDivider',
  props: {
    variant: {
      type: String,
      default: 'horizontal',
    },
  }
};
</script>

<style lang="scss">
//@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-divider {
  display: block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-color: var(--divider-border-color);

  &-vertical {
    min-height: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    width: 1px;
    padding: var(--spacing-md) 0 0;
    border-left: 0;
    border-bottom: 0;
    border-top: 0;
    border-right: var(--divider-border-color) solid 1px;
  }

  &-horizontal {
    width: 100%;
    max-width: 100%;
    height: 0;
    max-height: 0;
    border-top: var(--divider-border-color) solid 1px;
    border-left: 0;
    border-bottom: 0;
    border-right: 0;
    border-top-width: thin;
  }
}
</style>
