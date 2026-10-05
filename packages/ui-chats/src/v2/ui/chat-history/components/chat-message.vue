<template>
  <div
    class="chat-message"
    :class="{ 'chat-message--outgoing': isOutgoing }"
  >
    <wt-tooltip
      class="chat-message__avatar"
      placement="top"
      :disabled="!authorName"
    >
      <template #activator>
        <wt-avatar
          size="sm"
          :src="avatarUrl"
          :username="authorName"
        />
      </template>
      {{ authorName }}
    </wt-tooltip>
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
      <div class="chat-message__meta typo-body-2">
        <message-status
          v-if="status"
          :status="status"
        />
        <span v-if="time">{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WtAvatar, WtTooltip } from '@webitel/ui-sdk/components';
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

const { t } = useChatsV2I18n();

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
	return timestamp === null ? '' : formatMessageTime(timestamp);
});

const status = computed(() =>
	getMessageStatus(props.message, props.thread, props.selfMemberId),
);
</script>

<style scoped>
.chat-message {
  --chat-message-tail-size: 8px;

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
  position: relative;
  max-width: 70%;
  min-width: 0;
  padding: var(--wt-ws-chat-window-sizes-message-item-chat-message-padding-y) var(--wt-ws-chat-window-sizes-message-item-chat-message-padding-x);
  border-radius: var(--wt-ws-chat-window-sizes-message-item-chat-message-border-radius);
  background: var(--chat-message-bubble-background);
  color: var(--wt-ws-chat-window-colors-message-item-chat-message-client-color);
  --chat-message-bubble-background: var(--wt-ws-chat-window-colors-message-item-chat-message-client-background);
}

/* the corner next to the avatar is square and carries an 8px tail, as in DES-730 */
.chat-message:not(.chat-message--outgoing) .chat-message__bubble {
  margin-left: var(--chat-message-tail-size);
  border-top-left-radius: 0;
}

.chat-message--outgoing .chat-message__bubble {
  margin-right: var(--chat-message-tail-size);
  border-top-right-radius: 0;
  --chat-message-bubble-background: var(--wt-ws-chat-window-colors-message-item-chat-message-agent-background);
  color: var(--wt-ws-chat-window-colors-message-item-chat-message-agent-color);
}

/* the tail is the bubble colour left over once a circle is cut out of the
   square beside the bubble's square corner */
.chat-message__bubble::before {
  position: absolute;
  top: 0;
  width: var(--chat-message-tail-size);
  height: var(--chat-message-tail-size);
  content: '';
}

.chat-message:not(.chat-message--outgoing) .chat-message__bubble::before {
  right: 100%;
  background: radial-gradient(circle 7.333px at 0.667px 7.333px, transparent 7.2px, var(--chat-message-bubble-background) 7.45px);
}

.chat-message--outgoing .chat-message__bubble::before {
  left: 100%;
  background: radial-gradient(circle 7.333px at 7.333px 7.333px, transparent 7.2px, var(--chat-message-bubble-background) 7.45px);
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
  gap: var(--spacing-2xs);
}
</style>
