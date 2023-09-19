<template>
  <wt-tooltip class="wt-hint">
    <template v-slot:activator>
      <wt-icon-btn
        icon="rounded-info"
        :color="iconColor"
      ></wt-icon-btn>
    </template>
    <slot></slot>
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-hint',
  props: {
    iconColor: {
      type: String,
      default: 'outline',
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
