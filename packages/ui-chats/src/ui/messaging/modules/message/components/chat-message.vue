<template>
  <div
    :class="{
       'chat-message--right' : isAgentSide,
       'chat-message--md': props.size === 'md'
      }"
    class="chat-message"
  >
    <slot name="before-message" />

    <div class="chat-message__content">
      <div class="chat-message__avatar-wrapper">
        <message-avatar
          v-if="props.showAvatar"
          :bot="isBot"
          :username="getClientUsername"
        />
      </div>
      <!--    click.stop prevents focus on textarea and allows to select the message-new text -->
      <message-blocked-error v-if="message.file?.malware" @click.stop />
      <div v-else @click.stop>
        <message-player
          v-if="isMedia"
          :file="props.message.file"
          :type="props.message.file?.mime"
          :size="props.size"
          @initialized="handlePlayerInitialize"
        />
        <message-image
          v-if="isImage"
          :file="props.message.file"
          :type="props.message.file?.mime"
          @open="emit('open-image')"
        />
        <message-document
          v-if="isDocument"
          :file="props.message.file"
          :type="props.message.file?.mime"
          :agent="isAgentSide"
        />
        <message-text
          v-if="props.message?.text"
          :text="props.message.text"
        />
      </div>
      <message-time
        :date="props.message.createdAt"
      />
    </div>

    <slot name="after-message" />
  </div>
</template>

  <script setup lang="ts">

  import { ComponentSize } from '@webitel/ui-sdk/enums';
  import { computed, defineEmits, defineProps } from 'vue';

  import MessageAvatar from './details/chat-message-avatar.vue';
  import MessageBlockedError from './details/chat-message-blocked-error.vue';
  import MessageDocument from './details/chat-message-document.vue';
  import MessageImage from './details/chat-message-image.vue';
  import MessagePlayer from './details/chat-message-player.vue';
  import MessageText from './details/chat-message-text.vue';
  import MessageTime from './details/chat-message-time.vue';

  const props = defineProps({
    message: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: ComponentSize.MD,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
    },
  });

  const emit = defineEmits(['open-image', 'initialized-player']);

  const {
    isImage,
    isMedia, // audio or video
    isDocument
  } = useChatMessageFile(props.message.file);

  const isAgent = computed(() =>
    props.message.member?.self
    || props.message.member?.type === 'webitel'
  );

  const isBot = computed(() =>
    props.message.member?.type === 'bot'
    || (!props.message.member?.type && !props.message.channelId)
  );

  const isAgentSide = computed(() => isAgent.value || isBot.value);

  const getClientUsername = computed(() => {
    return !isAgentSide.value ? props.username : ''; // need to show username avatar only for client
  });

  function handlePlayerInitialize(player) {
    emit('initialized-player', { player });
  };

  </script>

<style lang="scss" scoped>
$message-gap: var(--spacing-xs);
$chat-info-gap: var(--spacing-2xs);

.chat-message {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: $chat-info-gap;

  &:last-child {
    margin-bottom: $message-gap;
  }

  &__content {
    display: flex;
    flex: 1;
    min-width: 0;
    line-height: 0; // prevents height difference from its content
    gap: $message-gap;
    margin: 0 var(--spacing-md) 0 var(--spacing-2xs);
  }

  &.chat-message--md {
    .chat-message__main-wrapper {
      max-width: 80%;
    }
  }

  .chat-message__avatar-wrapper {
    flex: 0 0 var(--spacing-lg);
    width: var(--wt-avatar-size--size-sm);
  }

  .chat-message-avatar {
    width: 100%;
  }

  .chat-message-avatar {
    flex: 0 0 var(--icon-lg-size);
  }

  .chat-message-player {
    min-height: var(--player-audio-height);
  }

  &--right .chat-message__content {
    flex-direction: row-reverse;
    margin: 0 var(--spacing-2xs) 0 var(--spacing-md);

    .chat-message-text {
      background: var(--secondary-light-color);
      color: var(--secondary-on-color);
      place-self: flex-end;
    }
  }

}
</style>
