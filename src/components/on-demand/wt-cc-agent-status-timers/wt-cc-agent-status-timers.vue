<template>
  <article class="wt-cc-agent-status-timers">
    <wt-indicator
      color="disabled"
      :text="status.offline"
      :size="size"
    ></wt-indicator>
    <wt-indicator
      color="success"
      :text="status.online"
      :size="size"
    ></wt-indicator>
    <wt-indicator
      color="primary"
      :text="pause"
      :size="size"
    ></wt-indicator>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: Object,
    required: true,
    description: '{ offline, pause, online, allowPause? }',
  },
  size: {
    type: String,
    default: 'md',
    options: ['sm', 'md'],
  },
});

const pause = computed(() => {
  if (!props.status.allowPause) return props.status.pause;
  return `${props.status.pause} / ${props.status.allowPause}`;
});
</script>

<style lang="scss" scoped>
.wt-cc-agent-status-timers {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
