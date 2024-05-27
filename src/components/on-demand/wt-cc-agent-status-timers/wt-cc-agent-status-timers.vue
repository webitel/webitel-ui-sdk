<template>
  <article class="wt-cc-agent-status-timers">
    <wt-indicator
      :size="size"
      :text="status.offline"
      color="disabled"
    />
    <wt-indicator
      :size="size"
      :text="status.online"
      color="success"
    />
    <wt-indicator
      :size="size"
      :text="status.pause"
      color="primary"
    />
  </article>
</template>

<script setup>
const props = defineProps({
  /**
   * @description Status object
   * @type {Object}
   * @property {String} offline
   * @property {String} online
   * @property {String} pause
   */
  status: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    options: ['sm', 'md'],
  },
});
</script>

<style lang="scss" scoped>
.wt-cc-agent-status-timers {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
