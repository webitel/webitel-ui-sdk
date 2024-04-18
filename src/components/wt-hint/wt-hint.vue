<template>
  <wt-tooltip class="wt-hint">
    <template #activator>
      <wt-icon-btn
        icon="rounded-info"
        :color="iconColor"
        size="sm"
      />
    </template>
    <slot />
  </wt-tooltip>
</template>

<script>
export default {
  name: 'WtHint',
  props: {
    iconColor: {
      type: String,
      default: 'info',
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
