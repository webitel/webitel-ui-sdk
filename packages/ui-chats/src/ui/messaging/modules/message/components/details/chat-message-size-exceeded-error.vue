<template>
  <div
    class="chat-message-size-exceeded-error typo-body-1"
    :class="{
      'chat-message-size-exceeded-error--right': selfSide,
    }"
  >
    <wt-icon
      icon="violation"
      color="error"
    />
    <p>
      {{ t('@webitel/ui-chats.ui.messaging.chatsIncorrectFileSize') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface IChatMessageSizeExceededErrorProps {
	selfSide?: boolean;
}

const props = withDefaults(defineProps<IChatMessageSizeExceededErrorProps>(), {
	selfSide: false,
});
</script>

<style scoped lang="scss">
.chat-message-size-exceeded-error {
  background: var(--primary-light-color);
  border-radius: var(--spacing-xs);
  padding: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  white-space: pre-line;
  text-align: center;

  &--right {
    background: var(--secondary-light-color);
    color: var(--secondary-on-color);
    place-self: flex-end;
  }
}
</style>
