<template>
  <hr class="wt-divider">
</template>

<script>
export default {
  name: 'wt-divider',
};
</script>

<style lang="scss" scoped>
@import './variables.scss';

.wt-divider {
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 0;
  max-height: 0;
  padding: 0;
  margin: 0;
  border: var(--divider-border);
  border-color: var(--divider-border-color);
  border-top-width: thin;
}
</style>
