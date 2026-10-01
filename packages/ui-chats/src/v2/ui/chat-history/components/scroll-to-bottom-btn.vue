<template>
  <div class="scroll-to-bottom-btn">
    <div
      v-show="props.newMessageCount"
      class="scroll-to-bottom-btn__counter typo-body-2"
    >
      {{ props.newMessageCount }}
    </div>
    <wt-rounded-action
      icon="arrow-down"
      rounded
      @click="emit('scroll')"
    />
  </div>
</template>

<script setup lang="ts">
import { WtRoundedAction } from '@webitel/ui-sdk/components';

const props = withDefaults(
	defineProps<{
		newMessageCount?: number;
	}>(),
	{
		newMessageCount: 0,
	},
);

const emit = defineEmits<{
	scroll: [];
}>();
</script>

<style scoped>
.scroll-to-bottom-btn {
  position: absolute;
  right: calc(var(--scrollbar-width) + var(--spacing-xs));
  bottom: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xs);
}

.scroll-to-bottom-btn__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--success-color);
  color: var(--text-on-brand-color);
}
</style>
