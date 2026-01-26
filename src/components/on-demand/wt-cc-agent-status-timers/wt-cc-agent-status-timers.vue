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
	 * Object should have "online", "offline" and "pause" properties for representation
	 * @type {Object}
	 * @property {string} offline - Offline status timer value
	 * @property {string} online - Online status timer value
	 * @property {string} pause - Pause status timer value
	 * @required
	 */
	status: {
		type: Object,
		required: true,
	},
	/**
	 * Size of component
	 * @type {string}
	 * @default 'md'
	 * @options ['sm', 'md']
	 */
	size: {
		type: String,
		default: 'md',
		options: [
			'sm',
			'md',
		],
	},
});
</script>

<style scoped>
.wt-cc-agent-status-timers {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
