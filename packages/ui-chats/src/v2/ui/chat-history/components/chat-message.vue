<template>
  <div
    class="chat-message"
    :class="{ 'chat-message--outgoing': isOutgoing }"
  >
    <wt-avatar
      class="chat-message__avatar"
      size="sm"
      :src="avatarUrl"
      :username="authorName"
    />
    <div class="chat-message__bubble">
      <p
        v-if="props.message.deleted"
        class="chat-message__placeholder typo-body-1"
      >
        {{ t('history.deletedMessage') }}
      </p>
      <template v-else>
        <message-attachments
          v-if="withAttachments"
          :message="props.message"
        />
        <message-text
          v-if="props.message.body"
          :text="props.message.body"
        />
        <p
          v-else-if="!withAttachments"
          class="chat-message__placeholder typo-body-1"
        >
          {{ t('history.unsupportedMessage') }}
        </p>
      </template>
      <div class="chat-message__meta typo-caption">
        <span v-if="time">{{ time }}</span>
        <message-status
          v-if="status"
          :status="status"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WtAvatar } from '@webitel/ui-sdk/components';
import { computed } from 'vue';

import { useChatsV2I18n } from '../../../locale/useChatsV2I18n';
import { hasAttachments } from '../../../scripts/attachments';
import { formatMessageTime } from '../../../scripts/formatDate';
import { getMessageStatus } from '../../../scripts/getMessageStatus';
import { isContactCentreSide } from '../../../scripts/isContactCentreSide';
import { participantName } from '../../../scripts/resolveSystemNotice';
import { toTimestamp } from '../../../scripts/toTimestamp';
import type {
	MessageModel,
	ResolveAvatarUrl,
	ThreadModel,
} from '../../../types';
import MessageAttachments from './message-attachments.vue';
import MessageStatus from './message-status.vue';
import MessageText from './message-text.vue';

const props = defineProps<{
	message: MessageModel;
	thread: ThreadModel;
	selfMemberId: string;
	resolveAvatarUrl?: ResolveAvatarUrl;
}>();

const { t, locale } = useChatsV2I18n();

const isOutgoing = computed(() => isContactCentreSide(props.message.sender));

const authorName = computed(() => participantName(props.message.sender));

const avatarUrl = computed(() =>
	props.message.sender
		? props.resolveAvatarUrl?.(props.message.sender)
		: undefined,
);

const withAttachments = computed(() => hasAttachments(props.message));

const time = computed(() => {
	const timestamp = toTimestamp(props.message.createdAt);
	return timestamp === null ? '' : formatMessageTime(timestamp, locale.value);
});

const status = computed(() =>
	getMessageStatus(props.message, props.thread, props.selfMemberId),
);
</script>

<style scoped>
.chat-message {
  display: flex;
  align-items: flex-start;
  gap: var(--wt-ws-chat-window-sizes-message-item-gap);
  padding: var(--wt-ws-chat-window-sizes-message-item-padding-y) var(--wt-ws-chat-window-sizes-message-item-padding-x);
}

.chat-message--outgoing {
  flex-direction: row-reverse;
}

.chat-message__avatar {
  flex-shrink: 0;
}

.chat-message__bubble {
  display: flex;
  flex-direction: column;
  gap: var(--wt-ws-chat-window-sizes-message-item-chat-message-gap);
  max-width: 75%;
  min-width: 0;
  padding: var(--wt-ws-chat-window-sizes-message-item-chat-message-padding-y) var(--wt-ws-chat-window-sizes-message-item-chat-message-padding-x);
  border-radius: var(--wt-ws-chat-window-sizes-message-item-chat-message-border-radius);
  background: var(--wt-ws-chat-window-colors-message-item-chat-message-client-background);
  color: var(--wt-ws-chat-window-colors-message-item-chat-message-client-color);
}

.chat-message--outgoing .chat-message__bubble {
  background: var(--wt-ws-chat-window-colors-message-item-chat-message-agent-background);
  color: var(--wt-ws-chat-window-colors-message-item-chat-message-agent-color);
}

.chat-message__placeholder {
  margin: 0;
  font-style: italic;
  opacity: 0.7;
}

.chat-message__meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-3xs);
  opacity: 0.8;
}
</style>
