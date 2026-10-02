<template>
  <div
    class="chat-system-notice"
    :class="`chat-system-notice--${notice.tone}`"
  >
    <span class="chat-system-notice__line" />
    <span class="chat-system-notice__content typo-caption">
      <wt-avatar
        v-if="notice.actor"
        class="chat-system-notice__avatar"
        size="2xs"
        :src="props.resolveAvatarUrl?.(notice.actor)"
        :username="actorName"
      />
      <span class="chat-system-notice__text">{{ text }}</span>
      <span
        v-if="time"
        class="chat-system-notice__time"
      >• {{ time }}</span>
    </span>
    <span class="chat-system-notice__line" />
  </div>
</template>

<script setup lang="ts">
import { WtAvatar } from '@webitel/ui-sdk/components';
import { computed } from 'vue';

import { useChatsV2I18n } from '../../../locale/useChatsV2I18n';
import { formatMessageTime } from '../../../scripts/formatDate';
import {
	participantName,
	resolveSystemNotice,
} from '../../../scripts/resolveSystemNotice';
import { toTimestamp } from '../../../scripts/toTimestamp';
import type {
	MessageModel,
	ResolveAvatarUrl,
	ThreadModel,
} from '../../../types';

const props = defineProps<{
	message: MessageModel;
	thread: ThreadModel;
	resolveAvatarUrl?: ResolveAvatarUrl;
}>();

const { t } = useChatsV2I18n();

const notice = computed(() => resolveSystemNotice(props.message, props.thread));

const actorName = computed(
	() => participantName(notice.value.actor) || t('systemNotice.system'),
);

const text = computed(() =>
	notice.value.textKey
		? t(notice.value.textKey, {
				actor: actorName.value,
			})
		: (notice.value.fallbackText ?? ''),
);

const time = computed(() => {
	const timestamp = toTimestamp(props.message.createdAt);
	return timestamp === null ? '' : formatMessageTime(timestamp);
});
</script>

<style scoped>
.chat-system-notice {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-disabled-color);
  font-style: italic;
}

.chat-system-notice__line {
  flex: 1;
  height: 1px;
  background: var(--p-divider-border-color);
}

.chat-system-notice__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
  max-width: 70%;
  text-align: center;
}

.chat-system-notice--positive {
  color: var(--text-success-color);
}

.chat-system-notice--negative {
  color: var(--text-error-color);
}
</style>
