<template>
  <article class="wt-cc-agent-status-timers">
    <wt-indicator
      color="disabled"
      :text="status.offline"
      :size="size"
    />
    <wt-indicator
      color="success"
      :text="status.online"
      :size="size"
    />
    <wt-indicator
      color="primary"
      :text="status.pause"
      :size="size"
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
