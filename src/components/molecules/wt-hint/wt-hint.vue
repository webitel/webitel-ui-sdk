<template>
  <wt-tooltip class="wt-hint">
    <template v-slot:activator>
      <wt-icon-btn
        icon="rounded-info"
        color="outline"
      ></wt-icon-btn>
    </template>
    <slot></slot>
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-hint',
};
</script>

<style lang="scss" scoped>

</style>
