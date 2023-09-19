<template>
  <wt-tooltip class="wt-hint">
    <template v-slot:activator>
      <wt-icon-btn
        icon="rounded-info"
        :color="color"
      ></wt-icon-btn>
    </template>
    <slot></slot>
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-hint',
  props: {
    color: {
      type: String,
      default: 'default',
      options: [
        'default',
        'contrast',
        'active',
        'accent',
        'secondary',
        'disabled',
        'success',
        'danger',
        'transfer',
        'job',
        'hold',
        'secondary-50',
        'icon-secondary',
      ],
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
