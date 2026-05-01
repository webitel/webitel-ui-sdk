<template>
  <div class="chat-observer">
    <wt-intersection-observer
      :can-load-more="props.next"
      :loading="props.loading"
      @next="emit(ChatAction.LoadNextMessages)"
    />
  </div>
</template>

<script setup lang="ts">
import { WtIntersectionObserver } from '@webitel/ui-sdk/components';
import { ChatAction } from '../../chat-footer/modules/user-input/enums/ChatAction.enum';

const props = withDefaults(
	defineProps<{
		next?: boolean;
		loading?: boolean;
	}>(),
	{
		next: false,
		loading: false,
	},
);

const emit = defineEmits<(e: typeof ChatAction.LoadNextMessages) => void>();
</script>

<style scoped>
/* @author ye.pohranichna */
/* reserve height for the loader to avoid unnecessary chat height changes https://webitel.atlassian.net/browse/WTEL-5366 */
.chat-observer {
  /* observer loader height @author ye.pohranichna */
  min-height: calc(var(--spacing-lg)*2 + var(--icon-md-size));
  /* @author ye.pohranichna */
  /* to place observer at the bottom of observer wrapper (closer to messages) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
</style>
