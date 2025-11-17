<template>
  <div
    class="chat-message-avatar"
  >
    <wt-avatar
      v-if="!bot"
      :username="username"
      :src="src"
      :size="size"
    />
    <div
      v-else
      class="chat-message-avatar__bot-avatar-wrapper"
    >
    <!-- TODO: refactor me to use picture and wt-avatar "src" prop -->
      <wt-icon
        icon="bot"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { WtAvatar, WtIcon } from '@webitel/ui-sdk/components';

const props = defineProps<{
    bot?: boolean;
    username?: string;
    src?: string;
  }>();

  const injectedSize = inject<ComponentSize>('size');

  const size = computed(() => {
    return ComponentSize.SM || injectedSize; // todo: should injected size be considered?
  });
</script>

<style lang="scss" scoped>
.chat-message-avatar {
  pointer-events: none; // prevents dragging to upload file area

  &__bot-avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wt-avatar-size--size-sm);
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }
}
</style>
