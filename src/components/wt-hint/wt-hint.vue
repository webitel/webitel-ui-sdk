<template>
  <wt-tooltip class="wt-hint">
    <template #activator>
      <wt-icon-btn
        icon="rounded-info"
        :color="iconColor"
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
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
