<template>
  <section class="chat-thread">
    <chat-history
      class="chat-thread__history"
      :thread="props.thread"
      :messages="props.messages"
      :self-member-id="props.selfMemberId"
      :mode="props.mode"
      :has-more="props.hasMore"
      :on-load-more="props.onLoadMore"
      :resolve-avatar-url="props.resolveAvatarUrl"
      @seen="emit('seen', $event)"
    />
    <!-- keyed by thread: switching chats drops the draft and any pending state -->
    <chat-composer
      v-if="props.mode === ChatThreadMode.Active"
      :key="props.thread.id"
      class="chat-thread__composer"
      :on-send="props.onSend"
      :on-attach="props.onAttach"
      :actions="props.actions"
      :submit-on-enter="props.submitOnEnter"
      :disabled="props.disabled"
      v-bind="draftBinding"
    >
      <template #actions="slotProps">
        <slot
          name="actions"
          v-bind="slotProps"
        />
      </template>
    </chat-composer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
	ChatComposerAction,
	type ChatComposerSlotProps,
	ChatThreadMode,
	type ChatThreadProps,
	type MessageModel,
} from '../../types';
import ChatComposer from '../chat-composer/chat-composer.vue';
import ChatHistory from '../chat-history/chat-history.vue';

const props = withDefaults(defineProps<ChatThreadProps>(), {
	mode: ChatThreadMode.Active,
	hasMore: false,
	actions: () => [
		ChatComposerAction.Attach,
		ChatComposerAction.Emoji,
		ChatComposerAction.Send,
	],
	submitOnEnter: true,
	disabled: false,
	draft: undefined,
});

const emit = defineEmits<{
	seen: [
		message: MessageModel,
	];
	'update:draft': [
		draft: string,
	];
}>();

defineSlots<{
	actions?: (props: ChatComposerSlotProps) => unknown;
}>();

// Forward the draft only when the app controls it; otherwise the composer
// keeps its own, which the :key above resets per thread.
const draftBinding = computed(() =>
	props.draft === undefined
		? {}
		: {
				draft: props.draft,
				'onUpdate:draft': (value: string) => emit('update:draft', value),
			},
);
</script>

<style scoped>
.chat-thread {
  display: flex;
  flex-direction: column;
  gap: var(--wt-ws-chat-window-sizes-root-gap);
  min-height: 0;
  height: 100%;
}

.chat-thread__history {
  flex: 1;
  min-height: 0;
}

.chat-thread__composer {
  flex: 0 0 auto;
  max-height: 50%;
}
</style>
